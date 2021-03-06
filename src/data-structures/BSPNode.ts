import { Area } from "../interfaces/Area";

export class BSPNode {
  private childNodes: BSPNode[] = [];
  readonly area: Area;

  /**
   * Create a new node for a BSP tree
   * @param x The x coordinate for top left corner of the node
   * @param y The y coordinate for top left cornet of the node
   * @param width The width of the node
   * @param height The height of the node
   * @throws if any of the parameters is negative
   * @throws if width or height is 0
   */
  constructor(x: number, y: number, width: number, height: number) {
    if (x < 0 || y < 0) {
      throw new Error("x and y have to be at least 0");
    }

    if (width < 1 || height < 1) {
      throw new Error("width and height have to be at least 1");
    }

    this.area = {
      x,
      y,
      width,
      height,
    };
  }

  /**
   * Returns the children of this node
   * @return {BSPNode[]} the list of child nodes
   */
  getChildNodes(): BSPNode[] {
    return this.childNodes;
  }

  /**
   * Returns the information whether the node is a leaf in the BSP tree
   * @return {boolean} True if node is leaf, false otherwise
   */
  isLeaf(): boolean {
    return this.childNodes.length === 0;
  }

  /**
   * Adds a node as a child of the node
   * @param node node to add as a child
   * @throws will throw an error if there are already two children
   */
  addChild(node: BSPNode) {
    if (this.childNodes.length < 2) {
      this.childNodes.push(node);

      return;
    }

    throw new Error("Too many children!");
  }

  /**
   * Adds nodes as children of the node
   * @param nodes nodes to add as children
   * @throws will throw an error if there are already two children
   */
  addChildren(nodes: BSPNode[]) {
    nodes.forEach((node) => this.addChild(node));
  }
}
