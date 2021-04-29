import { MapPoint } from "../enums/MapPoint";
import { generateGrid, generateMap } from "../other/utils";
import { aStar } from "../pathfinding/aStar";

describe("aStar", () => {
  test("returns empty array for no route available", () => {
    const map = generateMap(3, 3);

    const route = aStar({ x: 0, y: 0 }, { x: 2, y: 2 }, map);
    expect(route.length).toBe(0);
  });

  test("generates a fastes route in a 3x3 map", () => {
    const map = generateMap(3, 3);
    const grid = generateGrid(map, 1);

    const route = aStar({ x: 0, y: 0 }, { x: 2, y: 2 }, grid);
    expect(route.length).toBe(4);
    expect(route).toEqual([
      {
        x: 0,
        y: 0,
      },
      {
        x: 0,
        y: 1,
      },
      {
        x: 0,
        y: 2,
      },
      {
        x: 1,
        y: 2,
      },
    ]);
  });

  test("generates a route if only a single possible route is available in a map", () => {
    const map = generateMap(10, 10);

    map[7][7] = MapPoint.GRID;
    map[7][8] = MapPoint.GRID;
    map[7][9] = MapPoint.GRID;
    map[6][9] = MapPoint.GRID;
    map[5][9] = MapPoint.GRID;
    map[4][9] = MapPoint.GRID;

    const route = aStar({ x: 7, y: 7 }, { x: 9, y: 4 }, map);
    expect(route.length).toBe(5);
    expect(route).toEqual([
      {
        x: 7,
        y: 7,
      },
      {
        x: 8,
        y: 7,
      },
      {
        x: 9,
        y: 7,
      },
      {
        x: 9,
        y: 6,
      },
      {
        x: 9,
        y: 5,
      },
    ]);
  });

  test("generates a route in a large map", () => {
    const map = generateMap(200, 200);
    const grid = generateGrid(map, 10);

    const route = aStar({ x: 10, y: 10 }, { x: 190, y: 190 }, grid);
    // Algorithm has to move 180 in x and 180 in y = 360
    expect(route.length).toBe(360);
  });

  test("generates a route in a large map 2", () => {
    const map = generateMap(200, 200);
    const grid = generateGrid(map, 13);

    const route = aStar({ x: 156, y: 156 }, { x: 113, y: 13 }, grid);
    // Algorithm has to move 43 in x and 143 in y = 186
    expect(route.length).toBe(186);
  });
});
