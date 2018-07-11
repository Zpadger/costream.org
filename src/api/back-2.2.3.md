---
title: Parition graph
type: api
order: 33
---

When you read the doucuments of  the COStream compiler project from the front-end to this part, you may have the basic understanding the mechanism of the compiler, the conversion of the syntax tree to flatgraph, and the storage and access of the data when the dateflow program runs.	
But, in order to better understand the idea and implementation of the compiler backend for the scheduling and partitioning of nodes in the data flow graph SDF, there must be a certain understanding of C++ programming foundation for the structure, pointers, and basic containers in the C++ standard (such as list, vector, map , multimap) and iterator.	
We know that COStream is a data streaming language, a high-level language that runs in parallel on a multi-core platform. It is designed for multiple platform backends such as X10Backend, X86Backend, and GPUBackend, and there are differences in how to scheduling and partition in different backend. Therefore, the scheduling, partition and the subsequent split fusion until the final code generation step module are implemented separately by the platform.

## Program Entrance

```c++
// （3）Parition graph
PhaseName = "Partition";
if (Errors == 0 && PPartition && (X86Backend || X10Backend || GPUBackend) )
{
    ……
    if (X10ParallelBackEnd == TRUE)
    ……
    else if (X10DistributedBackEnd == TRUE)
    ……
    else if (X10Backend || X86Backend)
    {
        //According to the number of nodes in SSSG, and CPU cores 
        //set the partition number
        mp->setCpuCoreNum(CpuCoreNum, SSSG);
        mp->SssgPartition(SSSG,1);
    }
    else if (GPUBackend && MAFLPFlag)
    ……
}

PhaseName = "SetMultiNum";
if (Errors == 0 && GPUBackend)
    ……
    PhaseName = "PartitionGraph";
    if (Errors == 0 && PPartition && PartitionGraph && (X86Backend||X10Backend ||
                                                        GPUBackend) )
    {
    if(GPUBackend)
        DumpStreamGraph(SSSG,maflp,"GPUPartitionGraph.dot",NULL);
    else
        DumpStreamGraph(SSSG, mp, "PartitionGraph.dot",NULL);
    }
```
-	For example: if we use a serve with a 8 core cpu of Inter X86, according to the condition judgment, it will enter the X86Backend branch.
-	Variable `mp` is `MetisPartiton *mp = NULL`, it is defined in mainfunction. It is a object of MetisPartition.
-	First，according to the number of SDF graph nodes converted from the syntax tree and the physical core number of the current CPU，the program decide the partition number of SDF graph. It is implemented by `setCpuCoreNum(CpuCoreNum , SSSG)`. Variable CpuCoreNum=8 is defined in main function , SSSG is the output of the initial stage and steady state scheduling of the previous stage.
-	After the number of divisions is determined, the partition function `mp->SssgPartition(SSSG,1)` will be called, This function is implemented in MetisPartition.cpp, which is an associated file of this partitioning scheduling module.
-	After complete the partition scheduling, print out the divided SDF map and output with function `DumpStreamGraph (SSSG, mp, "PartitionGraph.dot", NULL)`.

## Associated file
(1)	 partition.h & partition.cpp
partition.h is the base class of all kinds of parition
![partitionclass](/img/partitionclass.jpg)

*Base class Partition menber variables*

|Name|Description|
|:-|:-|
|`FlatNode2PartitionNum`<br> type：`map<FlatNode*,int>`	|Store partition results. The map of node to the partition number.|
|`FlatNode2PartitionNum`<br> type：`multimap<int，FlatNode*>`	|Store partition results. The multimap of the patition number to it’s node.|
|`PartitionNumSet` <br> type：`vector<FlatNode *>`	|Return the set of specific partition.|
|`mnparts` <br> type：`int`	|The number of partition, depending on the number of places .|

*Base class Partition menber function*

|Function|Description|
|:-|:-|
|`setCpuCoreNum(int,SchedulerSSG*)`	return：`void` |According to the number of nodes in SSSG, and CPU cores set the partition number.|

*Base class Partition Non-menber function*

|Name|Description|
|:-|:-|
|`DumpStreamGraph(SchedulerSSG*ssg,Partition *,`<br> `const char *fileName, ClusterPartition *)	`<br> return：`void`|print the .dot file of the SDF graph.It is implemented in dumpGraph.cpp.|
|`ComputeSpeedup(SchedulerSSG*sssg,Partition *mp , `<br> `std::string , const char *fileName,std::string)`	<br> return：`void`|compute the theoretical acceleration ratio in X86 platform.It is implemented in speedup.cpp.|


## Flow chat of partition function
1)	Set partition numbers
This function is used to set partition numbers.
The number of physical cores of the server determines the number of shares.
![partitionflowchat](/img/partitionflowchat.jpg)

2)	SDFPartion—SSSGPartition
Use Metis toolkit to divided the graph,which combined communication and load balancing.

*When use one core ,do no partition*

|Name|Description|
|:-|:-|
|`map<FlatNode*,int> FlatNode2PartitionNum `	|Insert(make_pair(sssg->GetFlatNodes()[i],0)) <br>Map the partition number of all nodes in the SDF graph to 0.|
|`multimap<int，FlatNode*> FlatNode2PartitionNum` |Insert(make_pair(0,sssg->GetFlatNodes()[i]))<br>Store all node to the partition number 0.|

*When use multi cores, use Metis API*

|Name|Description|
|:-|:-|
|`vector<int> part(nvtxs)`|	nvtxs：number of nodes; <br>part：Store the partition number after each node is divided|
|`vector<int> vsize(nvtxs,0)`|	vsize：store the weight of nodes，initialize to 0|
|`vector<int> adjncy(edgenum*2)`|	adjncy：store the edge information|
|`vector<int> adjwgt(edgenum*2)`|	adjwgt：store the weight of edge|
|`METIS_PartGraphKway(&nvtxs,&mncon,mxadj,`<br>`madjncy,mvwgt,mvsize,`<br>`madjwgt,&mnparts,tpwgts,`<br>`ubvec,options,&objval,mpart)`|Call the K-road map partitioning algorithm under the metis interface, and divide the current SDF graph according to the actor workload and communication.|
|`FlatNode2PartitionNum.insert`<br>`(make_pair(sssg->GetFlatNodes()[i],part[i]))`|Store the partition result|
|`PartitonNum2FlatNode.insert`<br>`(make_pair(part[i],sssg->GetFlatNodes()[i]))`|Store the partition result |

## FAQ
### How the program color the different part of the graph？
The .dot file of Partitioned SDF graph is generated by function `DumpStreamGraph(SchedulerSSG*ssg,Partition *, const char *fileName, ClusterPartition *)` in dumpGraph.cpp，this function color the Each SDF graph node according to the result of dividing.
### What does MKP—Multi-layer K way partition do？
It did not change the structural characteristics of the SDF graph (the amount of nodes is unchanged),Dividing the graph into multiple subgraphs with similar weights, and ensuring minimum communication between subgraphs.

