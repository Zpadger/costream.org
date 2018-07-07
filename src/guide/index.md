---
title: Introduction
type: guide
order: 1
---


The COStream programming language is a high-performance streaming programming language for parallel architecture. It is designed by [HUST DML Lab](http://media.hust.edu.cn). The name of the language is a combination of three keywords: `Composite`, `Operator`, and `Stream`. The COStream uses the data flow graph to describe the processing of the application. The nodes in the graph represent calculations while the edges represent the flow of data. The COStream language has a wide range of applications and is currently used for large data processing applications such as *media processing*, *signal processing*, *search applications*, and *data file processing*.

## Features
Streaming programs, programs that process data sequences in an orderly manner, most often appear in the context of *sound*, *video*, and *digital signal processing*. Streaming programs are well suited for multicore system architectures. Interest in convection applications has spawned a range of programming languages that work in watersheds such as **COStream**, **Cg**, **StreamIt**, and more.

**COStream** adopts the computational mode of synchronous data flow graph, that is, 
- The program implements some independent nodes (for independent computing units, called actor in COStream). 
- Point data transfer through the input and output channels (ie, the output side and output side of the actor).
- These nodes together form a flow diagram representing the overall operation
## Purpose
COStream语言的主要目的是:
* 在多核架构下揭露并利用流程序固有的并行性
* 自动实现特定域中流应用专家进行的优化
* 提高程序员在流域中的工作效率

## 并行处理
COStream如何实现程序的并行:
1. 任务划分  
给数据流图中的各结点分配处理器核（核的总个数由后台程序员确定），一个结点对应一个核，一个核可对应多结点，使各核的计算量大致相同，总通信开销尽量小。
1. 阶段赋值  
给数据流图中各结点分配阶段号（总的阶段号由编译器决定），使每一阶段的总工作量大致相同，前一阶段的结点所需数据不依赖后一阶段中结点的输出。
1. 软件流水  
采用软件流水技术，实现并行。其中，软件流水中第n阶段执行阶段号为n的结点。


## 程序举例
下面这段代码给出了一个用COStream编写的一个程序实例。
```c++
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
程序的功能为求移动平均值，该程序由三个operator组成即Source，Averager和Sink。其功能如下：Source作为数据源产生由“0”开始的自然数序列输出给Averager；Averager将得到的前N个自然数求平均值并消耗掉最早得到的一个数据，把计算得到的平均值输出给Sink；Sink将得到的平均值打印到屏幕。下面给出了该程序对应的SDF图：
![](/img/averager.png)

## Programs Suitable for COStream
#### [](#header-2) Big data stream  
The most fundamental feature for a COStream application is that it operates on a large data sequence (even infinity).
#### [](#header-2)	Independent data stream node  
从概念上说，一个流的计算体现在该程序中数据流的转换。我们定义数据流的基本计算单元为actor：在每次执行阶段中，从输入流中读一个或多个数据项，对其进行计算，然后将一个或多个计算结果写入到输出流中。Actor通常都是独立和自足的，即没有包含对全局变量和其他actor的引用。一个流程序就是由一系列的actor组成的数据流图，其中一些actor的输出将是另外一些actor的输入。
#### [](#header-4)	一个稳定的计算模式  
在程序稳态执行的过程中，数据流图的结构通常是不变的。即，一系列确定的actor将按照一个有序的顺序反复执行，给定一个输入数据流，将产生一个输出数据流。
#### [](#header-4)	滑动窗口的计算  
数据流中的每一个值通常都会被同一个actor在连续的执行中所检测，也被称为滑动窗口。滑动窗口的例子包括生物序列分析、自然语言的处理、图像的处理（锐化、模糊化等）、网络数据包的检测等。
#### [](#header-4)	偶尔的流外通信  
除了大容量的数据流将从一个actor流向另一个actor，actor也将通信一些少量的控制信息在一些罕见的不规则的基础上。例如：改变手机的音量，在屏幕中打印错误信息，或者改变自适应FIR actor中的系数。 这些信息通常和数据流中的数据相同步，例如调频电台在数据流中的某个特定点的传输时改变其频率。
#### [](#header-4)	高性能的期望  
通常一些数据流程序需要满足实时性的限制，因此效率（延迟和吞吐量反面）是主要的考虑因素。另外有一些嵌入式的流程序将用于手机环境中，因此电量消耗，存储限制，代码大小限制等也很重要。

## Programs Not Suitable for COStream

#### **Dynamic modification of the stream structure **
COStream uses *a static data flow graph* and *cannot dynamically* change the flow graph at runtime. Some streaming programs occasionally need to dynamically modify the flow graph even after the actors at various levels have been executed for a long time. 
>For example, if the interface of a wireless network experiences high noise in its input channel, this will require it to generate some actors to eliminate these signals.
#### **The input and output rate of the actor changes dynamically**  
The input and output rates of each COStream actor are constant at runtime. Some applications need to analyze the input data stream and discard data that does not meet the requirements, that is, dynamically change the output rate of the actor. 
>For example, *the image surf feature extraction* uses the image pixel as the input data stream, first determines whether the data item in the input stream is a feature point, and if it is a feature point, performs the next processing.

## Available Examples

###  Basic algorithm( 30个):
| |
|:------------------ |
| MPEG2 encoder / decoder |
| JPEG decoder / transcoder |
| Channel Vocoder |
| GSM Decoder |
| Ground Moving Target Indicator |
| Medium Pulse Compression Radar |
| Radar Front Array End |
| Synthetic Aperture Radar |
| Target Detector |
| Feature Aided Tracking |
| RayTracer |
| DES encryption|
| Serpent encryption|
| Mosaic|
| Vocoder|
| MP3 subset|
| 3GPP physical layer|
| Freq-hopping radio|
| Orthogonal Frequency Division Multiplexer|
| HDTV|
| H264 subset|
| Filterbank|
| 802.11a transmitte|
| FM Radio|
| DToA Converte|

### Libraries / kernels (23):
| |
|:------------------ |
| Autocorrelation |
| Matrix Multiplication |
| Cholesky |
| CRC |
| Oversampler |
| Rate Convert |
| DCT (1D / 2D, float / int) |
| FFT (4 granularities) |
| Time Delay Equalization |
| Trellis |
|Lattice |
| VectAdd |

###	Graphics pipelines (4):
| |
|:------------------ |
|Reference pipeline |
| Phong shading |
| Shadow volumes |
| Particle system |

### Sorting routines (8):
| |
|:------------------ |
| Bitonic sort (3 versions) |
| Insertion sort |
| Bubble Sort |
| Comparison counting |
| Merge sort |
| Radix sort |
