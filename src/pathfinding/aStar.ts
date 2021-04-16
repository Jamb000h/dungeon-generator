import { PriorityQueue } from "../data-structures/PriorityQueue";
import { MapPoint } from "../enums/MapPoint";
import { Point } from "../interfaces/Point";
import { RoomDoors } from "../interfaces/RoomDoors";

export const getRoutes = (
  map: MapPoint[][],
  doors: RoomDoors[],
  gridSize: number
) => {
  const routes = [];
  for (let i = 0; i < doors.length - 1; i++) {
    routes.push(aStar(doors[i].outDoor, doors[i + 1].inDoor, map, gridSize));
  }
  return routes;
};

/**
 * Finds a route between two nodes
 * @param start start node
 * @param finish end node
 * @param map map for traversal
 * @return {array} route
 */
const aStar = (
  start: Point,
  finish: Point,
  map: MapPoint[][],
  gridSize: number
): Point[] => {
  // Initialize bookkeeping variables
  const visited: { [key: string]: boolean } = {};
  const distances: { [key: string]: number } = {};
  const parents: { [key: string]: string } = {};

  // Instantiate a new Priority Queue
  const PQ = new PriorityQueue();

  // Add start node to bookkeeping and Priority Queue
  PQ.push(start.x, start.y, 0);
  parents[`${start.y}-${start.x}`] = `${start.y}-${start.x}`;
  distances[`${start.y}-${start.x}`] = 0;

  while (!PQ.isEmpty()) {
    // Get the desired value and parse a key to use with bookkeeping
    const current = PQ.pop();
    const key = `${current.y}-${current.x}`;

    // If we reached finish node, calculate and return route
    if (current.x === finish.x && current.y === finish.y) {
      const fastestRoute = route(key, parents);
      return fastestRoute;
    }

    // Skip if visited already
    if (visited[key]) continue;

    // Process node if not visited
    visited[key] = true;

    // Get valid directions
    const validNeighbors = getValidNeighbors(current.x, current.y, map);

    // Go through all valid directions and if this route is faster than the previous one,
    // mark this as the fastest route by updating bookkeeping
    for (let i = 0; i < validNeighbors.length; i++) {
      const neighborY = validNeighbors[i][0];
      const neighborX = validNeighbors[i][1];

      // Parse a key for bookkeeping
      const directionKey = `${neighborY}-${neighborX}`;

      // Get current distance for bookkeeping or assume Infinity
      const directionDistance =
        distances[directionKey] !== undefined
          ? distances[directionKey]
          : Infinity;

      // Calculate new distance
      const newDirectionDistance = current.priority + 1;

      const heuristic = manhattan({ y: neighborY, x: neighborX }, finish);

      // If new distance is faster, update bookkeeping
      if (newDirectionDistance < directionDistance) {
        distances[directionKey] = current.priority + 1;
        parents[directionKey] = key;
        PQ.push(neighborX, neighborY, newDirectionDistance + heuristic);
      }
    }
  }

  return [];
};

const getValidNeighbors = (x: number, y: number, map: MapPoint[][]) => {
  const validNeighbors = [];

  if (isValidNeighbor(x - 1, y, map)) {
    validNeighbors.push([y, x - 1]);
  }

  if (isValidNeighbor(x + 1, y, map)) {
    validNeighbors.push([y, x + 1]);
  }

  if (isValidNeighbor(x, y - 1, map)) {
    validNeighbors.push([y - 1, x]);
  }

  if (isValidNeighbor(x, y + 1, map)) {
    validNeighbors.push([y + 1, x]);
  }

  return validNeighbors;
};

const isValidNeighbor = (x: number, y: number, map: MapPoint[][]) => {
  return (
    y >= 0 &&
    y < map.length &&
    x >= 0 &&
    x < map[y].length &&
    [MapPoint.GRID, MapPoint.ROAD, MapPoint.DOOR].includes(map[y][x])
  );
};

const route = (key: string, parents: { [key: string]: string }): Point[] => {
  const route: Point[] = [];
  let currentKey = key;
  while (true) {
    let currentNode = parents[currentKey];
    route.push({
      y: parseInt(currentNode.split("-")[0]),
      x: parseInt(currentNode.split("-")[1]),
    });

    currentKey = parents[currentKey];

    if (parents[currentKey] === currentKey) {
      break;
    }
  }

  route.reverse();
  return route;
};

const manhattan = (a: Point, b: Point): number => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};
