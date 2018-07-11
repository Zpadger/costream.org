---
title: Grammar creation and grammar tree generation
type: api
order: 22
---

After the input preprocessing and initialization types, symbol tables, and operator classes are completed, the program enters the front-end core processing module lexical analysis and parsing. This step is processed for the input source program file to get an abstract syntax tree describing the program file.

## Program entrance

```c++
/*（2）Grammar creation and grammar tree generation，yyparse()function is an internal call parser
* 于parser.c 3371行 {Program = GrabPragmas((yyvsp[(1)-(1)].L))};
* Get the analysis result of the input source program - syntax tree，store in list *program
*/
PhaseName = "Parsing";
parsed_ok = yyparse(); 
if (Level != 0) 
{
    SyntaxError("unexpected end of file");
}
```
Lexical analysis and Gramma analysis are in` parse()`.In order to truly understand the steps and connotations, you must have a good grasp of lexical analysis and grammar analysis and carefully read the words and grammar analysis files in the project.

## Flex

Flex is a fast lexical analyzer generator：
-  	Describe the lexical structure with regular expressions
-  	Regular expressions use meta language to describe matching patterns
-  	For this project, c4.l is the corresponding lexical analysis file
-  	steps as shown below：

![Flexsteps](/img/Flexsteps.png)

## Bison
Bison is a Parser：
- 	use —BNF paradigm
- 	Using the move/protocol analysis to match the matching rules of the current token
- 	ANSI-C.y is the corresponding parsing file in this project
- 	steps as shown below：

![Bisonsteps](/img/Bisonsteps.jpg)