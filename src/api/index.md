---
title: Overview
type: api
order: 1
---
## Architecture of compiler project
![编译器工程架构](/img/PART2-1.png)
### Front-end of compiler
1. Get Input

    `Main#Handle_options`
    `Main#Get_preprocessed_input`

    Initialization environment
    `GLOBAL#InitTypes`
    `Main#Init_symbol_tables`
    `GLOBAL#InitOperatorTable`

1. Grammar creation & grammar generation
    `GLOBAL#yyparse`
    genetate`List*program`，this `program` is grammar

1. Print symbol table

    `GLOBAL#PrintSymbolTable`

1. Delete temporary files

1. Print abstract syntax tree

    `GLOBAL#PrintList`

1. Semantic check
    `GLOBAL#SemanticCheckProgram`
    
1. Active variable analysis
    `GLOBAL#AnalyzeProgram`
    
1. Variable rename
    `GLOBAL#VariableRenameProgram`
    `GLOBAL#ResetASTSymbolTable`
    This part rename the variable name ,according to actor's name and it's number
    Such as sink_30.h
    
1. Constant propagation
    `GLOBAL#PropagateProgram`
    Replace expressions that always get the same constant value each time you run it with a constant value

1. AST to Flatgraph	
    `GLOBAL#AST2FlatStaticStreamGraph`
    `AutoProfiling#AutoProfiling()`
    `AutoProfiling#GeneratingProfile()`
    
1. Estimate workload to nodes in flatgraph
    static workload estimate：
    `GLOBAL#GenerateWorkEst()`

### Back-end of compiler

1. Initial scheduling and steady-state scheduling
    `GLOBAL#SchedulingSSG(),生成SSSG为SchedulerSSG`
    
1. Describe the SDF diagram in the form of XML
    `GLOBAL#DumpStreamGraph()`
    
1. Parition graph
    `MetisPartition#MetisPartiton()`
    `Partition#setPlaces()`
    `Partition#SssgPartition()`
    
1. Horizontal split
    Switch Variable: `RHFissionission`
    After the horizontal split, you need to divide from the new metis
    `MetisPartiton()`
    `setPlaces()`
    `SssgPartition()`
 
1. Print theoretical speedup ratio
    Switch Variable: `Speedup`
    `GLOBAL#ComputeSpeedup()`
    
1. Stage Assignment
    `StageAssignment#StageAssignment()`
    `StageAssignment#actorTopologicalorder(GetFlatNodes())`
    `StageAssignment#actorStageMap(GetFlatNode2Partition())`
    
1. Code Generation
    `库函数#direct.h#getcwd()`
    `GodeGeneration#CodeGeneration()`
    
![编译器后端](/img/PART2-2.png)
