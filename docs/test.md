# Testing document

This project contains unit tests for data structures, algorithms and utility functions. User interface does not have any tests.

## Unit test coverage

It can be seen that all custom data structures have been covered with unit tests quite well. For the "other" category BSP algorithm has been tested thoroughly, but utility functions (which are a fairly large part of the dungeon generation) still needs more tests. Pathfinding has not been tested at all via unit tests, which needs to be corrected - currently all testing for pathfinding has been exploratory.

```
-------------------|---------|----------|---------|---------|-----------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------|---------|----------|---------|---------|-----------------------
All files          |   52.61 |    57.95 |   75.68 |   52.59 |
 data-structures   |     100 |      100 |     100 |     100 |
  BSPNode.ts       |     100 |      100 |     100 |     100 |
  BSPTree.ts       |     100 |      100 |     100 |     100 |
  PriorityQueue.ts |     100 |      100 |     100 |     100 |
 other             |      56 |    65.71 |   78.57 |   55.75 |
  BSP.ts           |     100 |      100 |     100 |     100 |
  utils.ts         |      45 |    55.56 |   72.73 |   43.82 | 18-53,158-208,229-249
 pathfinding       |       0 |        0 |       0 |       0 |
  aStar.ts         |       0 |        0 |       0 |       0 | 6-150
-------------------|---------|----------|---------|---------|-----------------------
```

## Methodology

### Unit tests

Tests are simple unit tests and aim to test either a single function or a complete data structure or algorithm depending on the case. There are currently 51 unit tests and the test files can be found next to their relevant files under `/src`.

### Exploratory testing

A user interface with crude support for stepped visualization was created for exploratory testing, which has been done etensively to see how the program works. Each part of the generation can be seen separately, although the generation is done completely beforehand.
