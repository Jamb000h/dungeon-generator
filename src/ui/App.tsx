import React, { useState, useEffect } from "react";
import "./App.css";
import { BSPAstarCanvas } from "./BSPAstarCanvas";
import { BSPTree } from "../data-structures/BSPTree";
import { Point } from "../interfaces/Point";
import { generateDungeon } from "../other/utils";
import { MapPoint } from "../enums/MapPoint";
import { BSPAstarSettings } from "./BSPAstarSettings";
import { Log } from "./Log";
import { CellularSettings } from "./CellularSettings";
import { CellularCanvas } from "./CellularCanvas";

enum AppToShow {
  CELLULAR = "CELLULAR",
  BSPASTAR = "BSPASTAR",
}

export const App = () => {
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
  const [bspAstarMessage, setBspAstarMessage] = useState("");
  const [cellularMessage, setCellularMessage] = useState("");
  const [appToShow, setAppToShow] = useState<AppToShow>(AppToShow.BSPASTAR);

  const generateBSPAstar = (
    width: number,
    height: number,
    gridSize: number
  ) => {
    try {
      const startTime = Date.now();
      const dungeon = generateDungeon(width, height, gridSize);
      const duration = Date.now() - startTime;

      // Set UI state
      setBspAstarMessage("generated dungeon in " + duration + "ms");
      setDoors(dungeon.doors);
      setRoutes(dungeon.routes);
      setMapWidth(width);
      setMapHeight(height);
      setBSPTree(dungeon.bspTree);
      setMap(dungeon.map);
    } catch (e) {
      setBspAstarMessage(e.message);
      return;
    }
  };

  useEffect(() => {
    // When loading UI, generate a dungeong
    generateBSPAstar(1000, 500, 40);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-wrapper">
      <h1>Dungeon Generation</h1>
      <nav>
        <button onClick={() => setAppToShow(AppToShow.BSPASTAR)}>
          BSP-Astar
        </button>
        <button onClick={() => setAppToShow(AppToShow.CELLULAR)}>
          Cellular
        </button>
      </nav>
      {appToShow === AppToShow.BSPASTAR && (
        <div className="app" id="bsp-astar">
          <h2>BSP-AStar</h2>
          <BSPAstarSettings
            generate={generateBSPAstar}
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

          <Log message={bspAstarMessage} />

          <BSPAstarCanvas
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
      )}
      {appToShow === AppToShow.CELLULAR && (
        <div className="app" id="cellular">
          <h2>Cellular</h2>
          <CellularSettings />
          <Log message={cellularMessage} />
          <CellularCanvas mapWidth={mapWidth} mapHeight={mapHeight} />
        </div>
      )}
    </div>
  );
};
