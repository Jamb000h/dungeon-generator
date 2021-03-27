import BSP from "./BSP";

describe("BSP", () => {
  describe("given minArea 2 and a 2x2 area", () => {
    test("it creates exactly two children", () => {
      const bspTree = BSP(2, 2, { minArea: 2 });
      const childNodes = bspTree.getRoot().getChildNodes();
      expect(childNodes.length).toEqual(2);
      expect(childNodes.every((node) => node.isLeaf())).toEqual(true);
    });

    test("first child is the root node's left half", () => {
      const bspTree = BSP(2, 2, { minArea: 2 });
      const firstChild = bspTree.getRoot().getChildNodes()[0];
      expect(firstChild.position).toEqual({ x: 0, y: 0, width: 1, height: 2 });
    });

    test("second child is the root node's right half", () => {
      const bspTree = BSP(2, 2, { minArea: 2 });
      const secondChild = bspTree.getRoot().getChildNodes()[1];
      expect(secondChild.position).toEqual({ x: 1, y: 0, width: 1, height: 2 });
    });
  });

  describe("given minArea 2 and a 5x1 area", () => {
    test("it creates exactly two children", () => {
      const bspTree = BSP(5, 1, { minArea: 2 });
      const childNodes = bspTree.getRoot().getChildNodes();
      expect(childNodes.length).toEqual(2);
      expect(childNodes.every((node) => node.isLeaf())).toEqual(true);
    });

    test("first child is the root node's first 3 columns of pixels", () => {
      const bspTree = BSP(5, 1, { minArea: 2 });
      const firstChild = bspTree.getRoot().getChildNodes()[0];
      expect(firstChild.position).toEqual({ x: 0, y: 0, width: 3, height: 1 });
    });

    test("second child is the root node's last 2 columns of pixels", () => {
      const bspTree = BSP(5, 1, { minArea: 2 });
      const secondChild = bspTree.getRoot().getChildNodes()[1];
      expect(secondChild.position).toEqual({ x: 3, y: 0, width: 2, height: 1 });
    });
  });

  describe("given minArea 2 and a 1x4 area", () => {
    test("it creates exactly two children", () => {
      const bspTree = BSP(1, 4, { minArea: 2 });
      const childNodes = bspTree.getRoot().getChildNodes();
      expect(childNodes.length).toEqual(2);
      expect(childNodes.every((node) => node.isLeaf())).toEqual(true);
    });

    test("first child is the root node's top half", () => {
      const bspTree = BSP(1, 4, { minArea: 2 });
      const firstChild = bspTree.getRoot().getChildNodes()[0];
      expect(firstChild.position).toEqual({ x: 0, y: 0, width: 1, height: 2 });
    });

    test("second child is the root node's bottom half", () => {
      const bspTree = BSP(1, 4, { minArea: 2 });
      const secondChild = bspTree.getRoot().getChildNodes()[1];
      expect(secondChild.position).toEqual({ x: 0, y: 2, width: 1, height: 2 });
    });
  });

  describe("given minArea 2 and a 1x5 area", () => {
    test("it creates exactly two children", () => {
      const bspTree = BSP(1, 5, { minArea: 2 });
      const childNodes = bspTree.getRoot().getChildNodes();
      expect(childNodes.length).toEqual(2);
      expect(childNodes.every((node) => node.isLeaf())).toEqual(true);
    });

    test("first child is the root node's top 3 rows of pixels", () => {
      const bspTree = BSP(1, 5, { minArea: 2 });
      const firstChild = bspTree.getRoot().getChildNodes()[0];
      expect(firstChild.position).toEqual({ x: 0, y: 0, width: 1, height: 3 });
    });

    test("second child is the root node's bottom 2 rows of pixels", () => {
      const bspTree = BSP(1, 5, { minArea: 2 });
      const secondChild = bspTree.getRoot().getChildNodes()[1];
      expect(secondChild.position).toEqual({ x: 0, y: 3, width: 1, height: 2 });
    });
  });
});
