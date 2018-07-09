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
（1）	Rename the variable name in the original program
（2）	Related file rename.h & rename.c
