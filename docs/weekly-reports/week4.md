# Week 4

This week I tried to both improve test coverage and fix some of the problems I noticed before.
Test coverage went up quite well, and now all my custom data structures have 100% coverage and BSP algorithm has 100% coverage. I still need to work on utility function coverage and I haven't tested pathfinding with unit tests at all. I'd also like to start on performance testing. I've done extensive exploratory testing for pathfinding and performance, but that is naturally not enough.

Regarding the problems I stated last week:

- rooms are too uniform
  - I managed to return randomness to BSP which allows more random-sized rooms!
- doors are always generated on the vertical center of left and right wall of room
  - Walls can be generated on any wall as long as the wall is not too close to map border
- A\* is "too good" - it starts hugging room walls quite quickly
  - I implemented a grid for pathfinding, which helped with this quite a lot. It is still not perfect and for good results the scenario needs to be quite optimal (so map size, minimum room area and grid size have to match nicely)
- The total solution currently scales quite poorly. A 1000 x 1000 area gets pretty slow for pathfinding.
  - I managed to bring pathfinding time quite a lot, and right now a 1000 x 500 map with around 50 rooms is fully generated in under a second (running with relatively old i5 processor in a web browser)

Regarding code quality I'm still not too happy at the moment. I started a testing document that can be found [here](../test.md).

My plan for the next week is to focus on getting test coverage to 100%, splitting some of the larger functions and hopefully starting on performance testing as well. I don't think I should spend much more time refining the core of my dungeon generation anymore, and it would probably be a good idea to implement a simpler dungeon generation algorithm to compare with.

## Time used

I used approximately 12 hours this week.
