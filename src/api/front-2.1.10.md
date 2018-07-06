---
title:  AST to Flatgraph	
type: api
order: 29
---


Flatgraph is a SDF (static synchronous data flow) graph corresponding to the COStream data stream source program.It is the research object of the compiler backend discussion scheduling division. The compiler front end generates an abstract syntax tree AST,and this module Convert this AST to SDF graph. 

## Program entrance
```c++
// （10）AST to Flatgraph
// SSG ( object of StaticStreamGraph )
	PhaseName = "AST2FlatSSG";
	if (Errors == 0 && AST2FlatSSG)
		SSG = AST2FlatStaticStreamGraph(gMainComposite);

```
（1）	AST2FlatSSG is the switch variable ,defined in the head of main.cpp.
（2）	Function AST2FlatStaticStreamGraph(…), input is the root node “gMainComposite” of AST，output is the  object  “SSG” of StaticStreamGraph.

## Associated file

（1）	flatNode.h & flatNode.cpp
This file is the node structure description file of the static data flow graph.

|string name|operator name|
|:-|:-|
|int visitTimes|	Indicates whether the node has been visited|
|operatorNode *contents	|Point to operator（After constant propagation）|
|compositeNode *composite	|Point to composite of operator|
|operatorNode *oldContents	|Pointer to original operator|
|compositeNode *oldComposite	|Point to original composite of operator|
|int nOut	|Number of output edges|
|int nIn	|Number of input edges|
|int place_id, thread_id, post_thread_id, serial_id| var of actor in partitioning algorithm|
|vector<FlatNode *> outFlatNodes	|Collection of outFlatNodes of current operater|
|vector<FlatNode *> inFlatNodes	    |Collection of inFlatNodes of current operater|
|Store information of operater<br>Type :vector <string>	|outPushString<br>inPopString<br>inPeekString<br>pushString<br>peekString|
|long work_estimate	|Work estimate of operater|
|int num	|Sequence number of operator in ssg|
|GPUpartition algorithm Variable 	|int GPUPart <br> bool BorderFlag|
|Extended variable Type:int 	|currentIn ,currentOut ,schedMult ,schedDivider ,uin ,label|
|SDF nodes functions：||
|void AddOutEdges(FlatNode *dest)	|Add out edges|
|void AddInEdges(FlatNode *src)	|Add in edges|
|string GetOperatorName()	|Get name of Operator|
|void visitNode()	|Visit and mark this node |
|void ResetVisitTimes()	|Reset visitTimes |
|int GetVisitTimes()	|Get visitTimes|
|void SetIOStreams()	|.|

See flatNode.cpp for more details 



（2）	staticStreamGraph.h & staticStreamGraph.cpp
The header file describes the attributes and behavior of the static data flow graph and include flatNode.h, which is the basic struct of flatNode.

|Variable name |Description|
|:-|:-|
|`FlatNode *topLevel	`|The begin node of SDF, we suppose there is only one node with input 0|
|`vector<FlatNode *> tmpFlatNodes	`|A collection of flatnodes on one place of SDF|
|`vector<FlatNode *> flatNodes	`|All flatnodes on the SDF|
|`map<Node *, FlatNode *> mapEdge2UpFlatNode	`|A collection of UpFlatNode of each flatnodes|
|`map<Node *, FlatNode *> mapEdge2DownFlatNode	`|A collection of DownFlatNode of each flatnodes|
|`map<FlatNode *, int> mapSteadyWork2FaltNode	`|Store steady workload of each flatnodes|
|`map<FlatNode *, int> mapInitWork2FaltNode	`|Store Init workload of each flatnodes|
|Funcitions name:|Description|
|`StaticStreamGraph()`|constructor|
|`SetName()	`|Set name |
|`SetTopLevel()	`|Set the begin node of SDF|
|`AddFlatNode(FlatNode *flatNode)	`|Add flatnode to SDF|
|`PrintFlatNodes()	`|This function only has declarations, no implementation|


（3）	ast2ssg.cpp
This file implements the conversion of syntax tree to flatgraph based on the introduction of static data flow graph related header files.

|Funcitions name:|Description|
|:-|:-|
|`AST2FlatStaticStreamGraph(Node *mainComposite)`	|Conversion function of syntax tree to flatgraph|
|`GraphToOperators(Node *composite, Node *oldComposite)	`|Generatre flatnode from operator|


## Code explanation

```c++
// Return SDF graph as input to backend 
GLOBAL StaticStreamGraph *AST2FlatStaticStreamGraph(Node *mainComposite)
{
	Node *compositeCall = NULL, *operNode = NULL;
	List *operators = NULL;	
	//use assert judge the validity of the front-end parse tree
	assert(mainComposite && mainComposite->typ == Composite && 
mainComposite->u.composite.decl->u.decl.type->u.comdcl.inout == NULL);
	assert(strcmp(mainComposite->u.composite.decl->u.decl.name, "Main") == 0);
	//（1）create a SDF graph,Call the default constructor, the parameter is initialized to null	ssg = new StaticStreamGraph();
	//the second parameter oldComposite
	GraphToOperators(mainComposite, mainComposite);
	//set head of list
	ssg->SetTopLevel();
	//set weight of flatnodes
	ssg->SetFlatNodesWeights();
	/* rest name of  flatNodes in ssg, for printing .dot file*/
	ssg->ResetFlatNodeNames(); 
#if 0
	ssg->PrintFlatNodes();
	PrintNode(stdout, gMainComposite, 0);
	system("pause");
#endif
	return ssg;
}

```