# Testing document

This project contains unit tests for data structures, algorithms and utility functions. User interface does not have any tests.

## Summary

Generating a very usable map of a sufficient size (1000 x 1000, gridSize 50 which results in around 15-20 rooms) with the plaing BSP + Astar takes on average around 250ms, which is good enough for most purposes, and definitely so for video games. Adding cellular generation to the mix takes the processing time ultimately to several seconds, which reduces the number of applications for the generation, which is sad as the results are a bit more organic, although maybe not better. The organic feeling could be generated in some other manner, but that can be a topic for a different project.

## Methodology

### Unit tests

Tests are simple unit tests and aim to test either a single function or a complete data structure or algorithm depending on the case. For pathfinding the actual algorithm is verified simply by running DFS from the first point of first room to last point of last room as the algorithm only creates routes between two rooms, which means the last point of last room can only be reached if the whole chain of routes is generated sufficiently. This is done for approximately 450 different dungeon parameter combinations and should sufficiently prove the correctness of the dungeon generation algorithm.

### Exploratory testing

A user interface with crude support for stepped visualization was created for exploratory testing, which has been done etensively to see how the program works. Each part of the generation can be seen separately, although the generation is done completely beforehand.

### Performance testing

Performance testing is done both automatically and manually. Especially BSP-Astar has a good coverage of automated performance tests. The combined effort of BSP-Astar + Cellular generation was tested manually and the report can be found in this document.

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
  Cellular.ts      |     100 |      100 |     100 |     100 |
  utils.ts         |     100 |      100 |     100 |     100 |
 pathfinding       |     100 |      100 |     100 |     100 |
  aStar.ts         |     100 |      100 |     100 |     100 |
-------------------|---------|----------|---------|---------|-------------------
```

## Automated Performance testing

### Complete dungeon generation with BSP + A-star

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

## Manual performance testing

I decided to test the combined effort of BSP-Astar + Cellular generation manually.
The main scenario I wanted to test was having a 1000 x 1000 dungeon with a gridSize of 50 and initial room ratio of 0.5 for the cellular part. It has on average around 15-20 rooms and the BSP-Astar part takes around 250ms to generate individually (rounded average of 10 tries). The time it takes to initialize the combined effort is around 420ms (rounded average of 10 tries), so the cellular part is really slow compared to its usefulness. Every further iteration takes a whopping 710ms (rounded average of 3 tries for 5 different dungeons) and cleanup takes over two seconds. The combination provides more interesting dungeons than just plain BSP + Astar, but the cost is certainly too high. It wouldn't be good enough for near-real-time applications, but could be used to generate dungeon templates for further modification when creating maps for e.g. a video game, so it is not totally useless.
