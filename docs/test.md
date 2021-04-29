# Testing document

This project contains unit tests for data structures, algorithms and utility functions. User interface does not have any tests.

## Unit test coverage

All current code has 100% test coverage.

```
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------|---------|----------|---------|---------|-------------------
All files          |     100 |      100 |     100 |     100 |
 data-structures   |     100 |      100 |     100 |     100 |
  BSPNode.ts       |     100 |      100 |     100 |     100 |
  BSPTree.ts       |     100 |      100 |     100 |     100 |
  PriorityQueue.ts |     100 |      100 |     100 |     100 |
 other             |     100 |      100 |     100 |     100 |
  BSP.ts           |     100 |      100 |     100 |     100 |
  utils.ts         |     100 |      100 |     100 |     100 |
 pathfinding       |     100 |      100 |     100 |     100 |
  aStar.ts         |     100 |      100 |     100 |     100 |
-------------------|---------|----------|---------|---------|-------------------
```

## Performance testing

### Complete dungeon generation

There are performance tests testing the following scenarios:

- A 1000 x 1000 dungeon generated 5 times with a pathfinding grid size of 20
- A 1920 x 1080 (typical full screen) dungeon generated 5 times with a pathfinding grid size of 20
- A 1000 x h dungeon generated n times with a pathfinding grid size of 20 until generation time exceeds 5 seconds - h increases in increments of 100 and starts at 1000
- A w x 1000 dungeon generated n times with a pathfinding grid size of 20 until generation time exceeds 5 seconds - w increases in increments of 100 and starts at 1000
- A w x h dungeon generated n times with a pathfinding grid size of 20 until generation time exceeds 5 seconds - both w and h increase in increments of 100 and start at 1000

#### Performance testing results for complete dungeon generation (Averages after 3 runs)

- 1000 x 1000: 716ms
- 1920 x 1080: 1644ms
- 1000 x h maximum area in 5000ms: 5880000
- w x 1000 maximum area in 5000ms: 5820000
- w x h maximum area in 5000ms: 4663600

### BSP

Splitting the dungeon was tested with the following map sizes:

- 1000 x 1000
- 5000 x 5000
- 10000 x 10000
- 50000 x 50000

#### BSP Results

- 1000 x 1000: <1ms
- 5000 x 5000: 5ms
- 10000 x 10000: 12ms
- 50000 x 50000: 857ms

It can be seen that BSP performs quite nicely.

## Methodology

### Unit tests

Tests are simple unit tests and aim to test either a single function or a complete data structure or algorithm depending on the case. There are currently 51 unit tests and the test files can be found next to their relevant files under `/src`.

### Exploratory testing

A user interface with crude support for stepped visualization was created for exploratory testing, which has been done etensively to see how the program works. Each part of the generation can be seen separately, although the generation is done completely beforehand.
