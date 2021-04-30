import { MapPoint } from "../enums/MapPoint";
import { RoomDoors } from "../interfaces/RoomDoors";
import BSP from "./BSP";
import { generateDoors, generateMap, generateRooms } from "./utils";

export enum CellularMapPoint {
  ROOM = "ROOM",
  WALL = "WALL",
}

export const generateCellularDungeon = (height: number, width: number) => {
  // Run BSP to split area
  const bspTree = BSP(width, height, {
    gridSize: 30,
  });
  const map = generateMap(height, width);
  // Generate rooms from the bspTree leaf nodes and store in state
  const { rooms, map: mapWithRooms } = generateRooms(
    bspTree.getLeaves(),
    map,
    30
  );

  // Generate doors for rooms
  const { doors, map: mapWithDoors } = generateDoors(mapWithRooms, rooms, 30);

  const connections = generateConnections(mapWithDoors, doors);
  return { map: mapWithDoors, connections };
};

export const generateConnections = (
  mapWidthDoors: MapPoint[][],
  doors: RoomDoors[]
) => {
  const connections = [];
  for (let i = 0; i < doors.length - 1; i++) {
    connections.push({ start: doors[i].inDoor, end: doors[i + 1].outDoor });
  }
  return connections;
};

export const gcd = (height: number, width: number, roomRatio: number) => {
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

export const iterate = (
  map: CellularMapPoint[][],
  turnToRoomThreshold: number,
  turnToWallThreshold: number
): CellularMapPoint[][] => {
  const newMap: CellularMapPoint[][] = [];

  for (let y = 0; y < map.length; y++) {
    newMap.push([]);
    for (let x = 0; x < map[y].length; x++) {
      const types = getNeighborTypeCounts(x, y, map);
      if (types[CellularMapPoint.ROOM] >= turnToRoomThreshold) {
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
      types[map[yy][xx]] = types[map[yy][xx]] + 1;
    }
  }
  return types;
};
