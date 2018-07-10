---
title:   Estimate workload of  nodes in flatgraph
type: api
order: 29
---

Estimate workload to nodes in flatgraph: Workload estimation for all nodes in the static data flow graph SDF converted from the syntax tree, laying the foundation for back-end scheduling and partitioning

## Program entrance

```c++
//（11）Workload estimate to nodes in flatgraph
PhaseName = "WorkEstimate";
if (Errors == 0 && WorkEstimate)
	GenerateWorkEst(SSG,WorkEstimateByDataFlow);
```

## Associate file

(1)	GenerateWorkEst.cpp
This file defines and implements the flatgraph node workload estimation function.
```c++
GLOBAL void GenerateWorkEst(StaticStreamGraph *ssg,bool WorkEstimateByDataFlow)
{
    int len = ssg->GetFlatNodes().size();//get the length of operator
    for (int i=0;i<len;i++)
    {
        int w = 0,w_init = 0;
        FlatNode *tmpFn = (ssg->GetFlatNodes())[i];
        //get the operator body 
        ChildNode *body =  tmpFn->contents->body;
        if ( body != NULL)     //calculate workload in operator body
        {
            w_init = workEstimate_init(body, w);
            //choose way of workestimate
            if(WorkEstimateByDataFlow)
                w = workEstimateUseDataFlow(body,w);
            else
                w = workEstimate(body, w);
        }
        //rest head and tail of buffer in multicore
        w += (tmpFn->outFlatNodes.size()+tmpFn->inFlatNodes.size())*UPDATEEDGETAG;		    
        ssg->AddInitWork(tmpFn, w_init);
        ssg->AddSteadyWork(tmpFn, w);
    }
}

```

(2)workEstimate.h & workEstimate.c
The general way of calculate  the node workload defined and implemented in this file。

```c++
//Workload for different node types are defined in the header file;
#define PRINT  3
#define PEEK  3
#define POP  3
#define PUSH  3
#define INT_ARITH_OP  1
#define FLOAT_ARITH_OP  2
#define LOOP_COUNT  5
#define SWITCH  1
#define IF  1
#define CONTINUE  1
#define BREAK  1
#define MEMORY_OP  2
#define METHOD_CALL_OVERHEAD  10
#define UNKNOWN_METHOD_CALL  60
#define INIT 0
#define STEADY 1
#define STREAM_OP 20
#define PRINTLN_OP -60 
#define FRTA_OP -60 
int totalWork = 0;

```
```c++
//Logic of workload estimate:
GLOBAL int workEstimate(Node *from,int w)
{
    state =STEADY;
    totalWork = w;
    if(from->coord.line == 0)
        isSTREAM = 1;
    rWorkCompute(from);  // Set different workload weights for different node types
    isSTREAM = 0;
    return totalWork;
}
```
See project files for more details

(3)	workEstimate2.h & workEstimate2.c
This file is responsible for estimating the steady-state workload of the data stream.

```c++
//First，define different workload for different type of node 
int totalWork = 0;

……
//Then, implement workestimate function
GLOBAL int workEstimateUseDataFlow(Node* from,int w)
{
    totalWork = w;
    return totalWork;
}

……
//Since the data flow estimation steady-state workload calculation method is not implemented, the code here is not complete.

```
