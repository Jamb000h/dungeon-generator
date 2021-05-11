import { MapPoint } from "../enums/MapPoint";
import { Point } from "../interfaces/Point";

export enum CellularMapPoint {
  ROOM = "ROOM",
  WALL = "WALL",
  LOCKEDROOM = "LOCKEDROOM",
}

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

export const iterateCellularDungeon = (
  map: CellularMapPoint[][],
  turnToRoomThreshold: number,
  turnToWallThreshold: number
): CellularMapPoint[][] => {
  const newMap: CellularMapPoint[][] = [];

  for (let y = 0; y < map.length; y++) {
    newMap.push([]);
    for (let x = 0; x < map[y].length; x++) {
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
      if (map[y][x] === MapPoint.ROOM) {
        newMap[y].push(CellularMapPoint.ROOM);
        continue;
      }
      Math.random() < roomRatio
        ? newMap[y].push(CellularMapPoint.ROOM)
        : newMap[y].push(CellularMapPoint.WALL);
    }
  }

  return newMap;
};

export const iterateCellularDungeonFromBSPAStar = (
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

export const cleanup = (map: CellularMapPoint[][], start: Point) => {
  const stack: Point[] = [];
  const valid: Point[] = [];
  const visited: { [key: string]: boolean } = {};
  stack.push(start);
  while (stack.length > 0) {
    const node = stack.pop();
    if (!visited[`${node!.x}-${node!.y}`]) {
      visited[`${node!.x}-${node!.y}`] = true;
      valid.push(node!);
      const neighbors = findNeighbors(map, node!);
      for (let j = 0; j < neighbors.length; j++) {
        if (map[neighbors[j].y][neighbors[j].x] !== CellularMapPoint.WALL) {
          stack.push(neighbors[j]);
        }
      }
    }
  }

  const emptyMap = generateCellularDungeon(map.length, map[0].length, 0);

  for (let i = 0; i < valid.length; i++) {
    emptyMap[valid[i].y][valid[i].x] = CellularMapPoint.ROOM;
  }

  return emptyMap;
};

const findNeighbors = (map: CellularMapPoint[][], point: Point) => {
  const neighbors = [];
  for (
    let y = Math.max(0, point.y - 1);
    y <= Math.min(map.length - 1, point.y + 1);
    y++
  ) {
    for (
      let x = Math.max(0, point.x - 1);
      x <= Math.min(map[y].length - 1, point.x + 1);
      x++
    ) {
      if (y === point.y && x === point.x) continue;

      neighbors.push({ x, y });
    }
  }
  return neighbors;
};
