---
title:  Variable rename
type: api
order: 26
---

Add variable rename module

## Program entrance

```c++
//（7）Add variable rename
PhaseName = "VariableRename";
if(Errors == 0 && VariableRename)
{
    Program = VariableRenameProgram(Program);
}
ResetASTSymbolTable(VariableRenameTable);

```
- Rename the variable name in the original program
- Related file rename.h & rename.c
