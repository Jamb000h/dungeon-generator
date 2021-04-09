import { Point } from "../pathfinding/aStar";
import BSPTree, { BSPNode, Position } from "./BSPTree";

enum SplitDirection {
  VERTICAL,
  HORIZONTAL,
}

export interface Room extends Position {
  doors?: Point[];
}

interface Options {
  minArea?: number; // This means rectangle area, so width * height
}

interface DefaultOptions {
  minArea: number;
}

const defaultOptions: DefaultOptions = {
  minArea: 100,
};

/**
 * Runs BSP on an area of given size
 * @param width Width of the area to run BSP on
 * @param height Height of the area to run BSP on
 * @return {BSPTree} a BSP tree
 */
const BSP = (width: number, height: number, options: Options): BSPTree => {
  // Handle default options and given options
  const opts = { ...defaultOptions, ...options };

  const tree = new BSPTree(width, height);

  // Generate the BSP tree by splitting the root node until it cannot be split anymore
  // splitting is a recursive operation
  const root = tree.getRoot();
  split(root, opts);

  return tree;
};

/**
 * Splits a node into two separate nodes and continues by trying to split both
 * of the generated nodes recursively
 * @param node a node to split
 * @param options options to give to the algorithm.
 */
const split = (node: BSPNode, options: Options & DefaultOptions) => {
  const { minArea } = options;
  const { x, y, width, height } = node.position;

  // Early return if we cannot sufficiently split the node to accomodate the minArea
  if (!node.isLeaf() || !canSplit(minArea, width, height)) {
    return;
  }

  // The logic is that if width is greater or equal to height, we want to
  // split vertically and otherwise horizontally to keep the areas uniform
  const splitDirection =
    width >= height ? SplitDirection.VERTICAL : SplitDirection.HORIZONTAL;

  if (splitDirection === SplitDirection.VERTICAL) {
    //const minimumSplit = Math.ceil(minArea / height);
    //const split = getRandomBetween(minimumSplit, width);
    const split = Math.ceil(width / 2);

    node.addChildren([
      new BSPNode(x, y, split, height),
      new BSPNode(x + split, y, width - split, height),
    ]);
  } else {
    // const minimumSplit = Math.ceil(minArea / width);
    // const split = getRandomBetween(minimumSplit, height);
    const split = Math.ceil(height / 2);

    node.addChildren([
      new BSPNode(x, y, width, split),
      new BSPNode(x, y + split, width, height - split),
    ]);
  }

  // Run split on the node's children
  for (let i = 0; i < node.getChildNodes().length; i++) {
    split(node.getChildNodes()[i], options);
  }
};

/**
 * Get a random number between min and max
 * @param min minimum value
 * @param max maximum value
 * @return {number} random value between min and max
 */
export const getRandomBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * Checks if a node can be split
 * @param minArea minimum area of a room
 * @param width width of current node
 * @param height height of current node
 * @return {boolean} true if can be split, false otherwise
 */
const canSplit = (minArea: number, width: number, height: number) => {
  return width * height >= minArea * 2;
};

/**
 * Checks if a node can fit a room
 * @param minArea minimum area of a room
 * @param width width of current node
 * @param height height of current node
 * @return {boolean} true can fit a room, false otherwise
 */
export const canFitARoom = (
  minArea: number,
  height: number,
  width: number
): boolean => {
  return height * width >= minArea;
};

/**
 * Checks if a node is too disproportionate for a room.
 * Disproportionate means too slim in some direction.
 * @param width width of current node
 * @param height height of current node
 * @return {boolean} true if too disproportionate, false otherwise
 */
export const isTooDisproportionate = (
  width: number,
  height: number
): boolean => {
  return height > 3 * width || width > 3 * height;
};

/**
 * Generates rooms given a list of nodes.
 * @param nodes a list of nodes to generate rooms from
 * @param minArea minimum area of a
 */
export const generateRooms = (nodes: BSPNode[], graph: boolean[][]) => {
  // For each given node, try to generate a room
  const doors: Point[] = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const { x, y, width, height } = node.position;

    // Early continue if node is too disproportionate
    if (isTooDisproportionate(width, height)) {
      continue;
    }

    // Calculate room size and position
    const roomWidth =
      Math.floor(width / 2) + Math.floor(Math.random() * (width / 3)) - 2;
    const roomHeight =
      Math.floor(height / 2) + Math.floor(Math.random() * (height / 3)) - 2;
    const roomX = x + 1 + Math.floor(Math.random() * (width - roomWidth - 1));
    const roomY = y + 1 + Math.floor(Math.random() * (height - roomHeight - 1));

    // Generate doors for room

    // Left wall
    const inDoor = {
      x: roomX,
      y: roomY + Math.floor(roomHeight / 2),
    };

    // Right wall
    const outDoor = {
      x: roomX + roomWidth,
      y: roomY + Math.floor(roomHeight / 2),
    };

    node.room = {
      x: roomX,
      y: roomY,
      width: roomWidth,
      height: roomHeight,
      doors: [inDoor, outDoor],
    };

    doors.push(...node.room.doors!);

    // Mark room coordinates as false
    for (let i = roomY; i < roomY + roomHeight; i++) {
      for (let j = roomX; j < roomX + roomWidth; j++) {
        graph[i][j] = false;
      }
    }
  }

  // Mark door coordinates as true
  for (let i = 0; i < doors.length; i++) {
    graph[doors[i].y][doors[i].x] = true;
  }

  return graph;
};

/**
 * Get doors from rooms
 * @param rooms rooms to get doors from
 * @return {array} a list of doors for rooms
 */
export const getRoomDoors = (rooms: Room[]) => {
  const doors: Point[][] = [];

  for (let i = 0; i < rooms.length; i++) {
    doors.push(rooms[i].doors!);
  }

  return doors;
};

export default BSP;
