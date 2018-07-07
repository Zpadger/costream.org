---
title: Try to run
type: guide
order: 3
costream_version: v1.00
---

### First COStream Program
Use FFT as example :
```bash
$ cd ~/COStream
$ mkdir run_tests
$ cp tests/SPLtest/Benchmarks/06-FFT5/FFT6.cos run_tests/FFT6.cos
$ cd run_tests
$ COStreamC -x86 -nCpuCore 2 FFT6.cos -o ./fft/     
#compile successful
$ cd fft
$ make              
$ ./a.out           
```
### COStream Usages

Compile for multi-cores:
```bash
$ COStreamC -x86 -nCpucore 4 example.cos -o ./output/
```
Measuring execution time：
```bash
$ time ./a.out  -i 10000
```

Generate a  data flow graph:
```bash
$ dot flatgraph.dot  -Tpng -o output.png
```
