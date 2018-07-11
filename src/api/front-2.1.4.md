---
title: Delete file & verifies the Lexical and grammatical analysis results
type: api
order: 24
---

After the front-end word and syntax analysis of the compiled project, the module deletes the temporary file under the directory where the source program file is located.
In addition, the module verifies the correctness of the previous Lexical and grammatical analysis results.

## Program entrance
```c++
// （4）Delete file & verifies the Lexical and grammatical analysis results
if (tmpname[0] != 0) 
{
    assert(0 == fclose(yyin));
    assert(0 == remove(tmpname));
}	
#ifndef NDEBUG
if (Errors == 0) {
    PhaseName = "Verification";
    VerifyParse(Program);
}
#endif

```
- Variable “Program” store the source program.
- VerifyParse(Program) function will check the correctness of the node ,data type ,declare lists expressions, expression lists,   statements, statement lists and extension grammar of COStream language after Lexical and grammatical analysis.
- Associate file : verify-parse.c

