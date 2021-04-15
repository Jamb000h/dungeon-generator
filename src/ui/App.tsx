import React, { useState, useEffect } from "react";
import "./App.css";
import Canvas from "./Canvas";
import BSP from "../other/BSP";
import BSPTree from "../data-structures/BSPTree";
import { getRoutes } from "../pathfinding/aStar";
import { Point } from "../interfaces/Point";
import {
  getValidDoorDirections,
  generateMap,
  generateRooms,
} from "../other/utils";
import { MapPoint } from "../enums/MapPoint";

function App() {
  const [bspTree, setBSPTree] = useState<BSPTree | null>(null);
  const [mapWidth, setMapWidth] = useState(500);
  const [mapHeight, setMapHeight] = useState(500);
  const [minArea, setMinArea] = useState(5000);
  const [gridSize, setGridSize] = useState(20);
  const [updatedMapWidth, setUpdatedMapWidth] = useState(500);
  const [updatedMapHeight, setUpdatedMapHeight] = useState(500);
  const [updatedMinArea, setUpdatedMinArea] = useState(5000);
  const [updatedGridSize, setUpdatedGridSize] = useState(20);
  const [showLeafBoundaries, setShowLeafBoundaries] = useState(false);
  const [doors, setDoors] = useState<Point[][]>([]);
  const [routes, setRoutes] = useState<Point[][]>([]);
  const [map, setMap] = useState<MapPoint[][]>([]);
  const [showGrid, setShowGrid] = useState(false);

  const generate = () => {
    // Run BSP to split area
    console.time("BSP");
    const bspTree = BSP(updatedMapWidth, updatedMapHeight, {
      minArea: updatedMinArea,
    });
    console.timeEnd("BSP");

    // Create a map for pathfinding and visualization
    console.time("generateMap");
    let map = generateMap(updatedMapHeight, updatedMapWidth);
    console.timeEnd("generateMap");

    // Generate rooms from the bspTree leaf nodes and store in state
    console.time("generateRooms");
    const { map: updatedMap, rooms } = generateRooms(bspTree.getLeaves(), map);
    map = updatedMap;
    console.timeEnd("generateRooms");

    // Generate grid for paths based on generated rooms
    // TODO: move to separate function
    console.time("generateGrid");

    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (
          (y % updatedGridSize === 0 || x % updatedGridSize === 0) &&
          map[y][x] !== MapPoint.ROOM
        ) {
          map[y][x] = MapPoint.GRID;
        }
      }
    }

    console.timeEnd("generateGrid");

    // Generate doors where grid and rooms intersect
    // TODO: move to separate function
    const doors: Point[][] = [];
    console.time("generateDoors");
    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i];
      const roomDoors = [];
      const allowedDirections = getValidDoorDirections(
        room,
        map,
        updatedGridSize
      );
      const doorsGenerated = {
        left: false,
        right: false,
        top: false,
        bottom: false,
      };
      for (let y = room.y; y < room.y + room.height; y++) {
        if (y === room.y && !allowedDirections.top) {
          continue;
        }

        if (y === room.y + room.height - 1 && !allowedDirections.bottom) {
          continue;
        }

        for (let x = room.x; x < room.x + room.width; x++) {
          if (roomDoors.length > 1) break;
          if (y === room.y && doorsGenerated.top) {
            continue;
          }

          if (y === room.y + room.height - 1 && doorsGenerated.bottom) {
            continue;
          }

          if (x === room.x && doorsGenerated.left) {
            continue;
          }

          if (x === room.x + room.width - 1 && doorsGenerated.right) {
            continue;
          }

          if (x === room.x && !allowedDirections.left) {
            continue;
          }

          if (x === room.x + room.width - 1 && !allowedDirections.right) {
            continue;
          }

          if (
            map[y][x] === MapPoint.ROOM &&
            (map[y - 1][x] === MapPoint.GRID ||
              map[y + 1][x] === MapPoint.GRID ||
              map[y][x - 1] === MapPoint.GRID ||
              map[y][x + 1] === MapPoint.GRID)
          ) {
            roomDoors.push({ y, x });
            if (x === room.x) {
              doorsGenerated.left = true;
            }

            if (x === room.x + room.width - 1) {
              doorsGenerated.right = true;
            }

            if (y === room.y) {
              doorsGenerated.top = true;
            }

            if (y === room.y + room.height - 1) {
              doorsGenerated.bottom = true;
            }
          }
        }
      }

      doors.push(roomDoors);
    }

    for (let i = 0; i < doors.length; i++) {
      for (let j = 0; j < doors[i].length; j++) {
        map[doors[i][j].y][doors[i][j].x] = MapPoint.DOOR;
      }
    }
    console.timeEnd("generateDoors");

    let routes: Point[][] = [];
    if (doors.length > 1) {
      console.time("calculateRoutes");
      routes = getRoutes(map, doors);
      console.timeEnd("calculateRoutes");
    }

    setDoors(doors);
    setRoutes(routes);
    setMapWidth(updatedMapWidth);
    setMapHeight(updatedMapHeight);
    setMinArea(updatedMinArea);
    setBSPTree(bspTree);
    setMap(map);
    setGridSize(updatedGridSize);
  };

  useEffect(() => {
    // When loading UI, if there's no BSP Tree
    // Generate one and store it in state
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <div className="settings">
        <label htmlFor="width">
          width
          <input
            id="width"
            value={updatedMapWidth}
            onChange={(e) => setUpdatedMapWidth(parseInt(e.target.value) || 0)}
          />
        </label>
        <label htmlFor="height">
          height
          <input
            id="height"
            value={updatedMapHeight}
            onChange={(e) => setUpdatedMapHeight(parseInt(e.target.value) || 0)}
          />
        </label>
        <label htmlFor="minArea">
          minArea
          <input
            id="minArea"
            value={updatedMinArea}
            onChange={(e) => setUpdatedMinArea(parseInt(e.target.value) || 0)}
          />
        </label>
        <label htmlFor="gridSize">
          gridSize
          <input
            id="gridSize"
            value={updatedGridSize}
            onChange={(e) => setUpdatedGridSize(parseInt(e.target.value) || 0)}
          />
        </label>
        <label htmlFor="showLeafBoundaries">
          show leaf boundaries
          <input
            type="checkbox"
            id="showLeafBoundaries"
            checked={showLeafBoundaries}
            onChange={(e) => setShowLeafBoundaries(e.target.checked)}
          />
        </label>
        <label htmlFor="showGrid">
          show grid
          <input
            type="checkbox"
            id="showGrid"
            checked={showGrid}
            onChange={(e) => setShowGrid(e.target.checked)}
          />
        </label>
        <input type="button" onClick={() => generate()} value="Generate" />
      </div>
      <Canvas
        mapWidth={mapWidth}
        mapHeight={mapHeight}
        minArea={minArea}
        showLeafBoundaries={showLeafBoundaries}
        leaves={bspTree?.getLeaves()}
        routes={routes}
        doors={doors}
        map={map}
        showGrid={showGrid}
      />
    </div>
  );
}

export default App;
