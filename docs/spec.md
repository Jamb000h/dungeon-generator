# Specifications

## Meta

Programme: Bachelor of Computer Science

Project language: English

Programming language: TypeScript

## General Description

The project tries to produce an efficient dungeon generation algorithm that generates dungeons that:

- contain multiple rooms
- may contain rooms that are very different in size
- contain routes between rooms
- ensures that all rooms are accessible without too long detours

## Generation steps overview

1. Split given area via BSP (show leaf bopundaries in UI)
2. Create a graph (from map) that contains every pixel of the map
3. Generate rooms on the map (show rooms in UI)
4. Generate a grid for pathfinding (show grid in UI)
5. Generate doors at intersections of rooms and grid (two doors per room - one in and one out) (show doors in UI)
6. Generate routes between rooms by running A\* between doors (show routes in UI)

## Chosen algorithms and data structures

### Binary Space Partitioning ([1], [2], [4])

Used for room generation as it ensures there is no overlap and it is fairly efficient. As per [4] it should have a time and space complexity of `O(n log n)`

BSP was chosen for room generation as it provides an efficient way of splitting a map into separate areas that rooms can then be generated into.

BSP is implemented on top of a custom BSP Tree.

### A\* [3]

Used for route generation between doors.

A\* should be good enough for finding paths between doors and it is going to use the manhattan distance to the goal door as its heuristic. The problem here is that this may generate dungeons that may have several roads next to each other, which is something that has to be mitigated somehow.

As manhattan distance as a heuristic has time complexity of `O(1)`, and each cell in the map is evaluated at most 4 times as we only allow horizontal or vertical movement, the time complexity should be `4 * map size` (n \* m), which equals `O(4nm)` and space complexity should be at most `O(nm)`.

A\* is implemented on top of a custom PriorityQueue.

## Inputs

The program will get a map size as its primary input. Secondary inputs are maximum and minimum room height and width and if it is possible to connect rooms to each other without routes.

Map size is given as two integers x and y, which represent the map width and height. Room min/max sizes are given as integers and determine the minimum and maximum value when splitting the map with BSP.

## Sources

[1] Generic description of dungeon generation using BSP. Stack Overflow. URL: https://gamedev.stackexchange.com/a/82066

[2] Binary Space Partitioning. Wikipedia. URL: https://en.wikipedia.org/wiki/Binary_space_partitioning

[3] A* Search Algorithm. Wikipedia. URL: https://en.wikipedia.org/wiki/A*\_search_algorithm

[4] EXACT SIZE OF BINARY SPACE PARTITIONINGS ANDIMPROVED RECTANGLE TILING ALGORITHMS. BERMAN, DASGUPTA, MUTHUKRISHNAN. URL: https://www.cs.uic.edu/~dasgupta/resume/publ/papers/bsp.pdf

[5] Heaps and Priority Queues. Hackerearth. https://www.hackerearth.com/practice/notes/heaps-and-priority-queues/

[6] Binary Heaps and Priority Queues via JavaScript. DigitalOcean. https://www.digitalocean.com/community/tutorials/js-binary-heaps
