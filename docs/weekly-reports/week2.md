# Week 1

This week I started by adding tooling. I added testing capabilities (Jest), visualization capabilities (React) and enabled coverage generation, although there isn't a nice way of seeing the results other than the CLI command given in readme. After that I started implementing a BSP Tree, which was quite fun. It is a fairly basic tree and it was not particularly difficult. After that I started implementing the actual BSP algorithm, which took some actual effort to get going. Especially coming up with a good ruleset for partitioning the canvas proved a bit difficult. It would be fairly easy to just say "divide in the middle either horizontally or vertically", which would even provide nice, deterministic results, but it produces too dull trees for dungeons. That' why I decided to add randomness, although that also means that currently my tests are not covering 100% of the code as coming up with a way of testing randomness did not fit in this week.

What I made this week: project with tooling and visualization, BSP Tree and an implementation of 2D Binary Space Partitioning, room generation for BSP Tree leaf nodes.

I learned how to implement Binary Space Partitioning for 2D objects and how to draw to a canvas using React.

I had problems with implementing BSP in a way that provides even remotely organic results. Adding randomness made it better, but the testability went down the drain. I also learned JSDoc a bit better (very similar to Javadoc).

Next up is generating doors for the rooms. That will be fun as I have to take the room placement into account when deciding which edges will get doors. I also hope that I get to start on A\* to generate routes.

## Questions

Is using rounding functions ok? I noticed that I should switch away from core library random number generation, but rounding gets a little more difficult I guess. So is it okay to use ceiling and floor?

## Time used

I used approximately 12 hours this week.
