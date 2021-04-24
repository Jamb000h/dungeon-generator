import React, { useState, useEffect } from "react";
import "./App.css";
import Canvas from "./Canvas";
import BSPTree from "../data-structures/BSPTree";
import { Point } from "../interfaces/Point";
import { generateDungeon } from "../other/utils";
import { MapPoint } from "../enums/MapPoint";
import { BellsAndWhistles } from "./BellsAndWhistles";
import { Log } from "./Log";

function App() {
  const [bspTree, setBSPTree] = useState<BSPTree | null>(null);
  const [mapWidth, setMapWidth] = useState(1000);
  const [mapHeight, setMapHeight] = useState(500);
  const [doors, setDoors] = useState<{ inDoor: Point; outDoor: Point }[]>([]);
  const [routes, setRoutes] = useState<Point[][]>([]);
  const [map, setMap] = useState<MapPoint[][]>([]);
  const [showLeafBoundaries, setShowLeafBoundaries] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [showRoutes, setShowRoutes] = useState(true);
  const [showRooms, setShowRooms] = useState(true);
  const [showDoors, setShowDoors] = useState(true);
  const [message, setMessage] = useState("");

  const generate = (width: number, height: number, gridSize: number) => {
    try {
      const startTime = Date.now();
      const dungeon = generateDungeon(width, height, gridSize);
      const duration = Date.now() - startTime;

      // Set UI state
      setMessage("generated dungeon in " + duration + "ms");
      setDoors(dungeon.doors);
      setRoutes(dungeon.routes);
      setMapWidth(width);
      setMapHeight(height);
      setBSPTree(dungeon.bspTree);
      setMap(dungeon.map);
    } catch (e) {
      setMessage(e.message);
      return;
    }
  };

  useEffect(() => {
    // When loading UI, generate a dungeong
    generate(1000, 500, 40);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <BellsAndWhistles
        generate={generate}
        setShowLeafBoundaries={setShowLeafBoundaries}
        setShowGrid={setShowGrid}
        setShowRoutes={setShowRoutes}
        setShowRooms={setShowRooms}
        setShowDoors={setShowDoors}
        showLeafBoundaries={showLeafBoundaries}
        showGrid={showGrid}
        showRoutes={showRoutes}
        showRooms={showRooms}
        showDoors={showDoors}
      />

      <Log message={message} />

      <Canvas
        mapWidth={mapWidth}
        mapHeight={mapHeight}
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
