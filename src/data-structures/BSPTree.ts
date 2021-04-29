import { BSPNode } from "./BSPNode";

export class BSPTree {
  private root: BSPNode;

  constructor(width: number, height: number) {
    this.root = new BSPNode(0, 0, width, height);
  }

  /**
   * Get the BSPTree root node
   * @return {BSPNode} The root node of the BSP tree
   */
  getRoot(): BSPNode {
    return this.root;
  }

  /**
   * Find leaves starting from a node. To accomodate easy usage, if a node is not
   * provided, the function is called with the BSP Tree root node.
   * @param {BSPNode} node The BSPNode that start searching nodes from
   * @return {BSPNode[]} All leaf nodes of the BSP tree
   */
  getLeaves(node?: BSPNode): BSPNode[] {
    if (!node) {
      return this.getLeaves(this.root);
    }

    // Leaf found, return
    if (node.isLeaf()) return [node];

    const children = node.getChildNodes();
    const leftChildLeaves = this.getLeaves(children[0]);
    const rightChildLeaves =
      children.length > 1 ? this.getLeaves(children[1]) : [];

    return leftChildLeaves.concat(rightChildLeaves);
  }
}

export default BSPTree;
