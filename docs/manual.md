# Manual

## Commands

These commands assume that `npm` and `node` are installed on the machine.

- Install with `npm ci` or `npm i`.
- Run UI with `npm start`
- Run tests with `npm t` (takes around 30 seconds)
- Run performance tests with `npm run perf` (takes around 5 minutes)
- Generate test coverage with `npm run coverage` (takes around 30 seconds).

## Usage

After running the UI (see Commands) you can choose from three options at the top:

- BSP-Astar
- Cellular
- BSP-Astar + Cellular

### BSP-Astar

You can change the following parameters:

- Map width (integer)
- Map height (integer)
- Pathfinding grid size (integer)

Additionally you can toggle each map component's visibility.

You can generate maps by clicking generate.

### Cellular

You can change the following parameters:

- Map width (integer)
- Map height (integer)
- Number of cellular generation iterations to run after generating a new map (integer)
- Ratio of rooms to walls on initial generation (float, 0-1)
- Number of adjacent walls needed to turn a point into a wall (integer)
- Number of adjacent rooms needed to turn a point into a room (integer)

Additionally you can toggle each map component's visibility.

You can initialize maps by clicking initialize and iterate a map further by clicking iterate.

### BSP-Astar + Cellular

You can change the following parameters:

- Map width (integer)
- Map height (integer)
- Pathfinding grid size (integer)
- Ratio of rooms to walls on initial generation (float, 0-1)

You can initialize maps by clicking initialize and iterate them further by clicking iterate.
Finally you can clean unreachable rooms from the map by clicking cleanup.
