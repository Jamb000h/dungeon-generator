import { BSPNode } from "./BSPNode";

describe("BSPNode", () => {
  test("can be initialized with proper values", () => {
    expect(() => new BSPNode(0, 0, 1, 1)).not.toThrow();
  });

  test("cannot have x less than 0", () => {
    expect(() => new BSPNode(-1, 0, 1, 1)).toThrow();
  });

  test("cannot have y less than 0", () => {
    expect(() => new BSPNode(0, -1, 1, 1)).toThrow();
  });

  test("cannot have width less than 1", () => {
    expect(() => new BSPNode(0, 0, 0, 1)).toThrow();
  });

  test("cannot have height less than 1", () => {
    expect(() => new BSPNode(0, 0, 1, 0)).toThrow();
  });

  test("initializes without child nodes", () => {
    const node = new BSPNode(0, 0, 1, 1);
    expect(node.getChildNodes().length).toEqual(0);
  });

  test("allows adding a child node", () => {
    const parentNode = new BSPNode(0, 0, 10, 10);
    const childNode = new BSPNode(5, 5, 5, 5);
    expect(() => parentNode.addChild(childNode)).not.toThrow();
    expect(parentNode.getChildNodes().length).toEqual(1);
    expect(parentNode.getChildNodes()[0]).toEqual(childNode);
  });

  test("allows adding two child nodes at once", () => {
    const parentNode = new BSPNode(0, 0, 10, 10);
    const childNode1 = new BSPNode(0, 0, 5, 5);
    const childNode2 = new BSPNode(5, 5, 5, 5);
    expect(() =>
      parentNode.addChildren([childNode1, childNode2])
    ).not.toThrow();
    expect(parentNode.getChildNodes().length).toEqual(2);
    expect(parentNode.getChildNodes()[0]).toEqual(childNode1);
    expect(parentNode.getChildNodes()[1]).toEqual(childNode2);
  });

  test("does not allow more than two children", () => {
    const parentNode = new BSPNode(0, 0, 10, 10);
    const childNode1 = new BSPNode(0, 0, 5, 5);
    const childNode2 = new BSPNode(5, 5, 5, 5);
    expect(() =>
      parentNode.addChildren([childNode1, childNode2])
    ).not.toThrow();

    const childNode3 = new BSPNode(2, 2, 2, 2);
    expect(() => parentNode.addChild(childNode3)).toThrow();
  });

  test("knows if it is a leaf", () => {
    const node = new BSPNode(0, 0, 1, 1);
    expect(node.isLeaf()).toEqual(true);
  });

  test("knows if it is not a leaf", () => {
    const node = new BSPNode(0, 0, 1, 1);
    const childNode = new BSPNode(0, 0, 5, 5);
    node.addChild(childNode);
    expect(node.isLeaf()).toEqual(false);
  });
});
