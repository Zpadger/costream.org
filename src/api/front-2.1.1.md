---
title: Preprocessing & Environment initialization 
type: api
order: 21
---

Preprocessing the input and nitialization environment is the first step of compiling the front-end processing, which is the basis of the later words and syntax analysis.

## Program entrance
This part includes three function:

|Key Variables：||
|:-|:-|
|`yyin = get_preprocessed_input()`	|Extract and process user compilation command，get the source file which need to complie,get file name and store corresponding content|
|`InitTypes()`	|Initialization type table.It is in type.h and type.c ,you should learn flex and bison. This makes the word and grammar analysis steps clear and concise.|
|`init_sysbol_tables(TRUE)`	|Initialization symbol table. Defined in main.cpp，function implemented  in symbol.h and symbol.c。|
|`InitOperatorTable()	`|Initialization Operator table. Implemented  inoperators.h and operator.c.|

## Associated file

(1) ast.h
This file is the top-level node type description file of the whole compilation project. It defines various node types through the front-end word, syntax analysis, syntax tree to floor plan conversion to back-end partition scheduling, and contains the node type of the entire project.

|NodeType|Description|
|:-|:-|
|expression nodes|`Const , Id , Binop , Unary , Cast , Comma , Ternary , Array , Call , Initializer , ImplicitCast`|
|statement nodes|`Label , Switch , Case , Default , If , IfElse , While , Do , For , Goto , Continue , Break , Return , Block`|
|type nodes|`Prim , Tdef , Ptr , Adcl , Fdcl , Sdcl , Udcl , Edcl`|
|declaration nodes|`Decl`|
|GCC_attribute extension|`Attrib`|
|procedure def node|procedure def node|
|random text and preprocessor command node|random text and preprocessor command node:Text|
|SPL nodes|`STRdcl , Comdcl , Composite , ComInOut , ComBody , Param , OperBody , Operdcl , Operator_  , Window , Sliding , Tumbling , CompositeCall , Pipeline , SplitJoin , Split , Join , RoundRobin , Duplicate , Add`|
|BasicType|`Uchar , Schar , Char , Ushort , Sshort , Uint , Sint , Int_ParseOnly , Ulong , Slong , Ulonglong , Slonglong , Float , Double , Longdouble , Void , Ellipsis , MaxBasicType`|
|Typedef  ypeSpecifier|struct|
|Typedef  ExplodedType|struct|
|Typedef  SUEtype|Struct union enum|
|various Node structure definitions in project:||
|Expression nodes	|Such as  `ConstNode`|
|Statement nodes	|Such as `SwitchNode`|
|…… | |

(2) basics.h
This is a basic type description file:

|Type|Description|
|:-|:-|
|`typedef void Generic`| void|
|`typedef void ** GenericREF`|Store Generic's address, passed by reference|
|`typedef int Bool `	|Boolean type Bool that defines a value as an integer|
|`#define assert(X)`	|check function|
|`typedef struct Basic node type`|nodeStruct Node,tableStruct SymbolTable,int OpType|
|`typedef enum Operand type opDataType`|op_int = 1 , op_float . op_unknow|
|`typedef struct tablestruct SymbolTable`	|Symbol table|
|`typedef structAST tablestruct ASTSymbolTable `	|AST Symbol table|
|`typedef struct coord`	|Coord ：Program code coordinate structure, return line, offset, file, includedp|
|Other global variable declarations	||
|`SPL Constructor，GLOBAL Node *`	|`MakeSplitOperator(); MakeJoinOperator();` ……|

(3)  type.h & type.c
This file is the front end of the compilation project,Initialize the declaration header file of the type table for the preparation of the word and parsing,There are many node types defined in this file.It extended the COStream language grammar, to analysis for COStream data stream programs.

|Type|Description|
|:-|:-|
|Enumeration type ScopeState：|This is a type structure that uses constants to represent different types：<br>`Redecl `： may redeclare a typedef name<br>`NoRedecl` :  may not redeclare a typedef name <br>`SU` : a structure or a union field <br>`Stream `: a stream SPL<br> `Formal` : a formal parameter<br>`Commal` : a SPL composite stream |
|Global type constant Node |`*PrimVoid *PrimChar *PrimSchar *PrimUchar *PrimSshort `<br>`*PrimUshort *PrimSint *PrimUint *PrimSlong *PrimUlong `<br>`*PrimSlonglong *PrimUlonglong *primFloat *PrimDouble *PrimLongdouble`|
||`*StaticString`|
||`*SintZero *UintZero *SlongZero *UlongZero *FloatZero *DoubleZero`|
||`*PtrVoid *PtrNull`|
||`*SintOne *UintOne *SlongOne *UlongOne *FloatOne *DoubleOn`e|
|Initialization type table|`void InitTypes(void)`|
|other related functions of Type table:|……|
|SPL Related function：COStream datastream Related function:|`Void CompositeConflict()`<br>`Void OperatorConflict()`<br>`Void Patameter_conflict()`<br>`Void Stream_conflict()`<br>`Void Var_conflict()`<br>`Void ModifyOperatorDeclArguments()`<br>`Void PrintStream()`<br>`Bool IsStream()`<br>`Int Stream_Sizeof()`|

(4)symbol.h & symbol.c
This file is the front end of the compilation project. It initializes the declaration header file and implementation file of the symbol table for the preparation of words and parsing. The internal definition of the program code uses symbol mark information to simplify the symbol marks in lexical analysis.

|Type|Description|
|:-|:-|
|Structure type symbolstruct：|This is a type structure that defines the information in the symbol table, including：<br>`const char *name`<br>`Generic *var`<br>`Scope scope`<br>`Symbol *next`<br>`Symbol *shadow`<br>`Symbol *scope_next` |
|Structure type Scope |short level <br>short version|
|Structure type ASTsymbolstruct|Extend the symbol table for the COStream program:<br>`const char *name`<br>`const char *newName`<br>`Generic *oldId`<br>`Generic *newId`<br>`ASTSymbol *next`<br>`ASTSynbol *shadow`|
|New symboltable|`SymbolTable *NewSymbolTable(…)`|
|Other related function|……|
|COStream  symbol table function|`ASTSymbolTable *NewASTSymbolTable (…)`<br>`Void ResetASTSymbolTable (…)`<br>……|

(5)operators.h & operators.c
The project front end is compiled, and the declaration header file and the implementation file of the operator table are initialized for the follow-up words and the preparation work before the parsing, and the unary, binary to multi-operator in the program code is internally defined.

|Type|Description|
|:-|:-|
|Structure type OpEntry|This is a type structure that defines the information in the operator：<br>`const char *text  // Corresponding operator content`<br>`const char *name // Corresponding operator name`<br>`short unary_prec`<br>`short binary_prec	`<br>`Bool left_assoc<br>Bool (*unary_eval)(Node *)` |
|Initialize function|`void InitOperatorTable(void)`|
|Other related function|……|

## Preprocessing input

The input preprocessing module is implemented by the `get_preprocessed_input()` function in main.cpp, which mainly completes the processing of the compiler input program source file, extracts the source program name and code in the file, and assigns a value to `input_file`.
Read the contents of the input file for subsequent processing

## Inilitize type tables 

The initialization type table module is implemented by the `InitTypes()` function in type.c.
```c++
// Create a storage type array TypeNames in the grammar, save the names of all basic data types
PRIVATE const char *TypeNames[MaxBasicType];
GLOBAL void InitTypes()
{ 
    TypeNames[Uchar] = "unsigned char";
    TypeNames[Schar] = "signed char";
    TypeNames[Char] = "char";
    TypeNames[Ushort] = "unsigned short";
    TypeNames[Sshort] = "short";
    TypeNames[Uint] = "unsigned";
    TypeNames[Sint] = "int";
    TypeNames[Int_ParseOnly] = "int";
    TypeNames[Ulong] = "unsigned long";
    TypeNames[Slong] = "long";
    TypeNames[Ulonglong] = "unsigned long long";
    TypeNames[Slonglong] = "long long";
    TypeNames[Float] = "float";
    TypeNames[Double] = "double";
    TypeNames[Longdouble] = "long double";
    TypeNames[Void] = "void";
    TypeNames[Ellipsis] = "...";
    // Create a basic type node, implemented by the MakePrim() function in the ast.c file
    EllipsisNode  = MakePrim(EMPTY_TQ, Ellipsis);
    Undeclared   = MakeDecl("undeclared!", EMPTY_TQ, NULL, NULL, NULL);
    PrimVoid     = MakePrim(EMPTY_TQ, Void);
    PrimChar     = MakePrim(EMPTY_TQ, Char);
    PrimSchar    = MakePrim(EMPTY_TQ, Schar);
    PrimUchar    = MakePrim(EMPTY_TQ, Uchar);
    PrimSshort   = MakePrim(EMPTY_TQ, Sshort);
    PrimUshort   = MakePrim(EMPTY_TQ, Ushort);
    PrimSint     = MakePrim(EMPTY_TQ, Sint);

    PrimUint     = MakePrim(EMPTY_TQ, Uint);
    PrimSlong    = MakePrim(EMPTY_TQ, Slong);
    PrimUlong    = MakePrim(EMPTY_TQ, Ulong);
    PrimSlonglong= MakePrim(EMPTY_TQ, Slonglong);
    PrimUlonglong= MakePrim(EMPTY_TQ, Ulonglong);
    PrimFloat    = MakePrim(EMPTY_TQ, Float);
    PrimDouble   = MakePrim(EMPTY_TQ, Double);
    PrimLongdouble = MakePrim(EMPTY_TQ, Longdouble);
    StaticString = MakePtr(EMPTY_TQ, MakePrim(T_STATIC, Char));
    /* Make some standard zeros */
    SintZero   = MakeConstSint(0);
    UintZero   = MakeConstUint(0);
    SlongZero  = MakeConstSlong(0);
    UlongZero  = MakeConstUlong(0);
    FloatZero  = MakeConstFloat(0.0);
    DoubleZero = MakeConstDouble(0.0);
    /* Make some standard ones */
    SintOne    = MakeConstSint(1);
    UintOne    = MakeConstUint(1);
    SlongOne   = MakeConstSlong(1);
    UlongOne   = MakeConstUlong(1);
    FloatOne   = MakeConstFloat(1.0);
    DoubleOne  = MakeConstDouble(1.0);

    PtrVoid = MakePtr(EMPTY_TQ, PrimVoid);
    PtrNull = MakeConstPtr(0);
}

```

## Inilitize Symbol tables

The initialization symbol table module defines the identifiers, keywords, expressions and other symbols in the grammar, which is implemented by the `init_sysbol_tables(...) `function in main.cpp.

```c++
// Initialization symbol table
PRIVATE void init_symbol_tables(Bool shadow_warnings)
{
    ShadowProc shadow_proc;
    if (shadow_warnings)
      shadow_proc = (ShadowProc) shadow_var;
    else
      shadow_proc = NULL;
    // Defining grammar identifier
    Identifiers = NewSymbolTable("Identifiers", Nested,
				 shadow_proc, (ExitscopeProc) OutOfScope);
    Labels = NewSymbolTable("Labels", Flat,
			    NULL, (ExitscopeProc) EndOfLabelScope);
    Tags = NewSymbolTable("Tags", Nested,
		shadow_warnings ? (ShadowProc)ShadowTag : (ShadowProc)NULL,
		NULL);
    Externals = NewSymbolTable("Externals", Flat,
			       NULL, (ExitscopeProc) OutOfScope);
/*****************--------------Define For COStream----------********************/
	CompositeIds = NewSymbolTable("CompositeIds", Flat,
		NULL, (ExitscopeProc) OutOfScope);
	ToTransformDecl = NewASTSymbolTable("ToTransformDecl",Flat);//zww
	ParameterPassTable = NewASTSymbolTable("ParameterPassTable",Flat);//zww
	VariableRenameTable = NewASTSymbolTable("VariableRenameTable",Flat);//ly
}
```

## Initialization operator table

The initialization operator module completes the definition of various mathematical operators and language processing operators in the grammar, implemented by the `InitOperatorTable()` function in operator.c:

```c++
GLOBAL void InitOperatorTable()
{
    SET_OP(ARROW,       "->",      "ARROW",       0, 15);
    SET_OP('.',         ".",       "DOT",         0, 15);
    SET_OP('!',         "!",       "not",        14,  0);
    SET_OP('~',         "~",       "bitnot",     14,  0);
    SET_OP(ICR,         "++",      "ICR",        14,  0);
    SET_OP(POSTINC,     "++",      "postinc",    14,  0);
    SET_OP(PREINC,      "++",      "preinc",     14,  0);
    SET_OP(DECR,        "--",      "DECR",       14,  0);
    SET_OP(POSTDEC,     "--",      "postdec",    14,  0);
    SET_OP(PREDEC,      "--",      "predec",     14,  0);
    SET_OP(SIZEOF,      "sizeof",  "sizeof",     14,  0);
    // Defining logical operators
    SET_OP(ADDRESS,     "&",       "addrof",     14,  0);
    SET_OP(INDIR,       "*",       "indir",      14,  0);
    SET_OP(UPLUS,       "+",       "UPLUS",      14,  0);
    SET_OP(UMINUS,      "-",       "neg",        14,  0);
    SET_OP('*',         "*",       "mul",         0, 13);
    SET_OP('/',         "/",       "div",         0, 13);
    SET_OP('%',         "%",       "mod",         0, 13);
    SET_OP('+',         "+",       "add",         0, 12);
    SET_OP('-',         "-",       "sub",         0, 12);
    SET_OP(LS,          "<<",      "lsh",         0, 11);
    SET_OP(RS,          ">>",      "rsh",         0, 11);
    SET_OP('<',         "<",       "lt",          0, 10);
    SET_OP('>',         ">",       "gt",          0, 10);
    SET_OP(LE,          "<=",      "le",          0, 10);
    SET_OP(GE,          ">=",      "ge",          0, 10);
    SET_OP(EQ,          "==",      "eq",          0,  9);
    SET_OP(NE,          "!=",      "ne",          0,  9);
    SET_OP('&',         "&",       "band",        0,  8);
    SET_OP('^',         "^",       "bxor",        0,  7);
    SET_OP('|',         "|",       "bor",         0,  6);
    SET_OP(ANDAND,      "&&",      "and",         0,  5);
    SET_OP(OROR,        "||",      "or",          0,  4);
    /* ternary operator has precedence three, but is handled separately */
    SET_OP('=',         "=",       "asgn" ,       0,  2); RIGHT_ASSOC('=');
    SET_OP(MULTassign,  "*=",      "*=",          0,  2); RIGHT_ASSOC(MULTassign);
    SET_OP(DIVassign,   "/=",      "/=",          0,  2); RIGHT_ASSOC(DIVassign);
    SET_OP(MODassign,   "%=",      "%=",          0,  2); RIGHT_ASSOC(MODassign);
    SET_OP(PLUSassign,  "+=",      "+=",          0,  2); RIGHT_ASSOC(PLUSassign);
    SET_OP(MINUSassign, "-=",      "-=",          0,  2); RIGHT_ASSOC(MINUSassign);
    SET_OP(LSassign,    "<<=",     "<<=",         0,  2); RIGHT_ASSOC(LSassign);
    SET_OP(RSassign,    ">>=",     ">>=",         0,  2); RIGHT_ASSOC(RSassign);
    SET_OP(ANDassign,   "&=",      "&=",          0,  2); RIGHT_ASSOC(ANDassign);
    SET_OP(ERassign,    "^=",      "^=",          0,  2); RIGHT_ASSOC(ERassign);
    SET_OP(ORassign,    "|=",      "|=",          0,  2); RIGHT_ASSOC(ORassign);
    /* comma operator has precedence one, but is handled separately */
}

```

The` SET_OP(int i, const char *text, const char *name, int unary, int binary)` function adds the corresponding operator to the defined operator table, and populates the operator information with the data in the operator. Implemented in .c.