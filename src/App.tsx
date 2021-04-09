import React, { useState, useEffect } from "react";
import "./App.css";
import Canvas from "./Canvas";
import BSP, { generateRooms, getRoomDoors } from "./utils/BSP/BSP";
import BSPTree from "./utils/BSP/BSPTree";
import { getRoutes, Point } from "./utils/pathfinding/aStar";

function App() {
  const [bspTree, setBSPTree] = useState<BSPTree | null>(null);
  const [mapWidth, setMapWidth] = useState(500);
  const [mapHeight, setMapHeight] = useState(500);
  const [minArea, setMinArea] = useState(5000);
  const [updatedMapWidth, setUpdatedMapWidth] = useState(500);
  const [updatedMapHeight, setUpdatedMapHeight] = useState(500);
  const [updatedMinArea, setUpdatedMinArea] = useState(5000);
  const [showLeafBoundaries, setShowLeafBoundaries] = useState(false);
  const [doors, setDoors] = useState<Point[][]>([]);
  const [routes, setRoutes] = useState<Point[][]>([]);
  const [graph, setGraph] = useState<boolean[][]>([]);

  const generate = () => {
    console.time("generateRooms");
    const bspTree = BSP(updatedMapWidth, updatedMapHeight, {
      minArea: updatedMinArea,
    });

    // Create a graph for pathfinding
    const graph: boolean[][] = [];
    for (let y = 0; y < updatedMapHeight; y++) {
      graph.push([]);
      for (let x = 0; x < updatedMapWidth; x++) {
        graph[y].push(true);
      }
    }

    // Generate rooms from the bspTree leaf nodes and store in state
    const updatedGraph = generateRooms(bspTree.getLeaves(), graph);

    console.timeEnd("generateRooms");

    const doors = getRoomDoors(
      bspTree
        .getLeaves()
        .filter((node) => node.getRoom())
        .map((node) => node.getRoom()!)
    );

    let routes: Point[][] = [];
    if (doors.length > 1) {
      console.time("calculateRoutes");
      routes = getRoutes(updatedGraph, doors);
      console.timeEnd("calculateRoutes");
    }
    setDoors(doors);
    setRoutes(routes);
    setMapWidth(updatedMapWidth);
    setMapHeight(updatedMapHeight);
    setMinArea(updatedMinArea);
    setBSPTree(bspTree);
    setGraph(updatedGraph);
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
        <label htmlFor="showLeafBoundaries">
          show leaf boundaries
          <input
            type="checkbox"
            id="showLeafBoundaries"
            checked={showLeafBoundaries}
            onChange={(e) => setShowLeafBoundaries(e.target.checked)}
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
        graph={graph}
      />
    </div>
  );
}

export default App;
