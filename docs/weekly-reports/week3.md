# Week 3

This week I started implementing pathfinding by learning about A\* and how to implement Priority Queue for it. I added a couple of sources to specification to accomodate the new need of Priority Queue. Adding pathfinding proved a bit difficult and in the process I decided to get rid of most of the randomness for the time being to just focus on getting the pathfinding working on a crude level. My current accomplishment is that there are still separate rooms generated, and the rooms have doors in and doors out, which connect to provide an access to all rooms. The problems for now are as follows:

- rooms are too uniform
  - I want to fix this by restoring some of the randomness to room size
- doors are always generated on the vertical center of left and right wall of room
  - I plan to allow doors to generate on any wall, but not on the same wall
  - I plan to stop generating walls too close to map borders as they look funny
- A\* is "too good" - it starts hugging room walls quite quickly
  - My first hunch is to add some kind of modifier to nodes near rooms that discourages A\* from picking those nodes, which ultimately may lead to a bit longer routes, but reduces wall hugging. I'm yet to think of how to accomplish this while also ensuring the heuristic plays its part.
- The total solution currently scales quite poorly. A 1000 x 1000 area gets pretty slow for pathfinding.
  - Currently the only optimization is that I mark room pixels as false to prevent processing them during pathfinding. I should ditch them completely from the graph. I also want to look into directing the algorithm only towards the solution by limiting the search boundaries to be between route start and finish coordinates rather than the whole map.

My main learning was about implementing a Priority Queue, as A\* itself was not too bad since it seems to just be a modified Dijkstra's algorithm that was already used on some more basic course in the curriculum. Priority Queue was not too bad either (although I did not implement all possible operations, but just the ones I need) and I got the test coverage for the data structure to above 90% already.

Regarding code quality I'm not too happy at the moment. I had to spend a lot of time just hacking around and that usually means neglecting test coverage and/or making code that is difficult to understand. I managed to keep code fairly commented and update my JSDocs, but the test coverage is pretty crappy overall. See below:

```
-------------------|---------|----------|---------|---------|--------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------|---------|----------|---------|---------|--------------------
All files          |   41.77 |    40.38 |    61.9 |   43.62 |
 BSP               |      50 |    83.33 |    62.5 |    53.7 |
  BSP.ts           |      50 |    83.33 |    62.5 |    53.7 | 98,148-203,212-218
 pathfinding       |   36.73 |     27.5 |   61.54 |   37.89 |
  PriorityQueue.ts |    97.3 |    91.67 |     100 |    97.3 | 92
  aStar.ts         |       0 |        0 |       0 |       0 | 8-134
-------------------|---------|----------|---------|---------|--------------------
```

My plan for the next week is to focus on getting the test coverage closer to 100% and to fix some of the problems mentioned before.

## Time used

I used approximately 10 hours this week.
