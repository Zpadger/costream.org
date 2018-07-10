---
title: Describe the SDF diagram in the form of XML
type: api
order: 32
---

After the initial scheduling and steady-state scheduling of the flatgraph in the back-end step one, the SSSG (schedule static stream Graph) is obtained. The next step is to graph partition, merge the split, and perform a series of optimization and finally generate the target code.
Following step 2, the SDF map is described in the form of XML text, which generates a dot file to print the SDF map.

## Program Entrance

```c++
// （(1)Describe the SDF diagram in the form of XML
PhaseName = "SSG2Graph";
if (Errors == 0 && SSG2Graph)
    DumpStreamGraph(SSSG, NULL, "flatgraph.dot",NULL);
```
-	Variable PhaseName is the Stage name，the value is `SSG2Graph (SSG to graph)`
-	`SSG2Graph` is the switch of this phase，which type is `Global Bool`，,and it is defined in the main.cpp source file
-	The program entry is the function DumpStreamGraph(SSSG, NULL, "flatgraph.dot",NULL)，the input is the SSSG，and the output is a dot file “flatgraph.dot”

## Associated file

(1)	dumpGraph.h
This is a simple header declaration file that does not contain substantive content and only contains precompiled declarations.
```c++
#ifndef _DUMP_H
#define _DUMP_H
#include "MetisPartiton.h"

#endif // _DUMP_H
```
(2)	dumpGraph.cpp
This implementation file for visit and color the flow graph node.
First，we defined an array of 146 color in the file,which is used to distinguish the different nodes of the flow graph on each core.
Next，we defined and implement a function that accesses the flow graph node information and prints it.
In addition, the dot file output function defined and implemented,.Function `void DumpStreamGraph(SSSG, NULL, "flatgraph.dot", NULL)` .This function is the program entry of the compiler backend step 2 in main.cpp.

```c++
GLOBAL void DumpStreamGraph(SchedulerSSG *sssg,Partition *mp,const char *fileName, ClusterPartition* cp)
{	
    if ( cp )
    {
        vertexBuf.str("");
        edgeBuf.str("");
        stringstream buf;
        Ssg = sssg;
        mpp = mp;
        buf<<"digraph COStream {";
        vertexBufInPlace = new stringstream[cp->GetClusters()];
        toBuildClusterOutPutString(Ssg->GetTopLevel(), cp);
        for (int i = 0; i < cp->GetClusters(); i++)
        {
            buf << "\nsubgraph cluster_" << i << " {";
            buf << "\nlabel = \"place_" << i << "\";";
            buf <<vertexBufInPlace[i].str() << "}" ;
        }
        buf<<"\n\n";  
        buf<<edgeBuf.str();
        buf<<"}\n";  
        Ssg->ResetFlatNodeVisitTimes();//set flatnode ‘s visittimes to 0
        ofstream fw;
        fw.open(fileName);
        fw<<buf.str();
        fw.close();
    }
    else
    {
        Ssg = sssg;
        mpp = mp;
        buf.str("");
        buf<<"digraph Flattend {\n";
        toBuildOutPutString(Ssg->GetTopLevel());
        buf<<"}\n";  
        Ssg->ResetFlatNodeVisitTimes();//set flatnode ‘s visittimes to 0
        ofstream fw;
        fw.open(fileName);
        fw<<buf.str();
        fw.close();
    }
}

void toBuildOutPutString(FlatNode *node)
{
    //visit and print the info of node
    MyVisitNode(node);
    for (int i = 0; i < node->nOut; i++) {/*DSP*/
        //if the child node of this node isn’t visited
        if (node->outFlatNodes[i] == NULL || node->outFlatNodes[i]->GetVisitTimes() != 0)
        continue;
        toBuildOutPutString(node->outFlatNodes[i]);
    }
}

/* visit and print the info of node，color the node */
void MyVisitNode(FlatNode *node)
{
    node->VisitNode();
    if (node->contents!=NULL ) {
        ...(code of print the info of node )
        //color the node after Partition
        if(mpp != NULL)
        {		
            buf<<" color=\""<<color[mpp->findPartitionNumForFlatNode(node)]<<"\""; 
            buf<<" style=\"filled\" "; 	
        }
        ...
    }
}

```
The above code is an implementation function that describes the SDF diagram in the form of XML text.