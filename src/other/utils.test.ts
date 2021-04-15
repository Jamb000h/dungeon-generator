import { generateMap, getRandomBetween, getValidDoorDirections } from "./utils";

describe("getRandomBetween", () => {
  test("returns correctly for small numbers", () => {
    const minLimit = 0;
    const maxLimit = 1;
    const random = getRandomBetween(minLimit, maxLimit);
    expect(random).toBeGreaterThanOrEqual(minLimit);
    expect(random).toBeLessThanOrEqual(maxLimit);
  });

  test("returns correctly for bigger numbers", () => {
    const minLimit = 1501;
    const maxLimit = 1502;
    const random = getRandomBetween(minLimit, maxLimit);
    expect(random).toBeGreaterThanOrEqual(minLimit);
    expect(random).toBeLessThanOrEqual(maxLimit);
  });

  test("returns rounded numbers", () => {
    const minLimit = 1.123;
    const maxLimit = 2.3345;
    const random = getRandomBetween(minLimit, maxLimit);
    expect(random % 1).toBe(0);
  });
});

describe("generateMap", () => {
  test("generates a map of wanted size", () => {
    const height = 10;
    const width = 10;
    const map = generateMap(height, width);
    expect(map.length).toEqual(10);
    expect(map[0].length).toEqual(10);
  });
});

describe("getValidDoorDirections", () => {
  test("prevents left side correctly", () => {
    const map = generateMap(100, 100);
    const room = { x: 5, y: 5, height: 5, width: 5 };
    const validDirections = getValidDoorDirections(room, map, 5);
    expect(validDirections.left).toEqual(false);
  });

  test("prevents right side correctly", () => {
    const map = generateMap(100, 100);
    const room = { x: 90, y: 5, height: 5, width: 5 };
    const validDirections = getValidDoorDirections(room, map, 5);
    expect(validDirections.right).toEqual(false);
  });

  test("prevents top correctly", () => {
    const map = generateMap(100, 100);
    const room = { x: 5, y: 5, height: 5, width: 5 };
    const validDirections = getValidDoorDirections(room, map, 5);
    expect(validDirections.top).toEqual(false);
  });

  test("prevents bottom correctly", () => {
    const map = generateMap(100, 100);
    const room = { x: 5, y: 90, height: 5, width: 5 };
    const validDirections = getValidDoorDirections(room, map, 5);
    expect(validDirections.bottom).toEqual(false);
  });

  test("allows left side correctly", () => {
    const map = generateMap(100, 100);
    const room = { x: 6, y: 5, height: 5, width: 5 };
    const validDirections = getValidDoorDirections(room, map, 5);
    expect(validDirections.left).toEqual(true);
  });

  test("allows right side correctly", () => {
    const map = generateMap(100, 100);
    const room = { x: 89, y: 5, height: 5, width: 5 };
    const validDirections = getValidDoorDirections(room, map, 5);
    expect(validDirections.right).toEqual(true);
  });

  test("allows top correctly", () => {
    const map = generateMap(100, 100);
    const room = { x: 5, y: 6, height: 5, width: 5 };
    const validDirections = getValidDoorDirections(room, map, 5);
    expect(validDirections.top).toEqual(true);
  });

  test("allows bottom correctly", () => {
    const map = generateMap(100, 100);
    const room = { x: 5, y: 89, height: 5, width: 5 };
    const validDirections = getValidDoorDirections(room, map, 5);
    expect(validDirections.bottom).toEqual(true);
  });
});
