---
title: Stage Assignment
type: api
order: 36
---

When the compiler proceeds to the stage assignment phase,it means we are close to the code generation module.
After partition the flatgraph, each part of the flatgraph has been assigned to the different processor core for execution, the program specifies the assignment of computing tasks on the spatial dimension.And determining the phase number of each computing unit being scheduled by the pipeline is specifying the scheduling of the computing unit in the time dimension。That is what stage assignment algorithm do.
Using stage assignment algorithm to construct software pipeline scheduling for task partitioning results is a prelude to the hierarchical pipeline code generation step.

## Program Entrance

```c++
/*（6）Stage Assignment */
if (Errors == 0 && X86Backend)  
{
    //Step1: construction stage assignment object PAS
    pSA = new StageAssignment();
    // Step2:get the topological sequence of flatgraph
    pSA->actorTopologicalorder(SSSG->GetFlatNodes());
    // Step3:do stage assignment on flatgraph
    pSA->actorStageMap(mp->GetFlatNode2PartitionNum());
}
if (Errors == 0 && GPUBackend && MAFLPFlag)
{
    pSA = new StageAssignment();
    pSA->actorTopologicalorder(SSSG->GetFlatNodes());
    pSA->actorStageMapForGPU(maflp->GetFlatNode2PartitionNum());
}

```
- Construction stage assignment object PAS
- Get the topological sequence of flatgraph
- Do stage assignment on flatgraph

## Associated file

(1)	ActorEdgeAssignment.h 
This file is the declaration header file of the stage assignment module, defining the stage assignment class StageAssignment, which contains the attributes and functions required for stage assignment.

*protected attributes：*

|Name| Descritpion|
|:-|:-|
|`vector<FlatNode *>antortopo`	|The topological sequence of flatgraph|
|`map<FlatNode* node,int stagenum>Actor2Stage`|The result of stage assignment of each node |
|`multimap< int stagenum,FlatNode* node > Stage2Actor`|	The result of stage assignment of each node|
|`vector<FlatNode * node > ActorSet`	|store actors  |
|`map<FlatNode* node ,int stagenum > DataOfActor2Stage`|The result of stage assignment of each node for GPU|
|`multimap< int stagenum,FlatNode* node > Stage2DataOfActor`|The result of stage assignment of each node for GPU|

*public functions：*

|Name| Descritpion|
|:-|:-|
|`void actorStageMap(map<FlatNode*,int> processor2actor)`	|stage assignment algorithm function|
|`void ActorEdgeAssignment ()`| topological sorting function|
|`int FindStage(FlatNode*) `|find stage number of one node|
|`vector<FlatNode *> FindActor(int i)`|Find nodes with stage number  |

See sourece file  ActorEdgeAssignment.cpp for detials



## Program process
1)	Topological sorting of SDF graph nodes—`ActorEdgeAssignment()`
The SDF graph is a directed acyclic graph. The topological sorting idea is used to arrange all the nodes in the graph into a linear sequence as the execution order of all nodes.
Topological sorting algorithm：
The topological sorting algorithm for constructing topological sequences from AOV network is as follows:
① Select a vertex with a degree of 0 and output it;
② Remove this vertex and all outgoing edges from the net.
③ Repeat ① ② until all points are deleted

2)	Next  program perform an set pipeline stage number for the topologically sorted SDF graph
Stage assignment belongs to the data-driven hierarchical pipeline scheduling domain. 
The implementation ideas are as follows:
1. Inter-cluster node asynchronous pipeline scheduling (data driven, block communication )
2. Synchronization pipeline scheduling for nodes on multi-cores
2.1 different machines: parent node execution does not affect the execution of child nodes
2.2 same machine using stage assignment algorithm
2.2.1 with the same core: the parent node and the child node are assigned to the same stage to execute
2.2.2different cores: the sub-phase number is 1 larger than the parent stage number