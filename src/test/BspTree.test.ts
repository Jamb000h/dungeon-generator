import { BSPNode } from "../data-structures/BSPNode";
import { BSPTree } from "../data-structures/BSPTree";

describe("BSPTree", () => {
  test("can be initialized with proper values", () => {
    expect(() => new BSPTree(1, 1)).not.toThrow();
  });

  test("cannot have width less than 1", () => {
    expect(() => new BSPTree(0, 1)).toThrow();
  });

  test("cannot have height less than 1", () => {
    expect(() => new BSPTree(1, 0)).toThrow();
  });

  test("creates a root node", () => {
    const tree = new BSPTree(1, 1);
    const rootNode = tree.getRoot();
    const expected = {
      childNodes: [],
      area: {
        x: 0,
        y: 0,
        width: 1,
        height: 1,
      },
    };
    expect(rootNode).toEqual(expected);
  });

  test("finds its leaf nodes", () => {
    const tree = new BSPTree(4, 4);
    const rootNode = tree.getRoot();
    const childNode1 = new BSPNode(0, 0, 2, 2);
    const childNode2 = new BSPNode(2, 0, 2, 2);
    rootNode.addChild(childNode1);
    let leafNodes = tree.getLeaves();
    expect(leafNodes).toHaveLength(1);
    rootNode.addChild(childNode2);
    leafNodes = tree.getLeaves();
    expect(leafNodes).toEqual([childNode1, childNode2]);
  });
});
