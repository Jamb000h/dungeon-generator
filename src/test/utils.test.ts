import { Direction } from "../enums/Direction";
import { MapPoint } from "../enums/MapPoint";
import {
  calculateDoorLimits,
  generateMap,
  getRandomBoundToGrid,
  getRandomBetween,
  getValidDoorDirections,
  generateGrid,
} from "../other/utils";

describe("getRandomBetween", () => {
  test("returns correctly for 0", () => {
    const minLimit = 0;
    const maxLimit = 0;
    const random = getRandomBetween(minLimit, maxLimit);
    expect(random).toEqual(minLimit);
  });
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
    expect(validDirections).not.toContain(Direction.LEFT);
  });

  test("prevents right side correctly", () => {
    const map = generateMap(100, 100);
    const room = { x: 90, y: 5, height: 5, width: 5 };
    const validDirections = getValidDoorDirections(room, map, 5);
    expect(validDirections).not.toContain(Direction.RIGHT);
  });

  test("prevents top correctly", () => {
    const map = generateMap(100, 100);
    const room = { x: 5, y: 5, height: 5, width: 5 };
    const validDirections = getValidDoorDirections(room, map, 5);
    expect(validDirections).not.toContain(Direction.TOP);
  });

  test("prevents bottom correctly", () => {
    const map = generateMap(100, 100);
    const room = { x: 5, y: 90, height: 5, width: 5 };
    const validDirections = getValidDoorDirections(room, map, 5);
    expect(validDirections).not.toContain(Direction.BOTTOM);
  });

  test("allows left side correctly", () => {
    const map = generateMap(100, 100);
    const room = { x: 6, y: 5, height: 5, width: 5 };
    const validDirections = getValidDoorDirections(room, map, 5);
    expect(validDirections).toContain(Direction.LEFT);
  });

  test("allows right side correctly", () => {
    const map = generateMap(100, 100);
    const room = { x: 89, y: 5, height: 5, width: 5 };
    const validDirections = getValidDoorDirections(room, map, 5);
    expect(validDirections).toContain(Direction.RIGHT);
  });

  test("allows top correctly", () => {
    const map = generateMap(100, 100);
    const room = { x: 5, y: 6, height: 5, width: 5 };
    const validDirections = getValidDoorDirections(room, map, 5);
    expect(validDirections).toContain(Direction.TOP);
  });

  test("allows bottom correctly", () => {
    const map = generateMap(100, 100);
    const room = { x: 5, y: 89, height: 5, width: 5 };
    const validDirections = getValidDoorDirections(room, map, 5);
    expect(validDirections).toContain(Direction.BOTTOM);
  });
});

describe("calculateDoorLimits", () => {
  test("calculates left limit correctly", () => {
    const gridSize = 5;
    const room = {
      x: 4,
      y: 0,
      width: 17,
      height: 5,
    };

    expect(calculateDoorLimits(room, gridSize).minX).toEqual(5);
    room.x = 5;
    expect(calculateDoorLimits(room, gridSize).minX).toEqual(10);
    room.x = 6;
    expect(calculateDoorLimits(room, gridSize).minX).toEqual(10);
    room.x = 7;
    expect(calculateDoorLimits(room, gridSize).minX).toEqual(10);
    room.x = 8;
    expect(calculateDoorLimits(room, gridSize).minX).toEqual(10);
    room.x = 9;
    expect(calculateDoorLimits(room, gridSize).minX).toEqual(10);
    room.x = 10;
    expect(calculateDoorLimits(room, gridSize).minX).toEqual(15);
  });

  test("calculates right limit correctly", () => {
    const gridSize = 5;
    const room = {
      x: 5,
      y: 0,
      width: 14,
      height: 5,
    };

    expect(calculateDoorLimits(room, gridSize).maxX).toEqual(15);
    room.width = 15;
    expect(calculateDoorLimits(room, gridSize).maxX).toEqual(15);
    room.width = 16;
    expect(calculateDoorLimits(room, gridSize).maxX).toEqual(20);
    room.width = 17;
    expect(calculateDoorLimits(room, gridSize).maxX).toEqual(20);
    room.width = 18;
    expect(calculateDoorLimits(room, gridSize).maxX).toEqual(20);
    room.width = 19;
    expect(calculateDoorLimits(room, gridSize).maxX).toEqual(20);
    room.width = 20;
    expect(calculateDoorLimits(room, gridSize).maxX).toEqual(20);
    room.width = 21;
    expect(calculateDoorLimits(room, gridSize).maxX).toEqual(25);
  });

  test("calculates top limit correctly", () => {
    const gridSize = 5;
    const room = {
      x: 0,
      y: 4,
      width: 17,
      height: 5,
    };

    expect(calculateDoorLimits(room, gridSize).minY).toEqual(5);
    room.y = 5;
    expect(calculateDoorLimits(room, gridSize).minY).toEqual(10);
    room.y = 6;
    expect(calculateDoorLimits(room, gridSize).minY).toEqual(10);
    room.y = 7;
    expect(calculateDoorLimits(room, gridSize).minY).toEqual(10);
    room.y = 8;
    expect(calculateDoorLimits(room, gridSize).minY).toEqual(10);
    room.y = 9;
    expect(calculateDoorLimits(room, gridSize).minY).toEqual(10);
    room.y = 10;
    expect(calculateDoorLimits(room, gridSize).minY).toEqual(15);
  });

  test("calculates bottom limit correctly", () => {
    const gridSize = 5;
    const room = {
      x: 5,
      y: 5,
      width: 14,
      height: 14,
    };

    expect(calculateDoorLimits(room, gridSize).maxY).toEqual(15);
    room.height = 15;
    expect(calculateDoorLimits(room, gridSize).maxY).toEqual(15);
    room.height = 16;
    expect(calculateDoorLimits(room, gridSize).maxY).toEqual(20);
    room.height = 17;
    expect(calculateDoorLimits(room, gridSize).maxY).toEqual(20);
    room.height = 18;
    expect(calculateDoorLimits(room, gridSize).maxY).toEqual(20);
    room.height = 19;
    expect(calculateDoorLimits(room, gridSize).maxY).toEqual(20);
    room.height = 20;
    expect(calculateDoorLimits(room, gridSize).maxY).toEqual(20);
    room.height = 21;
    expect(calculateDoorLimits(room, gridSize).maxY).toEqual(25);
  });
});

describe("getRandomBoundToGrid", () => {
  test("gives a correctly bound random X", () => {
    const gridSize = 5;
    const room = {
      x: 5,
      y: 0,
      width: 14,
      height: 0,
    };
    const { minX, maxX } = calculateDoorLimits(room, gridSize);
    for (let i = 0; i < 100; i++) {
      const randomX = getRandomBoundToGrid(minX, maxX, gridSize);
      expect(randomX).toBeGreaterThanOrEqual(minX);
      expect(randomX).toBeLessThanOrEqual(maxX);
      expect(randomX % gridSize).toEqual(0);
    }
  });

  test("gives a correctly bound random Y", () => {
    const gridSize = 5;
    const room = {
      x: 5,
      y: 4,
      width: 14,
      height: 21,
    };
    const { minY, maxY } = calculateDoorLimits(room, gridSize);
    for (let i = 0; i < 100; i++) {
      const randomX = getRandomBoundToGrid(minY, maxY, gridSize);
      expect(randomX).toBeGreaterThanOrEqual(minY);
      expect(randomX).toBeLessThanOrEqual(maxY);
      expect(randomX % gridSize).toEqual(0);
    }
  });
});

describe("generateGrid", () => {
  test("generates a valid grid", () => {
    const map = generateMap(5, 5);
    generateGrid(map, 2);
    expect(map[0][0]).toEqual(MapPoint.GRID);
    expect(map[1][1]).toEqual(MapPoint.EMPTY);
    expect(map[2][2]).toEqual(MapPoint.GRID);
    expect(map[3][3]).toEqual(MapPoint.EMPTY);
    expect(map[4][4]).toEqual(MapPoint.GRID);
  });
});
