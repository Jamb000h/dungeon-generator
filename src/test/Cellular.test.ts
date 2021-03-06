import { CellularMapPoint } from "../enums/CellularMapPoint";
import { MapPoint } from "../enums/MapPoint";
import {
  addRoutesToMap,
  cleanup,
  generateCellularDungeon,
  generateCellularDungeonFromBSPAStar,
  getNeighborTypeCounts,
  iterateCellularDungeon,
} from "../other/Cellular";

describe("generateCellularDungeon", () => {
  test("generates a dungeon of nothing but wall if ratio is 0", () => {
    const dungeon = generateCellularDungeon(100, 100, 0);
    for (let y = 0; y < dungeon.length; y++) {
      for (let x = 0; x < dungeon[y].length; x++) {
        expect(dungeon[y][x]).toEqual(CellularMapPoint.WALL);
      }
    }
  });

  test("generates a dungeon of nothing but room if ratio is 1", () => {
    const dungeon = generateCellularDungeon(100, 100, 1);
    for (let y = 0; y < dungeon.length; y++) {
      for (let x = 0; x < dungeon[y].length; x++) {
        expect(dungeon[y][x]).toEqual(CellularMapPoint.ROOM);
      }
    }
  });

  test("generates a dungeon of wall and room if ratio is 0.5", () => {
    const dungeon = generateCellularDungeon(100, 100, 0.5);
    let wallFound = false;
    let roomFound = false;
    for (let y = 0; y < dungeon.length; y++) {
      if (wallFound && roomFound) break;
      for (let x = 0; x < dungeon[y].length; x++) {
        if (wallFound && roomFound) break;
        if (dungeon[y][x] === CellularMapPoint.ROOM) {
          roomFound = true;
        } else {
          wallFound = true;
        }
      }
    }

    expect(wallFound).toBe(true);
    expect(roomFound).toBe(true);
  });
});

describe("getNeighborTypeCounts", () => {
  test("returns 8 neighbors if not near walls", () => {
    const dungeon = generateCellularDungeon(3, 3, 0.5);
    const neighbors = getNeighborTypeCounts(1, 1, dungeon);
    const neighborsum = Object.values(neighbors).reduce(
      (prev, curr) => prev + curr,
      0
    );

    expect(neighborsum).toBe(8);
  });

  test("returns 5 neighbors if near top wall", () => {
    const dungeon = generateCellularDungeon(3, 3, 0.5);
    const neighbors = getNeighborTypeCounts(1, 0, dungeon);
    const neighborsum = Object.values(neighbors).reduce(
      (prev, curr) => prev + curr,
      0
    );

    expect(neighborsum).toBe(5);
  });

  test("returns 5 neighbors if near bottom wall", () => {
    const dungeon = generateCellularDungeon(3, 3, 0.5);
    const neighbors = getNeighborTypeCounts(1, 2, dungeon);
    const neighborsum = Object.values(neighbors).reduce(
      (prev, curr) => prev + curr,
      0
    );

    expect(neighborsum).toBe(5);
  });

  test("returns 5 neighbors if near left wall", () => {
    const dungeon = generateCellularDungeon(3, 3, 0.5);
    const neighbors = getNeighborTypeCounts(0, 1, dungeon);
    const neighborsum = Object.values(neighbors).reduce(
      (prev, curr) => prev + curr,
      0
    );

    expect(neighborsum).toBe(5);
  });

  test("returns 5 neighbors if near right wall", () => {
    const dungeon = generateCellularDungeon(3, 3, 0.5);
    const neighbors = getNeighborTypeCounts(2, 1, dungeon);
    const neighborsum = Object.values(neighbors).reduce(
      (prev, curr) => prev + curr,
      0
    );

    expect(neighborsum).toBe(5);
  });

  test("returns 3 neighbors if in a corner", () => {
    const dungeon = generateCellularDungeon(3, 3, 0.5);
    const neighbors = getNeighborTypeCounts(0, 0, dungeon);
    const neighborsum = Object.values(neighbors).reduce(
      (prev, curr) => prev + curr,
      0
    );

    expect(neighborsum).toBe(3);
  });
});

describe("iterateCellularDungeon", () => {
  test("changes all rooms to walls if threshold for change is 0", () => {
    const dungeon = generateCellularDungeon(20, 20, 1);
    const iteratedDungeon = iterateCellularDungeon(dungeon, 0, 8);
    expect(iteratedDungeon).toEqual(dungeon);
  });

  test("changes all walls to rooms if threshold for change is 0", () => {
    const dungeon = generateCellularDungeon(20, 20, 0);
    const iteratedDungeon = iterateCellularDungeon(dungeon, 8, 0);
    expect(iteratedDungeon).toEqual(dungeon);
  });

  test("toggles rooms and walls", () => {
    const dungeon = generateCellularDungeon(20, 20, 0.5);
    const iteratedDungeon = iterateCellularDungeon(dungeon, 5, 5);
    expect(iteratedDungeon).not.toEqual(dungeon);
  });

  test("does not touch LockedRooms", () => {
    const dungeon = generateCellularDungeon(3, 3, 0.5);
    dungeon[1][1] = CellularMapPoint.LOCKEDROOM;
    const iteratedDungeon = iterateCellularDungeon(dungeon, 1, 1);
    expect(iteratedDungeon[1][1]).toEqual(CellularMapPoint.LOCKEDROOM);
  });
});

describe("addRoutesToMap", () => {
  test("turns routes to locked rooms", () => {
    const map = [
      [CellularMapPoint.ROOM, CellularMapPoint.WALL],
      [CellularMapPoint.WALL, CellularMapPoint.ROOM],
    ];
    const routes = [[{ x: 0, y: 1 }]];
    const mapWithRoutesAdded = addRoutesToMap(map, routes);
    expect(mapWithRoutesAdded).toEqual([
      [CellularMapPoint.ROOM, CellularMapPoint.WALL],
      [CellularMapPoint.LOCKEDROOM, CellularMapPoint.ROOM],
    ]);
  });
});

describe("cleanup", () => {
  test("removes unreachable nodes", () => {
    const map = [
      [CellularMapPoint.ROOM, CellularMapPoint.ROOM],
      [CellularMapPoint.WALL, CellularMapPoint.ROOM],
      [CellularMapPoint.WALL, CellularMapPoint.WALL],
      [CellularMapPoint.ROOM, CellularMapPoint.WALL],
    ];
    const start = { x: 0, y: 0 };
    const cleanedMap = cleanup(map, start);
    expect(cleanedMap).toEqual([
      [CellularMapPoint.ROOM, CellularMapPoint.ROOM],
      [CellularMapPoint.WALL, CellularMapPoint.ROOM],
      [CellularMapPoint.WALL, CellularMapPoint.WALL],
      [CellularMapPoint.WALL, CellularMapPoint.WALL],
    ]);
  });
});

describe("generateCellularDungeonFromBSPAStar", () => {
  test("converts a bspAstar dungeon to a cellular dungeon 1", () => {
    const map = [
      [MapPoint.ROAD, MapPoint.DOOR],
      [MapPoint.GRID, MapPoint.ROOM],
    ];
    const convertedMap = generateCellularDungeonFromBSPAStar(map, 1);

    expect(convertedMap).toEqual([
      [CellularMapPoint.LOCKEDROOM, CellularMapPoint.LOCKEDROOM],
      [CellularMapPoint.ROOM, CellularMapPoint.LOCKEDROOM],
    ]);
  });

  test("converts a bspAstar dungeon to a cellular dungeon 2", () => {
    const map = [
      [MapPoint.ROAD, MapPoint.DOOR],
      [MapPoint.GRID, MapPoint.ROOM],
    ];
    const convertedMap = generateCellularDungeonFromBSPAStar(map, 0);

    expect(convertedMap).toEqual([
      [CellularMapPoint.LOCKEDROOM, CellularMapPoint.LOCKEDROOM],
      [CellularMapPoint.WALL, CellularMapPoint.LOCKEDROOM],
    ]);
  });
});
