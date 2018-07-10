---
title: Code Generation
type: api
order: 37
---

This project is a compiler for converting between high-level languages. The main purpose is to implement parallel programming under multi-core platform. The data flow program written for the data stream language COStream is converted into a multi-threaded C++ program through a series of steps of the compilation principle.
This phase implements the last module of the compiler and generates code for different platform.

## Program Entrance
```c++
// （7）Input is SDF graph，output is platform code
PhaseName = "CodeGeneration";
if (Errors == 0 && GenerateDestCode && (X86Backend || X10Backend ||
GPUBackend) )
{
    char *tmp = new char[1000];
    getcwd(tmp, 1000);
    //printf("%s\n", tmp);
    ActorEdgeInfo actorEdgeInfo(SSSG);
    CodeGeneration(tmp, SSSG,substring,pSA,mp,maflp);
    delete tmp;
    delete pSA;
    tmp = NULL;
     ……
}

```
- First，create a object of class ActorEdgeInfo, to store information about all edges in the current SDF graph;
- Entry function is CodeGeneration(…)
- Function parameter setting：
```c++
void CodeGeneration(char *currentDir,   //currentDir：directory of Source file 
SchedulerSSG *sssg,                     //sssg：SDF graph finish the scheduling and division
string substring,                       //substring： COStream source filename
StageAssignment *psa,                   //psa：result of Stageassignment
MetisPartiton *Mp,                      //Mp：result of Metis partition 
MAFLPartition *maflp)                   //maflp：result of GPU partition 
```

## Associated file

|File name |Function|
|:-|:-|
|ActorEdgeInfo.h& ActorEdgeInfo.cpp|store information about all edges in the current SDF graph|
|CodeGeneration.h& CodeGeneration.cpp|A collection of all platform code generation calls|
|X86CodeGenatate.h&X86CodeGenerate.cpp|Code generation module for the X86 platform|
|X86LibCopy.h & X86LibCopy.cpp|Lib copy module for the X86 platform|


## Key codes
Part 1: Set the COStream source filename and directory of Source file
```c++
if (Win)
{
	dir += "\\X86StaticDistCode_Win\\";
}
else 
    dir +="\\X86StaticDistCode_Linux\\";
dir += substring;
dir += "\\";
objName = new char[substring.size()+1];
strcpy(objName,substring.c_str());
```

Part 2: Genrate each part of codes
```c++
X86CodeGenerate *X86Code = new X86CodeGenerate(sssg, nCpucore, dir.c_str(),psa,Mp);
X86Code->CGGlobalvar();	     //Global variable definition cppfile	GlobalVar.cpp
X86Code->CGGlobalvarextern();//Global variable definition hppfile GlobalVar.h
X86Code->CGglobalHeader();	 // declaration of Stream stream type and global stream buffer
X86Code->CGglobalCpp();	     // global.cpp definition of Stream stream type and global stream buffer
X86Code->CGThreads();	     //all threads
X86Code->CGactors();		 //all actors
X86Code->CGMain();		     // main.cpp
```
Part 3: Copy Lib file
```c++
X86LibCopy tmp;
tmp.Run(dir.c_str());
```