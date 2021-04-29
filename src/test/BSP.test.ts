import { BSP } from "../other/BSP";
import { canFitARoom, isTooDisproportionate } from "../other/utils";

describe("BSP", () => {
  describe("given gridSize 2 and a 13x13 area", () => {
    test("it creates at least two children", () => {
      const bspTree = BSP(13, 13, { gridSize: 2 });
      const childNodes = bspTree.getRoot().getChildNodes();
      expect(childNodes.length).toEqual(2);
    });

    test("root node is split to two halves", () => {
      const bspTree = BSP(13, 13, { gridSize: 2 });
      const firstChild = bspTree.getRoot().getChildNodes()[0];
      const secondChild = bspTree.getRoot().getChildNodes()[1];
      expect(firstChild.area.width + secondChild.area.width).toEqual(13);
      expect(firstChild.area.width).toEqual(secondChild.area.x);
    });
  });
});

describe("canFitARoom", () => {
  test("it calculates fit correctly for valid values", () => {
    const height = 16;
    const width = 16;
    const gridSize = 4;

    expect(canFitARoom(height, width, gridSize)).toBe(true);
  });

  test("it calculates fit correctly for invalid values", () => {
    const height = 16;
    const width = 16;
    const gridSize = 10;

    expect(canFitARoom(height, width, gridSize)).toBe(false);
  });
});

describe("isTooDisproportionate", () => {
  test("it returns true for a too wide room", () => {
    expect(isTooDisproportionate(7, 2, 0)).toBe(true);
  });

  test("it returns true for a too high room", () => {
    expect(isTooDisproportionate(2, 7, 0)).toBe(true);
  });

  test("it returns false for a valid room", () => {
    expect(isTooDisproportionate(2, 6, 0)).toBe(false);
  });
});
