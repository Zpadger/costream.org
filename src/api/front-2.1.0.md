---
title: Get & preprocess Input file
type: api
order: 20
---

The C2C_Test project is a compiler implementation for the data stream language COStream. The goal is to obtain the target of the input COStream source program through compiler processing (lexical analysis, parsing, semantic analysis, intermediate code generation and optimization, target code generation) C++ parallel code. Different from the common compiler, we not only realize the conversion from COStream to the high-level language C++, but also do partition and scheduling to the program and finally get C + + multi-threaded code , according to the parallelism exposed in the input COStream source program and the node information of the corresponding data flow graph .

## Program Entrance
```c++
GLOBAL int main(int argc, char *argv[])
{
	……
//Frontend
	preproc = default_preproc;
//Get input, processe command line parameter
    handle_options(argc, argv);
	
	int pos1 = InputFileName.find_last_of('/');
	int pos2 = InputFileName.find(".spl");
	string substring=InputFileName.substr(pos1+1,pos2-pos1-1);	
string ccfilename=InputFileName.substr(pos1+1,pos2-pos1-1);
```
（1）	default_preproc is a private variable in main.cpp，it store the default compile command”gcc –E –x c” .
（2）	The basic variable preproc is used to compile the command processing judgment.
（3）	Main function arguments (argc,argv)， argc means number of arguments，argv store all the arguments，in this project argc=1 argv=“project directory”.
（4）	The handle_option function assigns Input_file to InputFileName, then intercepts the input source file nameand records. The substring and ccfilename to store the file name. The former has a reference in the post code generation, and the latter in the workload estimation step.

## Associate file
`main.cpp`
This file is the entry file for the entire project, which defines the program entry function main(argc, argv), as well as the necessary header file references, necessary global variable declarations, necessary basic function definition implementations, etc. See main.cpp for details.

|Key Variables：||
|:-|:-|
|`GLOBAL List *Program` |This is a global List* variable designed to handle input source programs, program=source program file addresses, and  *program=source program, which is the target for front-end parsing.|
|`GLOBAL Node * gMainComposite` | This is the entrance to the analysis program.And also the entrance of main function of stream program.It is also the root node of the syntax tree, and is also the head node of the data flow graph SDF.|
|`GLOBAL extern StaticStreamGraph *SSG	`|`SSG` is the StaticStreamGraph, it stores the flatgraph from the front-end syntax tree. Extern key word means it is just a declaration.|
|`GLOBAL SchedulerSSG *SSSG`	|`SSSG `come from `SSG`, it is a data flow Graph after initial state scheduling and steady state scheduling
|`GLOBAL Bool PrintAST`|	Switch variable. If true,print the AST.  If false ,not。|
| .etc……||
|Key function：||
|`void handle_options(int argc , char *argv[])` |	The command line parameter processing function obtains various information included in the compile command of the source program inputed by the user.|
|`void init_symbol_tables(Bool shadow_warnings)	`|Function of initialize the symbol table |
|`FILE *get_preprocessed_input()`|	Preprocessing the input source program，and get the information of the input source program, and store the file address in Input_File|

## Input file acquisition and processing
The initialization of the complier include analyze source file and compile commands arguments.it is implementd by ` handle_options(int argc , char *argv[])` in main.cpp：
（1）	function `arguments (int argc , char *argv[])`, argc means number of arguments，argv store all the arguments，in this project argc=1 argv=“project directory”
（2）	`char *files[16] = {"./tests/SPLtest/Benchmarks/rvq.spl2.cc", ….}`; is a array store the test file dirctory；
（3）	Analyze command arguments：
```c++
if (X86Backend)
  {
	  argc = 5;  
	  argv[1] = "-x86";         //chose platform
	  argv[2] = "-nCpucore";    //set cpu core number
	  argv[3] = "8";           // set cpu core number
	  argv[4] = files[3];        //sorcefile for test
  }
  else if (GPUBackend)
  {
	  argc = 9;
	  argv[1] = "-gpu";  
	  argv[2] = "-nGpu";
	  argv[3] = "3";
	  argv[4] = files[8];
	  argv[5] = "-o";
	  argv[6] = "test";
	  argv[7] = "-multi";
	  argv[8] = "3";
  }

```
（4）	Handling command line arguments
```c++
for (i=1; i<argc; i++) {
    if (argv[i][0] == '-') {  
      switch (argv[i][1]) {
		  case '-':
			QuietlyIgnore = !QuietlyIgnore;
			break;
		  case 'h':
			usage(FALSE, 0);
			break;
		  case 'a':
			if (strcmp(argv[i], "-ansi") == 0) {
			  ANSIOnly = TRUE;
			  /* change the preprocessor command, if the user hasn't
				 already changed it with -P */
			  if (preproc == default_preproc)
				preproc = ansi_preproc;
			}
			else if (strcmp(argv[i], "-ast") == 0) 
			  PrintAST = TRUE;
			else
			  unknown_option(argv[i]);
			break;
             ……
        }//switch
    } else {
      if (input_file != NULL) {
		fprintf(stderr, "Multiple input files defined, using `%s'\n",argv[i]);
      }//if
	  else
		input_file = argv[i];
    }//if
  }//for

```