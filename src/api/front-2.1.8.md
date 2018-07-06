---
title:  Constant propagation
type: api
order: 27
---
Constant propagation: replace expressions that always get the same constant value each time you run it with a constant value

## Introduce

Constant propagation is a compiler optimization technique that is used in modern compilers. Advanced constant propagation forms, or sparse conditional constant propagation, can propagate constants more accurately and seamlessly remove useless code.

## Program entrance

```c++
// （8）Constant propagation
	PhaseName = "Propagate";
	if (Errors == 0 && Propagate)
	{
		Program = PropagateProgram(Program);
		gIsAfterPropagate = TRUE;
	}

```
（1）	Variable “Propagate”  is the switch of Constant propagation，defined in the head of main.cpp
（2）	Function PrapagateProgram(…) implement the constant propagation. The input of the function is the program AST after active variable analysis，and the output is the program ASTafter the constant propagation
（3）	Associate file : propagator.h & propagator.cpp which is the declaration header file of the constant propagation and the code implementation file.
