export enum CellularMapPoint {
  ROOM = "ROOM",
  WALL = "WALL",
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
      if (yy === y && xx === x) continue;

      types[map[yy][xx]] = types[map[yy][xx]] + 1;
    }
  }
  return types;
};