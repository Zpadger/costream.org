---
title: Grammer Introduction
type: guide
order: 30

---


The COStream programming language is a high-performance streaming programming language for parallel architecture. It is designed by [HUST DML Lab](http://media.hust.edu.cn). The name of the language is a combination of three keywords: `Composite`, `Operator`, and `Stream`. The COStream uses the data flow graph to describe the processing of the application. The nodes in the graph represent calculations while the edges represent the flow of data. The COStream language has a wide range of applications and is currently used for large data processing applications such as *media processing*, *signal processing*, *search applications*, and *data file processing*.

### Document description
This document is the **Manual** of COStream. It mainly explains the **definition** of COStream, **programming specification** and **compiler behavior**, and provides technical support for programmers to use COStream.

## Program example

```c
composite Main(){
  int N = 10;
  stream<int x>S,P;
  S = Source(){
    int x;
     init {x = 0;}
     work {
       S[0].x = x;
       x++;
     }
     window{
       S tumbling(1);
     }
  };
  P = MyOp(S)(N);   
  Sink(P){
    work{
      int r;
      r = P[0].x;
      println(r);
    }
    window{
      P tumbling(1);
    }
  };
}
composite MyOp(output Out,input In){
  param
    int pn;
  Out = Averager(In){
    work{
      int sum = 0;
      int i;
      for(i=0;i<pn;i++)
        sum += In[i].x;
      Out[0].x = sum/pn;
    }
    window{
      In sliding(pn,1);
      Out tumbling(1);
    }
  };
}
```
The figure below shows the corresponding data flow diagram of the COStream stream program instance.The function of the program is to calculate the average value dynamically.**Each COStream program starts with a composite called Main, which serves as the entry for the program**.Three operators are defined between curly braces, namely `Source`, `Averager` and `Sink`.`Source` generates a sequence of natural numbers starting from "0" and outputs it to `Averager`; `Averager` averages the first N natural numbers obtained and consumes the first data obtained, and outputs the calculated average value to `Sink`; `Sink` prints the resulting average value to the screen.
![](https://i.loli.net/2018/07/09/5b431f29d0842.png)

Operators are connected to each other through flow variables `S` and `P`, and each operator internally contains a process for processing the data stream.Operator defines the corresponding window for each data stream variable, and accesses each data stream by *window mechanism*. The window stores the data required by the operator for each operation.The operator reads in the data from the input stream's window and fills the result into the output stream window.In the above figure, the operator Averager defines two windows on the input stream `S` and the output stream `P`: `sliding window` and `tumbling window`. The size of the sliding window is N data (token) length, and each time the calculation is completed, sliding one data length;The length of the tumbling window is 1 data length, and the data of the window is all output to the data stream after each calculation. **The data in the window is accessed in a manner similar to array subscripts**.

Each operator is executed in a **data-driven** manner, that is, the input data fills the window to trigger the execution of the operator. **As long as there is infinite data, the program will execute infinitely**. Each operator contains a list of variable declarations visible in the operator, an init function library, and a work function block. The variable declaration list defines the variables used in `init` and `work` (as follows). **The init part of the statement only Executed during the first run of the operator, and then continuously execute the code of the work part**.

## Language execution model

The programming language is the embodiment of the underlying program execution model. COStream uses Synchronous Data Flow (SDF) as the execution model of the language.

In the synchronous data flow model, the program is represented by a weighted directed graph called an isochronous data flow graph.In the model,Each node represents a computing task, called an `actor`, where each edge represents the flow of data between the producer actor and the consumer actor, with two weights on each side, representing the number of production data by the producer and the number of data consumed by the consumer after each execution .Each actor is a separate computational unit with separate instruction streams and address spaces. Data flow between actors is achieved through FIFO queues.**The actor's execution is data-driven, and as long as the input side of the actor has enough data to consume, it will repeatedly execute and generate data to the output side**.In the static synchronous data flow model, each execution of an actor consumes a fixed amount of data, called a **consumption rate**. Similarly, each time an actor executes a fixed number of data, it is called a **production rate**.

The following figure shows that the data flow program has two actors. Actor A and actor B are independent calculation units. **Each time actor A executes three data into the queue cache, that is, the production rate is 3, and actor B executes the slave queue each time. The cache consumes 2 data at a rate of 2**. Both actors are executed in a data-driven manner, and as soon as the data is sufficient, execution begins automatically.
![一个SDF图例子](/img/PART1-1.3.png)

>The data flow graph described by the COStream language is based on the synchronous data flow graph SDF, and the correspondence between the two is as follows:
1. The operator in COStream corresponds to the actor in SDF;
1. The stream variable in COStream corresponds to the FIFO data edge in the SDF;
1. The window size on the data stream in the COStream corresponds to the rate at which the actor produces and consumes data in the SDF;
1. COStream doesn't support graphs like the feedback loop in StreamIt and SDF graphs with delay data edges;
In addition, COStream adds support for the sliding window.

## Grammar symbol

We use BNF (Backus Naur Form) to describe the grammatical features of the language. The following are commonly used grammar symbols.

| Grammar symbol | Description |
| :----- | :----- |
| italics |（Non-terminal）|
| italics			|		（Non-terminal）|
| ALL_CAPS_ITALICS	| Identifier（Terminator），Such as ID identifier |
| ‘text’				|	constant|
| (…)				|	Grouping, used to separate grammatical units |
| …&#124;…				|	And operate to match the left or right grammar unit |
| …?					|	Optional operation |
| …*					| The grammar unit is repeated 0 or more times. |
| …+					| The grammar unit is repeated 1 or more times |
| …*,			|		Comma-separated 0 or multiple grammar units |
| …+,			|		Comma-separated 1 or multiple grammar units |
| …*;			|		0 or more grammatical units separated by semicolons |
| …+;			|		1 or more grammatical units separated by semicolons |
| non-Ternimal ::=…	|	Rule definition |
