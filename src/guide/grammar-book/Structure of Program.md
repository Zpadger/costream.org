---
title: Structure of Program
type: guide
order: 35
---

##   External C++

The figure below shows the compiled procedure of COStream program. The COStream compiler is a source-to-source compiler, which compiles the COStream program to parallel object code on the target platform(C++ like this) and uses the underlying compiler to generate final object code at last.

![6.1](https://i.loli.net/2018/07/01/5b38d266f2005.png)

The COStream compiler has two approachs to finish the program compilation: self-supporting pattern and extern-embed pattern. For example, if we need C++ program as the object code, in self-supportint pattern, the COStream source code will be converted into C++ code first, and be compiled to the independent machine-code next without any intervention else. But in the extern-embed pattern, COStream code will be called by external interface in external C++ program, which likes a normal C++ library compiled and linked with the external C++ code to the machine-code. We just need to choose the compiler option, the compiler will compile source code with different ways: "embed" means extern-embed pattern, and the "normal" means self-supporting pattern. Here we give a brief introdction to the interface in COStream compiler's extern-embed pattern.

In the extern-embed pattern of COStream compiler, we define the RunCOStream class in "RunCOStream.h" file, which is a head file generated during the compilation. The RunCOStream class is included in "COStream" namespace, and the interfaces in RunCOStream class are as follows:
```c++
RunCOStream(stringstream& instream);
RunCOStream(void* pSrc,int srcDataCount);
RunCOStream(string path)；
void Run();
int GetOutputNum();
void* GetOutputArray();
```
The user can supply character stream, pointer to array with array's size and file path to initialize RunCOStream object. Calling the "Run" function in class to execute stream program, fetching the pointer to output data with "GetOutputArray" function, and fetching the numbers of output data with "GetOutputNum" function. The "COStream.h" file has the declaration of this class, users just need to include it in their source code.
The usage of RunCOStream class is as follows:

```c++
#include "RunCOStream.h"
using namespace COStream;
int main()
{
	double *p = new double[1379];
	RunCOStream costream = new RunCOStream(p,1379);
	costream.Run();
	int retDataCount = costream.GetOutputNum();
	double* retArray = (double*)costream. GetOutputArray();
}
```

##   Shared Variable between C++ and COStream

For the purpose of modifying the variable conveniently in COStream program, which makes the stream program more flexible used for C++ user. The COStream compiler allow COStream program to access global variable which is defined in external C++ program. The variable that is accessed in COStream program should be appended "extern" identifier and won't be initialized. And in C++ program, the referred variable will be defined in global namespace, which changed resulting in the same variable changed in COStream program.
The usage of global variable is as follows:
```c++
//COStream file：
extern int ExternValue;
composite Main(output stream<double x>Out, input stream<double x>In)
{
	stream<double x> Out = FMRadioCore(In)()
	{
		work
		{
			Out[0].x = In[0].x+ExternValue;
		}
	}
}
```
```c++
//C++ file:
#include "RunCOStream.h"
using namespace COStream;
int ExternValue;
int main()
{
	double *p = new double[1379];
	RunCOStream costream = new RunCOStream(p,1379);
	ExternValue = 2;
	costream.Run();
	ExternValue = -1;
	costream.Run();
}
```
As shown in the above code, obviously, it refers the external variable "ExternValue" in COStream file, which is defined in C++ file, and the user can modify "ExternValue" variable in C++ file.



Example：
```c++
composite MyCompositeCall(input stream<int x> In, output stream<int x> Out)
{
	param
		float f;
	int x=1;
	if(x>0){
		stream<int x>G;
		G=MyOperator(In)//2.internal definition of operator
		{
			work
			{
				G[0].x = In[0].x + f;
			}
			window
			{
				In sliding(3,2);
				Out tumbling(1);
			}
		};
	}
}

composite Main(input stream<int x> In, stream<int x> In1, output stream<int x> Out)
{
	param int x, int y;
	int i,f;
	int realparam;
	stream<int x> G,G1,G3;//1.independent declaration of stream
	if(x>0){
		G= MyCompositeCall(In)(f);//2.other calling of composite
	}
	else
		(G,G1)=MyOperatorx(In,In1)//3.internal definition of operator
		{
			work
			{
				G[0].x = x+In[0].x+In1[0];
				x += 1;
			}
			window
			{
				In sliding(3,2);
				G tumbling(1);
			}
		};


    //4.Unless in the "pipeline" structure or "splitjoin" structure, it isn't allowed to occur composite-calling statement in loop statement, which just allow the normal statement occuring.

	f=100000.0;
	for(i=1;i<3;i++)
		f += 3;
		//5.about pipeline
	G1=pipeline(G)
	{
		//5.1 normal C statement
		int a,b;
		x=(4+y)/2;
		a =3;
		b =5;
		for(i=0;i<10;i++)//5.2 the loop statement can be in the "pipeline" structure
			if(x>0)//5.3 conditional statement
				add MyCompositeCall(realparam[i]);// composite-call must be single-input and single-output
			else
				add MyCompositeCall(realparam[i]);
		add MyCompositeCall(realparam);
	};
	//6.splitjion
	G3=splitjoin(G)
	{
		int t=12315;
		split duplicate();
		for(i=0;i<10;i++)//6.1 the loop statement can be in the "pipeline" structure
			if(t>0)//6.2 conditional statement
				add MyCompositeCall(realparam[i]);// 6.3 composite-call must be single-input and single-output
			else
				add MyCompositeCall(realparam[i]);
		add MyCompositeCall(realparam);
		join roundrobin();
	};
}
```