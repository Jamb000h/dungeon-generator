import { BSPNode } from "../data-structures/BSPNode";
import { Area } from "../interfaces/Area";
import { MapPoint } from "../enums/MapPoint";

/**
 * Generates rooms given a list of nodes.
 * @param nodes a list of nodes to generate rooms from
 * @param minArea minimum area of a
 */
export const generateRooms = (nodes: BSPNode[], map: MapPoint[][]) => {
  // For each given node, try to generate a room
  const rooms: Area[] = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const { x, y, width, height } = node.area;

    // Early continue if node is too disproportionate
    if (isTooDisproportionate(width, height)) {
      continue;
    }

    // Calculate room size and position
    const roomWidth =
      Math.floor(width / 2) + Math.floor(Math.random() * (width / 3)) - 2;
    const roomHeight =
      Math.floor(height / 2) + Math.floor(Math.random() * (height / 3)) - 2;
    const roomX = x + 1 + Math.floor(Math.random() * (width - roomWidth - 1));
    const roomY = y + 1 + Math.floor(Math.random() * (height - roomHeight - 1));

    rooms.push({ x: roomX, y: roomY, height: roomHeight, width: roomWidth });

    for (let y = roomY; y < roomY + roomHeight; y++) {
      for (let x = roomX; x < roomX + roomWidth; x++) {
        map[y][x] = MapPoint.ROOM;
      }
    }
  }

  return { map, rooms };
};

/**
 * Checks if a node is too disproportionate for a room.
 * Disproportionate means too slim in some direction.
 * @param width width of current node
 * @param height height of current node
 * @return {boolean} true if too disproportionate, false otherwise
 */
export const isTooDisproportionate = (
  width: number,
  height: number
): boolean => {
  return height > 3 * width || width > 3 * height;
};

/**
 * Get a random number between min and max
 * @param min minimum value
 * @param max maximum value
 * @return {number} random value between min and max
 */
export const getRandomBetween = (min: number, max: number): number => {
  return Math.floor(Math.floor(Math.random() * (max - min)) + min);
};

/**
 * Checks if a node can fit a room
 * @param minArea minimum area of a room
 * @param width width of current node
 * @param height height of current node
 * @return {boolean} true can fit a room, false otherwise
 */
export const canFitARoom = (
  minArea: number,
  height: number,
  width: number
): boolean => {
  return height * width >= minArea;
};

/**
 * Calculates possible door directions
 * @param room a room to validate door directions for
 * @param map a map where the room resides
 * @return { object } an object with each side marked valid with a boolean
 */
export const getValidDoorDirections = (
  room: Area,
  map: MapPoint[][],
  gridSize: number
): { [key: string]: boolean } => {
  return {
    left: room.x > gridSize,
    right: room.x + room.width + gridSize < map[0].length,
    top: room.y > gridSize,
    bottom: room.y + room.height + gridSize < map.length,
  };
};

/**
 * Generates a map of size height x width
 * @param height height of map
 * @param width width of map
 * @return {array} a map of size height x width initialized to value MapPoint.EMPTY
 */
export const generateMap = (height: number, width: number): MapPoint[][] => {
  const map: MapPoint[][] = [];
  for (let y = 0; y < height; y++) {
    map.push([]);
    for (let x = 0; x < width; x++) {
      map[y].push(MapPoint.EMPTY);
    }
  }
  return map;
};
