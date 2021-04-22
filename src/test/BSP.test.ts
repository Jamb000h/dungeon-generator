import BSP from "../other/BSP";
import { canFitARoom, isTooDisproportionate } from "../other/utils";

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
      expect(firstChild.area).toEqual({ x: 0, y: 0, width: 1, height: 2 });
    });

    test("second child is the root node's right half", () => {
      const bspTree = BSP(2, 2, { minArea: 2 });
      const secondChild = bspTree.getRoot().getChildNodes()[1];
      expect(secondChild.area).toEqual({ x: 1, y: 0, width: 1, height: 2 });
    });
  });

  describe("given minArea 2 and a 5x1 area", () => {
    test("it creates at most two children", () => {
      const bspTree = BSP(5, 1, { minArea: 2 });
      const childNodes = bspTree.getRoot().getChildNodes();
      expect(childNodes.length).toBeLessThanOrEqual(2);
    });
  });

  describe("given minArea 2 and a 1x5 area", () => {
    test("it creates at most two children", () => {
      const bspTree = BSP(1, 5, { minArea: 2 });
      const childNodes = bspTree.getRoot().getChildNodes();
      expect(childNodes.length).toBeLessThanOrEqual(2);
    });
  });
});

describe("canFitARoom", () => {
  test("it calculates fit correctly for valid values", () => {
    const height = 10;
    const width = 10;
    const minArea = 100;

    expect(canFitARoom(minArea, height, width)).toBe(true);
  });

  test("it calculates fit correctly for invalid values", () => {
    const height = 10;
    const width = 10;
    const minArea = 101;

    expect(canFitARoom(minArea, height, width)).toBe(false);
  });
});

describe("isTooDisproportionate", () => {
  test("it returns true for a too wide room", () => {
    expect(isTooDisproportionate(7, 2)).toBe(true);
  });

  test("it returns true for a too high room", () => {
    expect(isTooDisproportionate(2, 7)).toBe(true);
  });

  test("it returns false for a valid room", () => {
    expect(isTooDisproportionate(2, 6)).toBe(false);
  });
});
