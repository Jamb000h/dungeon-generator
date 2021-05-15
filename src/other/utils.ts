import { BSPNode } from "../data-structures/BSPNode";
import { Area } from "../interfaces/Area";
import { MapPoint } from "../enums/MapPoint";
import { Direction } from "../enums/Direction";
import { RoomDoors } from "../interfaces/RoomDoors";
import { getRoutes } from "../pathfinding/aStar";
import { BSP } from "./BSP";
import { Dungeon } from "../interfaces/Dungeon";
import { CellularMapPoint } from "../enums/CellularMapPoint";
import { Point } from "../interfaces/Point";

/**
 * Generates rooms given a list of nodes.
 * @param nodes a list of nodes to generate rooms from
 * @param map a map to generate rooms in
 * @param gridSize size of the pathfinding grid
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
    if (isTooDisproportionate(width, height, gridSize)) {
      continue;
    }

    // Calculate room size and position
    const roomWidth = width - gridSize;

    const roomHeight = height - gridSize;

    const roomX = Math.floor(x + gridSize / 2);
    const roomY = Math.floor(y + gridSize / 2);

    // Add room to rooms
    rooms.push({ x: roomX, y: roomY, height: roomHeight, width: roomWidth });

    // Update map with room
    for (let y = roomY; y < roomY + roomHeight; y++) {
      for (let x = roomX; x < roomX + roomWidth; x++) {
        map[y][x] = MapPoint.ROOM;
      }
    }
  }

  return { map, rooms };
};

/**
 * Generate doors for rooms
 * @param map map where rooms reside
 * @param rooms rooms to generate doors for
 * @param gridSize grid size
 * @return {array} an array of objects that contain inDoor and outDoor for each room
 */
export const generateDoors = (
  map: MapPoint[][],
  rooms: Area[],
  gridSize: number
): { map: MapPoint[][]; doors: RoomDoors[] } => {
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

    // Get first direction randomly and remove direction from list
    const index = getRandomBetween(0, potentialDoorDirections.length);
    doorDirections.push(potentialDoorDirections[index]);
    potentialDoorDirections.splice(index, 1);

    // Get second direction randomly
    doorDirections.push(
      potentialDoorDirections[
        getRandomBetween(0, potentialDoorDirections.length)
      ]
    );

    // For each door, generate a position
    for (let d = 0; d < 2; d++) {
      const direction = doorDirections[d];
      const isIndoor = d === 0;

      // Generate a door and set the point in map as a door
      const { doorX, doorY } = generateDoor(direction, room, gridSize);
      map[doorY][doorX] = MapPoint.DOOR;

      // Update relevant variables
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

  return { map, doors };
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
  height: number,
  gridSize: number
): boolean => {
  if (width < gridSize * 2 || height < gridSize * 2) {
    return true;
  }

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
 * @param width width of current node
 * @param height height of current node
 * @param gridSize size of pathfinding grid
 * @return {boolean} true can fit a room, false otherwise
 */
export const canFitARoom = (
  height: number,
  width: number,
  gridSize: number
): boolean => {
  return height >= gridSize * 2 && width >= gridSize * 2;
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
 * @return {Object} a map with a pathfinding grid
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

  return map;
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

    // set y to either top or bottom wall
    if (direction === Direction.TOP) {
      doorY = room.y;
    } else {
      doorY = room.y + room.height - 1;
    }
  } else {
    doorY = getRandomBoundToGrid(minY, maxY, gridSize);

    // set x to either left or right wall
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

/**
 * Calculate minimum and maximum positions for doors
 * @param room room to calculate positions for
 * @param gridSize grid size to bind to
 * @return {object} minimum and maximum coordinates for x and y
 */
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

/**
 * Returns a random number between given min and max bound to grid size
 * @param min minimum value
 * @param max maximum value
 * @param gridSize grid size
 * @return {number} a random number bound to grid size
 */
export const getRandomBoundToGrid = (
  min: number,
  max: number,
  gridSize: number
) => {
  const randomX = getRandomBetween(min, max);
  return Math.floor(randomX / gridSize) * gridSize;
};

/**
 * Generates a dungeon's building parts:
 * - a tree of areas to generate rooms in
 * - a grid for pathfinding
 * - rooms
 * - doors for rooms
 * - routes between doors
 * @param width width of map
 * @param height height of map
 * @param gridSize size of the pathfinding grid
 * @return {Object} an object with a BSP tree, map and routes or an error message
 */
export const generateDungeon = (
  width: number,
  height: number,
  gridSize: number
): Dungeon => {
  if (width < 100) {
    throw new Error("minimum width is 100");
  }

  if (height < 100) {
    throw new Error("minimum height is 100");
  }

  if (gridSize > width / 4 || gridSize > height / 4) {
    throw new Error(
      "grid size too large - cannot be larger than 1/4 of width or height"
    );
  }

  // Run BSP to split area
  const bspTree = BSP(width, height, {
    gridSize: gridSize,
  });

  // Create a map for pathfinding and visualization
  const map = generateMap(height, width);

  // Generate rooms from the bspTree leaf nodes and store in state
  const { rooms, map: mapWithRooms } = generateRooms(
    bspTree.getLeaves(),
    map,
    gridSize
  );

  // Generate grid for paths based on generated rooms
  const mapWithPathfindingGrid = generateGrid(mapWithRooms, gridSize);

  // Generate doors for rooms
  const { doors, map: mapWithDoors } = generateDoors(
    mapWithPathfindingGrid,
    rooms,
    gridSize
  );

  // Generate routes between doors
  const routes = getRoutes(mapWithDoors, doors);

  const pathfindingStart = { x: rooms[0].x, y: rooms[0].y };

  return {
    routes,
    doors,
    bspTree,
    map: mapWithDoors,
    rooms,
    pathfindingStart,
  };
};

/**
 * Finds points that are reachable from the given point.
 * Uses DFS.
 * @param map Map to find reachable points in
 * @param start Point to start DFS from
 */
export const findReachablePoints = (
  map: CellularMapPoint[][] | MapPoint[][],
  start: Point
) => {
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
        const { x, y } = neighbors[j];
        if (
          map[y][x] !== CellularMapPoint.WALL &&
          map[y][x] !== MapPoint.EMPTY &&
          map[y][x] !== MapPoint.GRID
        ) {
          stack.push(neighbors[j]);
        }
      }
    }
  }

  return valid;
};

/**
 *
 * @param map Checks if a given point is within map limits
 * @param point Points to check
 */
export const isInBounds = (
  map: MapPoint[][] | CellularMapPoint[][],
  point: Point
) => {
  const { x, y } = point;
  return y >= 0 && y < map.length && x >= 0 && x < map[y].length;
};

/**
 *
 * @param map Gets neighboring points of a point
 * @param point Poiint to get neighbors for
 */
export const findNeighbors = (
  map: MapPoint[][] | CellularMapPoint[][],
  point: Point
) => {
  const neighbors = [];
  for (let y = point.y - 1; y <= point.y + 1; y++) {
    for (let x = point.x - 1; x <= point.x + 1; x++) {
      if (y === point.y && x === point.x) continue;

      if (isInBounds(map, { x, y })) {
        neighbors.push({ x, y });
      }
    }
  }
  return neighbors;
};
