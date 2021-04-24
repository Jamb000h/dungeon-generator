# Week 5

This week I wanted to finalize my current version of dungeon generation and to make it more deterministic to make it easier to test. I ended up doing larger refactoring than I expected (yeah, test earlier...) which was a bother, but now I think the generation algorithm is quite nice.

Regarding the focus points I mentioned last week, I managed to get test coverage to almost 100%, and added performance tests. See [test document](../test.md). Currently it takes around 1.5 seconds to generate a 1920 x 1080 dungeon with 300-400 rooms and routes between all rooms. I think I'm okay with that performance, but I still have to write the implementation document with complexity analysis. There may be some easy optimizations that I haven't spotted yet.

I also started an [implementation document](../implementation.md).

My plan for the next week is to make the aStar tests a bit more robust as it is now only tested via other tests that test the whole package. I'm also taking another pass at the performance tests and I'd also like to know if you have any recommendations on what to still focus on.

## Questions

Is the current level of complexity and the current feature set enough to pass the course assuming all the mandatory work related to the course is done and if the documentation and testing is up to par when the course finishes, or is it necessary for me to bring some new things in at this point?

## Time used

I used approximately 10 hours this week.
