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
#### The main purpose of the COStream is:
- Uncovering and exploiting the inherent parallelism of streaming programs under a multi-core architecture
- Automatically optimizing for streaming application experts in specific domains
- Improving programmer productivity in stream programing.
## How COStream implements parallelism of programs
1. Task division
Allocating processors core to each node in the data flow graph (the total number of cores is determined by the programmer).One node corresponds to one core while one core can link to multiple nodes, which makes the calculation amount of each core substantially the same. The total communication overhead is as small as possible.
1. Stage assignment
Assign the phase number to each node in the data flow graph (the phase number is determined by the compiler), so that the total workload of each phase is roughly the same. The data required by the node in the previous phase does not depend on the output from nodes in the latter phase.
1. Software flow
Parallel is using software pipelining technology.

## Example
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
The function of the above program is to calculate the average value of input nums. The program consists of three operators, `Source`, `Averager` and `Sink`. Its calculation process is as follows: 
1. `Source` generates a sequence of natural numbers starting from `0` and outputs it to `Averager`;
1. `Averager` averages the first N natural numbers obtained and consumes the first data obtained, then outputs the calculated average value to `Sink`. 
1. `Sink` will print the average value to the screen. 

The SDF graph corresponding to the program is given below:
![](/img/averager.png)

## Programs Suitable for COStream
#### [](#header-2) Big data stream  
The most fundamental feature for a COStream application is that it operates on a large data sequence (even infinity).
#### [](#header-2)	Independent data stream node  
We define the basic unit of computation for the data stream as an `Actor`. Actors are usually independent and self-contained, ie they do not contain references to global variables and other actors.
#### [](#header-4)	Stable calculation mode  
The structure of the data flow graph is usually constant during the steady state execution of the program. That is, a series of determined actors will be executed repeatedly in an orderly sequence, given an input data stream that will produce an output data stream.
#### [](#header-4)	Calculated by sliding window  
Each value in the data stream is usually detected by the same actor in a continuous execution, also known as a sliding window. Examples of sliding windows include *biological sequence analysis, natural language processing, image processing (sharpening, blurring, etc.), detection of network packets, and so on*.
#### [](#header-4)	Occasional out-of-stream communication  
In addition to large amounts of data flowing from one `actor` to another, there can also be a small amount of control information that can be passed before the actor.
#### [](#header-4)	High performance requirements  
Usually some data flow programs need to meet real-time constraints, so efficiency (delay and throughput) is the main consideration. In addition, some embedded streaming programs will be used in mobile environments, so *power consumption, storage limitations, code size limitations, etc.* are also important.。

## Programs Not Suitable for COStream

#### **Dynamic modification of the stream structure **
COStream uses **a static data flow graph** and **cannot dynamically** change the flow graph at runtime. Some streaming programs occasionally need to dynamically modify the flow graph even after the actors at various levels have been executed for a long time. 
>For example, if the interface of a wireless network experiences high noise in its input channel, this will require it to generate some actors to eliminate these signals.
#### **The input and output rate of the actor changes dynamically**  
The input and output rates of each COStream actor are constant at runtime. Some applications need to analyze the input data stream and discard data that does not meet the requirements, that is, dynamically change the output rate of the actor. 
>For example, *the image surf feature extraction* uses the image pixel as the input data stream, first determines whether the data item in the input stream is a feature point, and if it is a feature point, performs the next processing.

## Available Examples

###  Basic algorithm(25):
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

### Libraries / kernels (12):
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
| Lattice |
| VectAdd |

### Graphics pipelines (4):
| |
|:------------------ |
|Reference pipeline |
| Phong shading |
| Shadow volumes |
| Particle system |

### Sorting routines (6):
| |
|:------------------ |
| Bitonic sort (3 versions) |
| Insertion sort |
| Bubble Sort |
| Comparison counting |
| Merge sort |
| Radix sort |
