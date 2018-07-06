---
title: Print symbol table
type: api
order: 23
---

The print symbol table is an enumeration of symbols including identifiers, keywords, etc. in the grammar of the compiler, and an array of stored symbols is written to the file and printed. The function module will execute when the print symbol table switch is set to true.

## Program entrance

```c++
//（3）print symbol table
	if (PrintSymTables) {
		PrintSymbolTable(stdout, Externals);
	}
```
    PrintSymTables  switch，defined in the head of main.cpp
    
## Code explain

The module code is implemented in symbol.c, which is introduced in the 2.1.1 initialization environment.

```c++
/***********************************************************************\
* PrintSymbolTable
\***********************************************************************/
GLOBAL void PrintSymbolTable(FILE *out, SymbolTable *table)
{
    Symbol *chain, *shadow;
    int i, entries=0, length, worst = 0, depth=0;
    assert(table != NULL);
    fprintf(out, "\nSymbolTable: %s\n", table->table_name);
    for (i=0; i<TABLE_SIZE; i++) {
		length = 0;
		for (chain = table->table[i]; chain != NULL; chain = chain->next) {
			length++;
			fprintf(out, "\t%s:", chain->name);
			for (shadow = chain; shadow != NULL; shadow = shadow->shadow) {
				fprintf(out, " (%d,%d)",
					(int) shadow->scope.level,
					(int) shadow->scope.version);
			}
			fputc('\n', out);
		}
		entries += length;
		depth += (length + 1)*length/2;  /* sum of 1 to length */
		if (length > worst) worst = length;
    }
    fprintf(out, "End of symbol table %s\n", table->table_name);
    fprintf(out, "\t%d entries\n", entries);
    fprintf(out, "\tAverage depth for a successful search: %.2g\n",
	    depth/(entries+1e-6));
    fprintf(out, "\tAverage depth for a failed search: %.2g\n",
	    entries/(float)TABLE_SIZE);
    fprintf(out, "\tLongest chain: %d\n", worst);
}
//
```
The red mark is the core code of the symbol table information written to the file.It’s easy to understand