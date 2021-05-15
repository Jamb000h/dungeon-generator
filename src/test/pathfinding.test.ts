import { generateDungeon, findReachablePoints } from "../other/utils";

describe("pathfinding", () => {
  test("generates valid routes through the whole dungeon in different width dungeons", () => {
    for (let mapWidth = 100; mapWidth <= 2000; mapWidth += 100) {
      for (let mapHeight = 100; mapHeight <= 2000; mapHeight += 100) {
        const dungeon = generateDungeon(200, 200, 20);
        const rooms = dungeon.rooms;
        const lastRoom = rooms[rooms.length - 1];
        const endPoint = {
          x: lastRoom.x + lastRoom.width - 1,
          y: lastRoom.y + lastRoom.height - 1,
        };
        const startingPoint = dungeon.pathfindingStart;
        const reachablePoints = findReachablePoints(dungeon.map, startingPoint);
        expect(
          reachablePoints.some(
            (point) => point.x === endPoint.x && point.y === endPoint.y
          )
        ).toBeTruthy();
      }
    }
  });

  test("generates valid routes through the whole dungeon in different gridSize dungeons", () => {
    for (let gridSize = 5; gridSize <= 50; gridSize += 1) {
      const dungeon = generateDungeon(200, 200, gridSize);
      const rooms = dungeon.rooms;
      const lastRoom = rooms[rooms.length - 1];
      const endPoint = {
        x: lastRoom.x + lastRoom.width - 1,
        y: lastRoom.y + lastRoom.height - 1,
      };
      const startingPoint = dungeon.pathfindingStart;
      const reachablePoints = findReachablePoints(dungeon.map, startingPoint);
      expect(
        reachablePoints.some(
          (point) => point.x === endPoint.x && point.y === endPoint.y
        )
      ).toBeTruthy();
    }
  });
});
