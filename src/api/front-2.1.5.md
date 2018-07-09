---
title:  Semantic check
type: api
order: 25
---
Semantic check is the step of the compiler front-end word and parsing. The module checks all nodes of the abstract syntax tree generated after parsing one by one.

## Program entrance
```c++
// （5）sem-check.c is a semantic check file
	PhaseName = "Semantic Check"; 
	if (Errors == 0 && SemanticCheck)
		Program = SemanticCheckProgram(Program);

```
（1）	This input of function is COStream program
（2）	SemanticCheck is the switch of semantic check，defined in the head of main.cpp

## Associated file
`sem-check.c` This is a semantic check file for the front-end syntax tree:

|Input：AST of program||
|:-|:-|
|GLOBAL List * SemanticCheckProgram()|Program is a syntax tree generated after words and grammar analysis.<br>This function performs a semantic check on it,,and return the checked program.|
|Expression node semantic checking function<br> Function type : inline Node *|SemCheckConst() <br>SemCheckId()<br>SemCheckBinop()<br>SemCheckUnary()<br>……|
|Type node semantic checking function<br>Function type : inline Node *|SemCheckPrim()<br>SemCheckTdef()<br>……|
|Other Syntaxtree nodes checking function<br>Function type : inline Node *|SemCheckDecl()<br>SemCheckAttrib()<br>SemCheckProc()|
|SPL syntax extended semantic checking function<br>Function type : GLOBAL Node *|AddDeclNodeConstTq()<br>StreamCheckFields()<br>SemCheckComposite()<br>SemCheckParam()<br>SemCheckWindow()<br>……|   

caption：The semantic analysis phase is in the SemCheckComposite() function, it assigns the program entry node gMainComposite，and let the node point to the headnode of entire Syntaxtree.It is the basis for the transformation of the grammar tree into a flatgraph。