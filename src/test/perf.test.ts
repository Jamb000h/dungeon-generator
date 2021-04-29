import { BSP } from "../other/BSP";
import { generateDungeon } from "../other/utils";

describe("BSP performance tests", () => {
  const testResults: string[] = [];
  beforeAll(() => {
    console.log(
      "Running performance tests, please wait... this takes around 5 minutes"
    );
  });
  test("1000x1000", () => {
    const startTime = Date.now();
    BSP(1000, 1000, { gridSize: 20 });
    const duration = Date.now() - startTime;
    testResults.push("1000x1000: " + duration);
  });
  test("5000x5000", () => {
    const startTime = Date.now();
    BSP(5000, 5000, { gridSize: 20 });
    const duration = Date.now() - startTime;
    testResults.push("5000x5000: " + duration);
  });
  test("10000x10000", () => {
    const startTime = Date.now();
    BSP(10000, 10000, { gridSize: 20 });
    const duration = Date.now() - startTime;
    testResults.push("10000x10000: " + duration);
  });
  test("100000x100000", () => {
    const startTime = Date.now();
    BSP(100000, 100000, { gridSize: 20 });
    const duration = Date.now() - startTime;
    testResults.push("100000x100000: " + duration);
  });
  afterAll(() => {
    let resultString = "--------------------\n";
    testResults.forEach((result) => {
      resultString += result + "\n";
    });
    resultString += "--------------------";
    console.log(resultString);
  });
});

describe("complete dungeon generation performance tests", () => {
  const testResults: string[] = [];
  beforeAll(() => {
    console.log(
      "Running performance tests, please wait... this takes between two and three minutes usually"
    );
  });
  test("generation of five dungeons of area 1000 x 1000 with a room minimum area of 10 000 and pathfinding grid of size 20", () => {
    let results: number[] = [];
    for (let i = 0; i < 5; i++) {
      const startTime = Date.now();
      generateDungeon(1000, 1000, 20);
      const duration = Date.now() - startTime;
      results.push(duration);
    }
    const totalTime = results.reduce((prev, cur) => prev + cur, 0);
    const averageTime = totalTime / results.length;
    testResults.push(
      "Average time for generating 1000x1000 dungeon: " + averageTime
    );
  });

  test("generation of five dungeons of area 1920 x 1080 with a room minimum area of 10 000 and pathfinding grid of size 20", () => {
    let results: number[] = [];
    for (let i = 0; i < 5; i++) {
      const startTime = Date.now();
      generateDungeon(1920, 1080, 20);
      const duration = Date.now() - startTime;
      results.push(duration);
    }
    const totalTime = results.reduce((prev, cur) => prev + cur, 0);
    const averageTime = totalTime / results.length;
    testResults.push(
      "Average time for generating 1920x1080 dungeon: " + averageTime
    );
  });

  test("generating dungeons of increasing height with a room minimum area of 10 000 and pathfinding grid of size 20", () => {
    // generate dungeons until average for a room size goes above 5 seconds
    // to find a realistic breakpoint for too bad performance
    let roomWidth = 1000;
    let roomHeight = 1080;
    while (true) {
      const startTime = Date.now();
      generateDungeon(roomWidth, roomHeight, 20);
      const duration = Date.now() - startTime;

      if (duration > 5000) break;

      roomHeight = roomHeight + 100;
    }
    testResults.push(
      "Generating a 1000x<height> dungeon takes > 5 seconds when height reaches " +
        roomHeight +
        " which means a total area of " +
        roomHeight * roomWidth
    );
  });

  test("generating dungeons of increasing width with a room minimum area of 10 000 and pathfinding grid of size 20", () => {
    // generate dungeons until average for a room size goes above 5 seconds
    // to find a realistic breakpoint for too bad performance
    let roomWidth = 1920;
    let roomHeight = 1000;
    while (true) {
      const startTime = Date.now();
      generateDungeon(roomWidth, roomHeight, 20);
      const duration = Date.now() - startTime;

      if (duration > 5000) break;

      roomWidth = roomWidth + 100;
    }
    testResults.push(
      "Generating a <width>x1000 dungeon takes > 5 seconds when width reaches " +
        roomWidth +
        " which means a total area of " +
        roomHeight * roomWidth
    );
  });

  test("generation of dungeons of increasing width and height with a room minimum area of 10 000 and pathfinding grid of size 20", () => {
    // generate dungeons until average for a room size goes above 5 seconds
    // to find a realistic breakpoint for too bad performance
    let roomWidth = 1920;
    let roomHeight = 1080;
    while (true) {
      const startTime = Date.now();
      generateDungeon(roomWidth, roomHeight, 20);
      const duration = Date.now() - startTime;

      if (duration > 5000) break;

      roomWidth = roomWidth + 100;
      roomHeight = roomHeight + 100;
    }
    testResults.push(
      "Generating a dungeon takes > 5 seconds when area reaches " +
        roomHeight * roomWidth
    );
  });

  afterAll(() => {
    let resultString = "--------------------\n";
    testResults.forEach((result) => {
      resultString += result + "\n";
    });
    resultString += "--------------------";
    console.log(resultString);
  });
});
