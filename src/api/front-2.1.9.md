---
title:  Print AST
type: api
order: 28
---

In this stage,the AST of COStream program will be printed.

## Program entrance

```c++
//（9）Print AST
if (PrintAST) 
{
    PrintList(stdout, Program, -1);
    fprintf(stdout, "\n");
}

```
-	PrintAST：this varable is the switch of PrintAST ，defined in the head of main.cpp
-	Function PrintList(…) print the AST of COStream program into a file of on the screen

## Associated file

`print-ast.c`
All print function are defined in this file ,include print function of all kinds of node.	

|Nodes print function|Description|
|:-|:-|
|Print expression nodes||
|`PrintConst(…)`|Print constant expression node |
|`PrintBinop(…)`|Print binary expression|
|......|......|
|Print Statement node ||
|`PrintLabel(…)`|Print lable node |
|`PrintSwitch(…)`|Print switch node |
|......|......|
|Print type node||
|`PrintPrim(…)`|Print basic data type|
|`PrintFdec(…)`|Print function declaration|
|......|......|
|Print COStream extension  grammar node||
|`PrintComposite(…)`|COStream keywords Composite node|
|`PrintParam(…)`|COStream Param node |
|......|......|
|Print syntax tree nodes and list||
|`PrintNode(…)`|This functionjudge nodes type and call Corresponding type node print function|
|`PrintList(…)`|The syntax tree of the program is stored in the form of a linked list.This function traverses from the head node in order to print out the nodes according to the node type.|