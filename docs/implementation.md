# Implementation document

The project is implemented with TypeScript and the UI is built on React. The project base is called create-react-app and it provided a simple base to build the UI on top of.

The project is about dungeon generation, with main focus on the following:

- non-overlapping rooms
- routes between rooms
- sufficient performance for average full screen resolution (1920x1080)

## Brief summary

The implementation was quite close to what was written in the specification document, although the specification document did not specify a secondary algorithm, which ended up being cellular dungeon generation. I think based on both automated and manual performance testing I reached my goals for the primary BSP + Astar implementation, but the cellular generation is not as useful as I hoped. For time complexity, I think I reached sufficient levels based on empirical testing.

## High-level process for main work which is BSP + A-star

The dungeon generation is built as follows (on a high level, complexity analysis below)

1. Generating a BSP tree for given width and height
2. Map template generation
3. Room generation
4. Pathfinding grid generation
5. Door generation
6. Route generation
7. Drawing the dungeon

## Complexity analysis for BSP + A-star

Complexity analysis is provided as per the steps in the above high-level process.

Legend:

```
- h: height of map
- w: width of map
- m: area of map (h \* w)
- g: grid size
- n_h: minimum node height (2g)
- n_w: minimum node width (2g)
- n: maximum number of nodes (h \* w) / (n_h \* n_w)
- r_h: minimum room height (g)
- r_w: minimum room width (g)
```

### 1. Generating a BSP tree

Generating the BSP tree uses a custom BSP implementation for two-dimensional planes.

Pseudocode:

```
function BSP(gridSize) {
  const root = new BSPNode()
  split(root, gridSize)
  return root
}

function split(node, gridSize) {
  nodeChildren = []

  if(canSplit(node, gridSize))
    splitPoint = random(gridSize * 2, node.width - 1)
    leftChild = ...
    rightChild = ...
    nodeChildren = [leftChild, rightChild]

  for(let i = 0; i < nodeChildren.length; i++) {
    split(nodeChildren[i])
  }
}

function canSplit (node, gridSize) {
  return width > gridSize * 6 || height > gridSize * 6)
}

```

Function BSP calls split, which is the main method in the algorithm, and BSP runs in O(1).
It can be seen that split() is a recursive procedure. The constraints for splitting a node are
in function canSplit(), which runs a simple calculation in O(1) time.

As can be seen, splitting is always done at a minimum size of `2g`. This means that the map can be split vertically at most `h / 2g` times (ignoring the 1 here as it is quite negligible). Same goes for horizontal splitting.

That means there's a maximum amount of `n` nodes. To reach n nodes we have to split the map `log n` times, and as we have to then process all the `n` nodes, we get a time complexity of `O(n log n)`.

### 2. Map template generation

Pseudocode:

```
map = [][]
for y in h
  for x in w
    map[y][x] = ....
```

Generating the map is a two-level for loop. This means a time complexity of `O(hw)`.

### 3. Room generation

Pseudocode:

```
n = bspTree.getLeaves()
map = [][]
for node in n
  ...
  for y in r_h
    for x in r_w
      map[y][x] = ...

function getLeaves(node) {
  if isLeaf(node)
    return node

  return getLeaves(node.leftChild).concat(getLeaves(node.rightChild))
}
```

Fetching leaf nodes is a `O(n log n)` operation as there are at most `n` nodes and reaching them takes at most `log n` iterations. Room generation is done for each node, so at most `n` times. There are omitted `O(1)` operations, but for each node a room is generated and the map is updated for the room. The room size can be approximated to be at most the node size, so `n_w * n_h`. This gives a time complexity of `O(n log n) + O(n * n_w * n_h)`.

### 4. Pathfinding grid generation

Pseudocode:

```
n = bspTree.getLeaves()
map = [][]
for node in n
  ...
  for y in h
    for x in w
      map[y][x] = ...
```

Fetching leaf nodes is a `O(n log n)` operation (See 3.). This is similar to step 2, so `O(hw)`.

### 5. Door generation

Pseudocode:
rooms = []

```
for room in rooms
  ...
```

For each room a door is generated. The actual generation is purely `O(1)` operations, so the time complexity is `O(n)`.

### 6. Route generation

Pseudocode:

```
rooms = []
for i in rooms
  getRoute(aStar(rooms[i], rooms[i + 1]))

function getRoute(start, end) {
  ...
  queue = new PriorityQueue()
  queue.push(start)

  while(!queue.isEmpty()) {
    current = queue.pop()
    ...
    validNeighbors = getValidNeighbors(current.x, current.y, map)

    for neighbor in validNeighbors
      ...
      queue.push(neighbor)
  }
}
```

Calculating a route is done for each room, so `n` times. Pathfinding grid (generated in step 4) has a maximum presence of `p = (w / g * h) + (h / g * w)`. The actual route calculation takes the combination of the following:

- pushing current node to queue (queue has at most `p` length and the implementation allows pushing in `O(log p)` time - see PriorityQueue analysis)
- while queue is not empty (so maximum of `p` times)...
- pop the current value from the queue (`O(log p)`)
- Get valid neighbors `O(1)`
- for each neighbor (always max 4, so `O(1)`)
- push to queue (`O(log p)`)

This can be combined to `O(n * p * (2 * log p))`

### 7. Drawing the dungeon

This step mostly has to do with UI, so omitted for now.

### PriorityQueue

#### Push

Pseudocode:

```
queue = []
queue.push(value)
moveUp(queue.length - 1)

function moveUp(index) {
  while(index > 0)
    parentIndex = Math.floor((index - 1) / 2);
    ...
    if (queue[parent].priority > queue[index].priority)
      index = parentIndex
    else
      break
}
```

The function moveUp moves up half of the queue on each iteration of the while loop, so the time complexity is `O(log n)`.

#### Pop

Pseudocode:

```
queue = []
value = queue[0]
queue.swap(0, queue.length - 1)
queue.pop()
queue.moveDown()

function moveDown() {
  currentIndex = smallestIndex = 0;
  while (true) {
    const leftChildIndex = 2 * currentIndex + 1;
    const rightChildIndex = 2 * currentIndex + 2;

    if (this.values[leftChildIndex].priority < this.values[smallestIndex].priority)
      smallestIndex = leftChildIndex;

    if (this.values[rightChildIndex].priority < this.values[smallestIndex].priority)
      smallestIndex = rightChildIndex;

    if (currentIndex !== smallestIndex) {
      queue.swap(currentIndex, smallestIndex);
      currentIndex = smallestIndex;
    } else {
      break;
    }
  }
}
```

It can be seen that moveDown doubles the index when checking for children. This means that it traverses the tree in `O(log n)`.

## Complexity analysis for cellular generation

Cellular generation means going through a `n*m` array for each iteration and running `O(1)` operation for deciding what to do with each item. So the time complexity for each iteration is `O(nm)`.

## Sources

[1] Generic description of dungeon generation using BSP. Stack Overflow. URL: https://gamedev.stackexchange.com/a/82066

[2] Binary Space Partitioning. Wikipedia. URL: https://en.wikipedia.org/wiki/Binary_space_partitioning

[3] A* Search Algorithm. Wikipedia. URL: https://en.wikipedia.org/wiki/A*\_search_algorithm

[4] EXACT SIZE OF BINARY SPACE PARTITIONINGS ANDIMPROVED RECTANGLE TILING ALGORITHMS. BERMAN, DASGUPTA, MUTHUKRISHNAN. URL: https://www.cs.uic.edu/~dasgupta/resume/publ/papers/bsp.pdf

[5] Heaps and Priority Queues. Hackerearth. https://www.hackerearth.com/practice/notes/heaps-and-priority-queues/

[6] Binary Heaps and Priority Queues via JavaScript. DigitalOcean. https://www.digitalocean.com/community/tutorials/js-binary-heaps

[7] Constructive Generation Methods for Dungeons. Marco Niemann. https://www.wi.uni-muenster.de/sites/wi/files/users/mpreu_02/games-material/ba-vm-ss2015/marco_niemann_-_constructive_generation_methods_for_dungeons_-_thesis.pdf
