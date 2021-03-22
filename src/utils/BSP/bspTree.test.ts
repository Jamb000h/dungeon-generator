import BSPTree from "./BSP";

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
      position: {
        x: 0,
        y: 0,
        width: 1,
        height: 1,
      },
    };
    expect(rootNode).toEqual(expected);
  });
});
