import { BSPNode } from "../data-structures/BSPNode";
import { Area } from "../interfaces/Area";
import { MapPoint } from "../enums/MapPoint";
import { Direction } from "../enums/Direction";
import { RoomDoors } from "../interfaces/RoomDoors";

/**
 * Generates rooms given a list of nodes.
 * @param nodes a list of nodes to generate rooms from
 * @param minArea minimum area of a
 */
export const generateRooms = (
  nodes: BSPNode[],
  map: MapPoint[][],
  gridSize: number
) => {
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
      Math.floor((width - gridSize / 2) / 2) +
      Math.floor(Math.random() * ((width - gridSize / 2) / 2));
    const roomHeight =
      Math.floor((height - gridSize / 2) / 2) +
      Math.floor(Math.random() * ((height - gridSize / 2) / 2));
    const roomX = getRandomBetween(
      x + gridSize / 2,
      x + width - roomWidth - gridSize / 2
    );
    const roomY = getRandomBetween(
      y + gridSize / 2,
      y + height - roomHeight - gridSize / 2
    );

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
): Direction[] => {
  const directions = [];

  if (room.x > gridSize) directions.push(Direction.LEFT);
  if (room.x + room.width + gridSize < map[0].length)
    directions.push(Direction.RIGHT);
  if (room.y > gridSize) directions.push(Direction.TOP);
  if (room.y + room.height + gridSize < map.length)
    directions.push(Direction.BOTTOM);

  return directions;
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

/**
 * Updates a map to contain grid where there isn't a room
 * @param map map to generate grid on
 * @param gridSize grid size
 */
export const generateGrid = (map: MapPoint[][], gridSize: number) => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (
        (y % gridSize === 0 || x % gridSize === 0) &&
        map[y][x] !== MapPoint.ROOM
      ) {
        map[y][x] = MapPoint.GRID;
      }
    }
  }
};

export const generateDoors = (
  map: MapPoint[][],
  rooms: Area[],
  gridSize: number
): RoomDoors[] => {
  const doors: RoomDoors[] = [];
  for (let i = 0; i < rooms.length; i++) {
    // Get the individual room
    const room = rooms[i];

    // Object to hold generated doors
    const roomDoors: RoomDoors = {
      inDoor: { x: 0, y: 0 },
      outDoor: { x: 0, y: 0 },
    };

    // Get potential door directions based on room location in map
    // to prevent doors too close to walls and corners
    const potentialDoorDirections = getValidDoorDirections(room, map, gridSize);

    // Get random door directions from valid directions
    let doorDirections = [];

    const index = getRandomBetween(0, potentialDoorDirections.length);
    doorDirections.push(potentialDoorDirections[index]);
    potentialDoorDirections.splice(index, 1);

    doorDirections.push(
      potentialDoorDirections[
        getRandomBetween(0, potentialDoorDirections.length)
      ]
    );

    // For each door, generate a position
    for (let d = 0; d < 2; d++) {
      const direction = doorDirections[d];
      const isIndoor = d === 0;

      const { doorX, doorY } = generateDoor(direction, room, gridSize);
      map[doorY][doorX] = MapPoint.DOOR;

      if (isIndoor) {
        roomDoors.inDoor.x = doorX;
        roomDoors.inDoor.y = doorY;
        roomDoors.inDoor.direction = direction;
      } else {
        roomDoors.outDoor.x = doorX;
        roomDoors.outDoor.y = doorY;
        roomDoors.outDoor.direction = direction;
      }
    }

    doors.push(roomDoors);
  }

  return doors;
};

/**
 * Generate a single door on a room's wall
 * @param direction wall to generate the door on
 * @param room room to generate the door for
 * @param gridSize grid size for the map
 * @return {object} door for the given wall for the given room
 */
const generateDoor = (
  direction: Direction,
  room: Area,
  gridSize: number
): {
  doorX: number;
  doorY: number;
} => {
  let doorX;
  let doorY;

  const { minX, maxX, minY, maxY } = calculateDoorLimits(room, gridSize);

  if (direction === Direction.TOP || direction === Direction.BOTTOM) {
    doorX = getRandomBoundToGrid(minX, maxX, gridSize);

    if (direction === Direction.TOP) {
      doorY = room.y;
    } else {
      doorY = room.y + room.height - 1;
    }
  } else {
    doorY = getRandomBoundToGrid(minY, maxY, gridSize);

    if (direction === Direction.LEFT) {
      doorX = room.x;
    } else {
      doorX = room.x + room.width - 1;
    }
  }

  return {
    doorX,
    doorY,
  };
};

export const calculateDoorLimits = (room: Area, gridSize: number) => {
  const minX = Math.floor(room.x / gridSize + 1) * gridSize;
  const maxX = Math.floor((room.x + room.width - 1) / gridSize) * gridSize;
  const minY = Math.floor(room.y / gridSize + 1) * gridSize;
  const maxY = Math.floor((room.y + room.height - 1) / gridSize) * gridSize;

  return {
    minX,
    maxX,
    minY,
    maxY,
  };
};

export const getRandomBoundToGrid = (
  min: number,
  max: number,
  gridSize: number
) => {
  const randomX = getRandomBetween(min, max);
  return Math.floor(randomX / gridSize) * gridSize;
};
