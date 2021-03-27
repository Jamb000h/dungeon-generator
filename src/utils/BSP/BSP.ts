import BSPTree, { BSPNode, Position } from "./BSPTree";

enum SplitDirection {
  VERTICAL,
  HORIZONTAL,
}

interface Options {
  minArea?: number; // This means rectangle area, so width * height
}

interface DefaultOptions {
  minArea: number;
}

export interface Room extends Position {}

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
  const opts = { ...defaultOptions, ...options };
  const tree = new BSPTree(width, height);

  // Generate the BSP tree by splitting the root node until it cannot be split anymore
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

  // If we cannot sufficiently split the node to accomodate the minArea
  // and padding given in options, don't split this node
  if (!node.isLeaf() || !canSplit(minArea, width, height)) {
    return;
  }

  // The logic is that if width is greater or equal to height, we want to
  // split vertically and otherwise horizontally to keep the areas uniform
  const splitDirection =
    width >= height ? SplitDirection.VERTICAL : SplitDirection.HORIZONTAL;

  if (splitDirection === SplitDirection.VERTICAL) {
    const minimumSplit = Math.ceil(minArea / height);
    const split = getRandomBetween(minimumSplit, width);

    node.addChildren([
      new BSPNode(x, y, split, height),
      new BSPNode(x + split, y, width - split, height),
    ]);
  } else {
    const minimumSplit = Math.ceil(minArea / width);
    const split = getRandomBetween(minimumSplit, height);

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

const getRandomBetween = (min: number, max: number): number => {
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
  return width * height >= minArea * 1.1;
};

const canFitARoom = (minArea: number, height: number, width: number) => {
  return height * width >= minArea;
};

const isTooDisproportionate = (width: number, height: number) => {
  return height > 4 * width || width > 4 * height;
};

/**
 * Generates rooms given a list of nodes. The rooms have
 * @param nodes a list of nodes to generate rooms from
 * @param minArea minimum area of a
 */
export const generateRooms = (
  nodes: BSPNode[],
  minArea: number,
  padding = 20
) => {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const { x, y, width, height } = node.position;

    const paddedWidth = width - padding * 2;
    const paddedHeight = height - padding * 2;

    // Early continue if node is too small or too disproportionate
    if (
      !canFitARoom(minArea, paddedWidth, paddedHeight) ||
      isTooDisproportionate(paddedWidth, paddedHeight)
    ) {
      continue;
    }

    const roomWidth =
      Math.floor(paddedWidth / 2) +
      Math.floor(Math.random() * (paddedWidth / 2));
    const roomHeight =
      Math.floor(paddedHeight / 2) +
      Math.floor(Math.random() * (paddedHeight / 2));
    const roomX =
      x + padding + Math.floor(Math.random() * ((paddedWidth - roomWidth) / 2));
    const roomY =
      y +
      padding +
      Math.floor(Math.random() * ((paddedHeight - roomHeight) / 2));

    node.room = {
      x: roomX,
      y: roomY,
      width: roomWidth,
      height: roomHeight,
    };
  }
};

export default BSP;
