---
title: Initial scheduling and steady-state scheduling
type: api
order: 31
---

From the syntax tree to the flatgraph at the front-end，wo get the Static Stream Graph(SSG) and estimate the workload. In the back-end of the complier，we process the the flat graph.

## Program Entrance

```c++
// （1）The first is initial scheduling and steady-state scheduling of the SSG， SSG is transformed form the syntax tree at step(10) in the front-end
	PhaseName = "schedulerSSG";
	if (Errors == 0 && SchedulingFlatSSG)
		SSSG = SchedulingSSG(SSG);

```
1）	Variable PhaseName is the Stage name，the value is `schedulerSSG (scheduler static stream graph)`
2）	schedulingFlatSSG is the switch of scheduling flatgraph，which type is Global Bool,and it is defined in the main.cpp source file
3）	The program entry is the function` SchedulingSSG(SSG)`，the input is the SSG ,and the output is the SSSG which finish the scheduling.

## Associated file

1）	staticStreamGraph.h and  staticStreamGraph.cpp  see 2.1.10
2）	schedulerSSG.h class schedulerSSG：This class inherits from StaticStreamGraph

|Name| Descritpion|
|:-|:-|
|`mapInitCount2FlatNode`	|`map<FlatNode * node, int initcount>`store the initial scheduling result of all nodes in SDF graph |
|`mapSteadyCount2FlatNode	`|`map<FlatNode* node,int steadycount>` store the steady scheduling result of all nodes in SDF graph|
|`SchedulerSSG(StaticStreamGraph *ssg)	`|Constructor|
|`InitScheduling()	`|return：`bool `<br>initial schedule the SSG|
|`SteadyScheduling()`	|return：`bool` <br>steady-state schedule the SSG|
|`GetInitCount(FlatNode *node)	`|return：`int `<br>get Initcount of a node|
|`GetSteadyCount(FlatNode *node)	`|return：`bool`<br>get steadycount of a node|
|`SteadySchedulingGroup(Vector <FlatNode *>)`	|return：`map<FlatNode *,int>`<br>do steady scheduling to a group of nodes|

The implememtation code is in source file schedulerSSG.cpp

3）	schedule.cpp
This cpp file is an implementation file designed to handle the dispatch entry function. The actor in SDF is executed periodically. The periodic scheduling calculates the number of times each actor needs to be executed repeatedly when SDF completes a complete execution, that is, the number of steady-state executions of the actor. The sequence of steady-state execution times of all actors is the SDF graph steady state. Scheduling. Only the actor nodes in the SDF have reached the steady-state scheduling, and the next processing steps can be smoothly carried out to achieve the final code generation.

```c++
GLOBAL SchedulerSSG *SchedulingSSG(StaticStreamGraph *ssg)
{
	SchedulerSSG *sssg = new SchedulerSSG(ssg);
	//do SteadyScheduling to sssg, if success return true
	if(sssg->SteadyScheduling())
	{
		sssg->InitScheduling();		
	}
	else
	{
		fprintf(stdout, " The program does not have steady state scheduling , cannot generate code.！\n");
		system("pause");
		exit(1);
	}//else
	return sssg;
}

```
The above code is the implementation of the scheduling , it’s very clear。
- The input is the SSG.
- The output is the SSSG which finish the scheduling.


## FAQ

### Why is the scheduling order first steady state and initial state?
- Steady-state scheduling processes the amount of data from the top-down node to reach equilibrium
- The initial state schedules the amount of data from the bottom-up processing node to reach equilibrium		    
- The initial scheduling and the steady scheduling are independent of each other;
Function SteadyScheduling()determines whether the SDF can reach steady state；
Reduce the memory overhead by avoidable InitScheduling() function calls
### What does the initial state and steady state scheduling do for the SDF diagram?
- Did not change the structural characteristics of the SDF
- Just calculate how the data filling the SDF graph (sssg)
