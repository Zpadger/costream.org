---
title: Installation
type: guide
order: 2
costream_version: v1.00
---

### System Note

COStream Support for running on Ubuntu or CentOS. But it only support gcc-4.4.X.

### Release Notes

Latest stable version:`{{costream_version}}`

Detailed release notes for each version are available on [GitHub](https://github.com/DML308/COStream/releases)。


## Dependencies
- gcc 
- g++ 
- gdb 
- flex 
- bison 
- cmake

<p class="tip">The version number -- 4.4.x of `gcc` and `g++` is required. You can modify the default gcc version by referring to the following instructions.</p>
#### CentOS
```bash
#CentOS
$ yum install flex bison cmake gdb  
$ yum search gcc-4
$ yum install compat-gcc-44
$ yum install compat-gcc-44-c++
#Then set the gcc-4.4 as the default compiler
$ sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.4 100
$ sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.4 100
#If the above step indicates that /usr/bin/gcc already exists and is not a symlink, you can use mv /usr/bin/gcc /usr/gcc to remove the original gcc from the PATH path and then execute update-alternatives.But it is dangerours.
$ gcc -v    #Check if the gcc version is successfully set to 4.4.7
$ g++ -v    #Check if the g++ version is successfully set to 4.4.7
```
#### Ubuntu
```bash
#Ubuntu
$ sudo apt-get install flex bison cmake gdb
$ apt list gcc-4.4      #Search for the gcc version in the library
# Listing... Done
# gcc-4.4/trusty,now 4.4.7-8ubuntu1
$ sudo apt-get install gcc-4.4
$ apt list g++-4.4      #Search for the g++ version in the library
# Listing... Done
# g++-4.4/trusty 4.4.7-8ubuntu1
$ sudo apt-get install g++-4.4
$ sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.4 100
$ sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.4 100
$ gcc -v    #Check if the gcc version is successfully set to 4.4.7
$ g++ -v    #Check if the g++ version is successfully set to 4.4.7
```
## Get the source code of COStream

```bash
$ cd ~
$ git clone https://github.com/DML308/COStream.git
```

## Set `PATH`
```bash
$ sudo vim /etc/profile

#set COStream environment
export PATH=~/COStream:$PATH
export COSTREAM_LIB=~/COStream/runtime/X86Lib2/
export LD_LIBRARY_PATH=/usr/local/lib:$LD_LIBRARY_PATH

#refresh cache
$ source /etc/profile
```
## Compile `libmetis.a`
```bash
$ cd src/3rdpart/parmetis-4.0/metis/
$ make config
$ make
$ cp build/Linux-x86_64/libmetis/libmetis.a ../../include/libmetis.a
$ cp build/Linux-x86_64/libmetis/libmetis.a ../../lib/libmetis.a
```
## Compiling
```bash
$ cd ~/COStream/src
$ make clean
$ make
$ sudo cp COStreamC /usr/local/sbin/COStreamC
```
## Check the version number
```bash
$ COStreamC -v
COStreamC
Version 1.00 (your compile date)
```
