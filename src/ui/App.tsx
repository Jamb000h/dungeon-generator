import React, { useState, useEffect } from "react";
import "./App.css";
import Canvas from "./Canvas";
import BSPTree from "../data-structures/BSPTree";
import { Point } from "../interfaces/Point";
import { generateDungeon } from "../other/utils";
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
  const [doors, setDoors] = useState<{ inDoor: Point; outDoor: Point }[]>([]);
  const [routes, setRoutes] = useState<Point[][]>([]);
  const [map, setMap] = useState<MapPoint[][]>([]);
  const [showLeafBoundaries, setShowLeafBoundaries] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [showRoutes, setShowRoutes] = useState(true);
  const [showRooms, setShowRooms] = useState(true);
  const [showDoors, setShowDoors] = useState(true);

  const generate = () => {
    const dungeon = generateDungeon(
      updatedMapWidth,
      updatedMapHeight,
      updatedMinArea,
      updatedGridSize
    );

    // Set UI state
    setDoors(dungeon.doors);
    setRoutes(dungeon.routes);
    setMapWidth(updatedMapWidth);
    setMapHeight(updatedMapHeight);
    setMinArea(updatedMinArea);
    setBSPTree(dungeon.bspTree);
    setMap(dungeon.map);
  };

  useEffect(() => {
    // When loading UI, generate a dungeong
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
