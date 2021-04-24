import BSPTree from "../data-structures/BSPTree";
import { BSPNode } from "../data-structures/BSPNode";
import { getRandomBetween } from "./utils";
import { SplitDirection } from "../enums/SplitDirection";

interface Options {
  gridSize?: number;
}

interface DefaultOptions {
  gridSize: number;
}

const defaultOptions: DefaultOptions = {
  gridSize: 0,
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
  split(root, 0, opts);

  return tree;
};

/**
 * Splits a node into two separate nodes and continues by trying to split both
 * of the generated nodes recursively
 * @param node a node to split
 * @param splits splits currently done
 * @param options options to give to the algorithm.
 */
const split = (
  node: BSPNode,
  splits: number,
  options: Options & DefaultOptions
) => {
  const { gridSize } = options;
  const { x, y, width, height } = node.area;

  // Early return if we cannot sufficiently split the node to accomodate the minArea
  if (!node.isLeaf() || !canSplit(width, height, gridSize)) {
    return;
  }

  // The logic is that if width is greater or equal to height, we want to
  // split vertically and otherwise horizontally to keep the areas uniform
  const splitDirection =
    width >= height ? SplitDirection.VERTICAL : SplitDirection.HORIZONTAL;

  if (splitDirection === SplitDirection.VERTICAL) {
    const minimumSplit = gridSize * 2;
    const maxSplit = width - 1;
    const split = getRandomBetween(minimumSplit, maxSplit);

    node.addChildren([
      new BSPNode(x, y, split, height),
      new BSPNode(x + split, y, width - split, height),
    ]);
  } else {
    const minimumSplit = gridSize * 2;
    const maxSplit = height;
    const split = getRandomBetween(minimumSplit, maxSplit);

    node.addChildren([
      new BSPNode(x, y, width, split),
      new BSPNode(x, y + split, width, height - split),
    ]);
  }

  // Run split on the node's children
  for (let i = 0; i < node.getChildNodes().length; i++) {
    split(node.getChildNodes()[i], splits + 1, options);
  }
};

/**
 * Checks if a node can be split
 * @param width width of current node
 * @param height height of current node
 * @param gridSize size of the pathfinding grid
 * @return {boolean} true if can be split, false otherwise
 */
const canSplit = (width: number, height: number, gridSize: number): boolean => {
  if (width > gridSize * 6 || height > gridSize * 6) {
    return true;
  }

  return false;
};

export default BSP;
