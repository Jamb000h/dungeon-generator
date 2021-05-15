import { CellularMapPoint } from "../enums/CellularMapPoint";
import { MapPoint } from "../enums/MapPoint";
import { Point } from "../interfaces/Point";
import { findReachablePoints } from "./utils";

/**
 * Generates a dungeon to be used with cellular generation
 * @param height height of the dungeon
 * @param width width of the dungeon
 * @param roomRatio ratio of rooms to walls (0-1)
 */
export const generateCellularDungeon = (
  height: number,
  width: number,
  roomRatio: number
) => {
  let map: CellularMapPoint[][] = [];
  for (let y = 0; y < height; y++) {
    map.push([]);
    for (let x = 0; x < width; x++) {
      Math.random() < roomRatio
        ? map[y].push(CellularMapPoint.ROOM)
        : map[y].push(CellularMapPoint.WALL);
    }
  }

  return map;
};

/**
 * Run an iteration of cellular generation in a dungeon
 * @param map map to iterate
 * @param turnToRoomThreshold number of adjacent rooms needed to turn the point into a room
 * @param turnToWallThreshold number of adjacent walls needed to turn the point into a wall
 */
export const iterateCellularDungeon = (
  map: CellularMapPoint[][],
  turnToRoomThreshold: number,
  turnToWallThreshold: number
): CellularMapPoint[][] => {
  const newMap: CellularMapPoint[][] = [];

  for (let y = 0; y < map.length; y++) {
    newMap.push([]);
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === CellularMapPoint.LOCKEDROOM) {
        newMap[y][x] = CellularMapPoint.LOCKEDROOM;
        continue;
      }
      const types = getNeighborTypeCounts(x, y, map);
      if (
        types[CellularMapPoint.ROOM] + types[CellularMapPoint.LOCKEDROOM] >=
        turnToRoomThreshold
      ) {
        newMap[y][x] = CellularMapPoint.ROOM;
      }

      if (types[CellularMapPoint.WALL] >= turnToWallThreshold) {
        newMap[y][x] = CellularMapPoint.WALL;
      }
    }
  }

  return newMap;
};

/**
 * Get counts of neighbor types
 * @param x x of the point to get neigborr count for
 * @param y y of the point to get neighbor count for
 * @param map map where the point is in
 */
export const getNeighborTypeCounts = (
  x: number,
  y: number,
  map: CellularMapPoint[][]
) => {
  const types = {
    [CellularMapPoint.ROOM]: 0,
    [CellularMapPoint.WALL]: 0,
    [CellularMapPoint.LOCKEDROOM]: 0,
  };

  for (
    let yy = Math.max(0, y - 1);
    yy <= Math.min(map.length - 1, y + 1);
    yy++
  ) {
    for (
      let xx = Math.max(0, x - 1);
      xx <= Math.min(map[yy].length - 1, x + 1);
      xx++
    ) {
      if (yy === y && xx === x) continue;

      types[map[yy][xx]] = types[map[yy][xx]] + 1;
    }
  }
  return types;
};

/**
 * Convert a bsp + a-star map to a cellular map
 * @param map map to convert
 * @param roomRatio ratio of rooms to walls to generate in empty spaces (0-1)
 */
export const generateCellularDungeonFromBSPAStar = (
  map: MapPoint[][],
  roomRatio: number
) => {
  let newMap: CellularMapPoint[][] = [];
  for (let y = 0; y < map.length; y++) {
    newMap.push([]);
    for (let x = 0; x < map[y].length; x++) {
      if ([MapPoint.DOOR, MapPoint.ROOM, MapPoint.ROAD].includes(map[y][x])) {
        newMap[y].push(CellularMapPoint.LOCKEDROOM);
        continue;
      }
      Math.random() < roomRatio
        ? newMap[y].push(CellularMapPoint.ROOM)
        : newMap[y].push(CellularMapPoint.WALL);
    }
  }

  return newMap;
};

/**
 * Clean unreachable points from a map
 * @param map map to clean up
 * @param start node to start pathfinding for reachable nodes at
 */
export const cleanup = (map: CellularMapPoint[][], start: Point) => {
  const newMap = generateCellularDungeon(map.length, map[0].length, 0);

  const reachablePoints = findReachablePoints(map, start);
  for (let i = 0; i < reachablePoints.length; i++) {
    const { x, y } = reachablePoints[i];
    newMap[y][x] = CellularMapPoint.ROOM;
  }

  return newMap;
};

/**
 * Adds routes to a map as locked rooms that cannot turn into walls afterwards
 * @param map
 * @param routes
 */
export const addRoutesToMap = (
  map: CellularMapPoint[][],
  routes: Point[][]
) => {
  for (let i = 0; i < routes.length; i++) {
    for (let j = 0; j < routes[i].length; j++) {
      const { x, y } = routes[i][j];
      map[y][x] = CellularMapPoint.LOCKEDROOM;
    }
  }
  return map;
};
