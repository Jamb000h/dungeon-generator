import React, { useState, useEffect } from "react";
import "./App.css";
import Canvas from "./Canvas";
import BSP from "../other/BSP";
import BSPTree from "../data-structures/BSPTree";
import { getRoutes } from "../pathfinding/aStar";
import { Point } from "../interfaces/Point";
import {
  generateMap,
  generateRooms,
  generateGrid,
  generateDoors,
} from "../other/utils";
import { MapPoint } from "../enums/MapPoint";

function App() {
  const [bspTree, setBSPTree] = useState<BSPTree | null>(null);
  const [mapWidth, setMapWidth] = useState(1000);
  const [mapHeight, setMapHeight] = useState(500);
  const [minArea, setMinArea] = useState(15000);
  const [updatedMapWidth, setUpdatedMapWidth] = useState(1000);
  const [updatedMapHeight, setUpdatedMapHeight] = useState(500);
  const [updatedMinArea, setUpdatedMinArea] = useState(15000);
  const [updatedGridSize, setUpdatedGridSize] = useState(20);
  const [showLeafBoundaries, setShowLeafBoundaries] = useState(false);
  const [doors, setDoors] = useState<{ inDoor: Point; outDoor: Point }[]>([]);
  const [routes, setRoutes] = useState<Point[][]>([]);
  const [map, setMap] = useState<MapPoint[][]>([]);
  const [showGrid, setShowGrid] = useState(false);
  const [showRoutes, setShowRoutes] = useState(true);
  const [showRooms, setShowRooms] = useState(true);
  const [showDoors, setShowDoors] = useState(true);

  const generate = () => {
    // Run BSP to split area
    console.time("BSP");
    const bspTree = BSP(updatedMapWidth, updatedMapHeight, {
      minArea: updatedMinArea,
      gridSize: updatedGridSize,
    });
    console.timeEnd("BSP");

    // Create a map for pathfinding and visualization
    console.time("generateMap");
    let map = generateMap(updatedMapHeight, updatedMapWidth);
    console.timeEnd("generateMap");

    // Generate rooms from the bspTree leaf nodes and store in state
    console.time("generateRooms");
    const { rooms } = generateRooms(bspTree.getLeaves(), map, updatedGridSize);
    console.timeEnd("generateRooms");

    // Generate grid for paths based on generated rooms
    console.time("generateGrid");
    generateGrid(map, updatedGridSize);
    console.timeEnd("generateGrid");

    // Generate doors for rooms
    console.time("generateDoors");
    const doors = generateDoors(map, rooms, updatedGridSize);
    console.timeEnd("generateDoors");

    console.time("calculateRoutes");
    const routes = getRoutes(map, doors, updatedGridSize);
    console.timeEnd("calculateRoutes");

    setDoors(doors);
    setRoutes(routes);
    setMapWidth(updatedMapWidth);
    setMapHeight(updatedMapHeight);
    setMinArea(updatedMinArea);
    setBSPTree(bspTree);
    setMap(map);
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
        <label htmlFor="showRoutes">
          show routes
          <input
            type="checkbox"
            id="showRoutes"
            checked={showRoutes}
            onChange={(e) => setShowRoutes(e.target.checked)}
          />
        </label>
        <label htmlFor="showRooms">
          show rooms
          <input
            type="checkbox"
            id="showRooms"
            checked={showRooms}
            onChange={(e) => setShowRooms(e.target.checked)}
          />
        </label>
        <label htmlFor="showDoors">
          show doors
          <input
            type="checkbox"
            id="showDoors"
            checked={showDoors}
            onChange={(e) => setShowDoors(e.target.checked)}
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
        showRoutes={showRoutes}
        showRooms={showRooms}
        showDoors={showDoors}
      />
    </div>
  );
}

export default App;
