---
title: Print theoretical speedup ratio
type: api
order: 35
---

The theoretical speedup ratio is used to compare the operating efficiency of programs on single-core and multi-core platforms.
Calculation method: 
theoretical acceleration ratio = total workload on single core / maximum workload on multicores.

## Program Entrance
```c++
// （5）Print theoretical speedup ratio
PhaseName = "Speedup";
if (Errors == 0 && Speedup && (X86Backend||X10Backend) )
    ComputeSpeedup(SSSG,pp,ccfilename,"workEstimate.txt","RRS");
```
The input argument of the function:
-	SSSG：Actual parameters, results of initial state, steady state scheduling 
-	pp：Actual parameters, divided result
-	The result of the program workload is written to the file workEstimate.txt

## Associated file
(1)	Speedup.h
This is a simple header declaration file that does not contain substantive content and only contains declarations for precompiled headers.

```c++
#ifndef _DUMP_H
#define _DUMP_H
#include "MetisPartiton.h"

#endif // _DUMP_H

```
(2)	Speedup.cpp
The file is a implementation file of the printing theory acceleration ratio. The specific idea is to measure the steady workload of each node in the SDF graph corresponding to the data flow program, and find the sum of the workloads of all nodes as a single core platform. And then, according to the results of the division, find the maximum workload, find the ratio as the execution acceleration ratio of the single-core and multi-core programs.

Step 1：Find the total workload of all nodes in the SDF graph
```c++
for (int i=0;i<sssg->GetFlatNodes().size();i++)
{
	total +=sssg->GetSteadyCount(sssg->GetFlatNodes()[i])*
    sssg->GetSteadyWorkMap().find(sssg->GetFlatNodes()[i])->second;
}

```

Step 2：Find the maximum workload maxWorkLoad on each parts
```c++
for (int i=0;i<mp->getParts();i++)//遍历每个place
{
    //find node set in partition i
    vector<FlatNode *> tmp = mp->findNodeSetInPartition(i);
    double total_inplace=0.0;
    for (int j=0;j<tmp.size();j++)
    {
        //node’s Execution workload = number of executions * per steady-state workload
        double tmpd=sssg->GetSteadyCount(tmp[j])*ssg->GetSteadyWorkMap().find(tmp[j])->second;
        total_inplace += tmpd;
        if(tmpd > maxActorWorkload) 
        {
            maxActorWorkload=tmpd;
            maxActorWorkloadName=tmp[j]->name;
        }		
        buff<<i<<"\t\t\t"<<tmp[j]->name<<"\t\t\t\t\t"<<tmpd<<"\t\t\t"<<
        do_fraction(tmpd/total*100)<<"%\n";
    }
    string inp=do_fraction(total_inplace);
    buf<<i<<"\t\t\t"<<total_inplace<<"\t\t"<<do_fraction(total_inplace/total*100)<<"%\n";
    if(total_inplace > maxWorkLoad) 
        maxWorkLoad = total_inplace;
}
```

Step 3：Calculate the ratio of the two-step as the execution acceleration ratio of the program, print out result
```c++
buf <<"##################### total info ###############################\n";
buf<<"total workload \t= "<<t<<"\n";
buf<<"max workload \t= "<<maxWorkLoad<<"\n";
buf<<"max speedup \t= "<<do_fraction(total/maxWorkLoad)<<"\n";
```
