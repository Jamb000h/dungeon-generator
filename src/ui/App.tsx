import React, { useState } from "react";
import "./App.css";
import { BSPAstarCanvas } from "./BSPAstarCanvas";
import { Point } from "../interfaces/Point";
import { generateDungeon } from "../other/utils";
import { BSPAstarSettings } from "./BSPAstarSettings";
import { Log } from "./Log";
import { CellularSettings } from "./CellularSettings";
import { CellularCanvas } from "./CellularCanvas";
import {
  addRoutesToMap,
  cleanup,
  generateCellularDungeon,
  generateCellularDungeonFromBSPAStar,
  iterateCellularDungeon,
} from "../other/Cellular";
import { CellularBSPAstarSettings } from "./CellularBSPAstarSettings";
import { CellularBSPAstarCanvas } from "./CellularBSPAstarCanvas";
import { Dungeon } from "../interfaces/Dungeon";
import { CellularMapPoint } from "../enums/CellularMapPoint";

enum AppToShow {
  CELLULAR = "CELLULAR",
  BSPASTAR = "BSPASTAR",
  CELLULARBSP = "CELLULARBSP",
}

export const App = () => {
  const [appToShow, setAppToShow] = useState<AppToShow>(AppToShow.BSPASTAR);

  // UI state for BSP + AStar
  const [dungeon, setDungeon] = useState<Dungeon | null>(null);
  const [mapWidth, setMapWidth] = useState(1000);
  const [mapHeight, setMapHeight] = useState(500);
  const [showLeafBoundaries, setShowLeafBoundaries] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [showRoutes, setShowRoutes] = useState(true);
  const [showRooms, setShowRooms] = useState(true);
  const [showDoors, setShowDoors] = useState(true);
  const [bspAstarMessage, setBspAstarMessage] = useState("");

  // UI state for cellular generation
  const [initialRoomRatio, setInitialRoomRatio] = useState(0.4);
  const [initialIterations, setInitialIterations] = useState(1);
  const [turnToRoomThreshold, setTurnToRoomThreshold] = useState(4);
  const [turnToWallThreshold, setTurnToWallThreshold] = useState(5);
  const [cellularMap, setCellularMap] = useState<CellularMapPoint[][]>([]);
  const [cellularMapWidth, setCellularMapWidth] = useState(1000);
  const [cellularMapHeight, setCellularMepHeight] = useState(500);
  const [cellularMessage, setCellularMessage] = useState("");

  // UI state for BSP + Astar + Cellular
  const [bspAstarCellularMessage, setBspAstarCellularMessage] = useState("");
  const [bspAstarCellularMap, setBSPAstarCellularMap] = useState<
    CellularMapPoint[][]
  >([]);
  const [bspAstarCellularHeight, setBSPAstarCellularHeight] = useState(500);
  const [bspAstarCellularWidth, setBSPAstarCellularWidth] = useState(500);
  const [cleanUpStart, setCleanUpStart] = useState<Point>({ x: 0, y: 0 });

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
      setDungeon(dungeon);
      setMapWidth(width);
      setMapHeight(height);
    } catch (e) {
      setBspAstarMessage(e.message);
      return;
    }
  };

  const initializeCellular = (height: number, width: number) => {
    const startTime = Date.now();
    let map = generateCellularDungeon(
      Math.floor(cellularMapHeight / 2),
      Math.floor(cellularMapWidth / 2),
      initialRoomRatio
    );
    for (let i = 0; i < initialIterations; i++) {
      map = iterateCellularDungeon(
        map,
        turnToRoomThreshold,
        turnToWallThreshold
      );
    }
    const duration = Date.now() - startTime;
    setCellularMessage("initialized in " + duration + "ms");
    setCellularMap(map);
    setCellularMepHeight(height);
    setCellularMapWidth(width);
  };

  const iterateCellular = () => {
    const startTime = Date.now();
    const map = iterateCellularDungeon(
      cellularMap,
      turnToRoomThreshold,
      turnToWallThreshold
    );
    const duration = Date.now() - startTime;
    setCellularMessage("iterated in " + duration + "ms");
    setCellularMap(map);
  };

  const iterateBSPAstarCellular = () => {
    const startTime = Date.now();
    const map = iterateCellularDungeon(bspAstarCellularMap, 5, 4);
    const duration = Date.now() - startTime;
    setBspAstarCellularMessage("iterated in " + duration + "ms");
    setBSPAstarCellularMap(map);
  };

  const initializeBSPAstarCellular = (
    height: number,
    width: number,
    gridSize: number,
    roomRatio: number
  ) => {
    const startTime = Date.now();
    const dungeon = generateDungeon(width, height, gridSize);
    const initialCellularMap = generateCellularDungeonFromBSPAStar(
      dungeon.map,
      roomRatio
    );
    const mapWithRoutes = addRoutesToMap(initialCellularMap, dungeon.routes);
    const duration = Date.now() - startTime;
    // Set UI state
    setCleanUpStart(dungeon.pathfindingStart);
    setBSPAstarCellularMap(mapWithRoutes);
    setBspAstarCellularMessage("generated dungeon in " + duration + "ms");
    setBSPAstarCellularHeight(height);
    setBSPAstarCellularWidth(width);
  };

  const cleanUpBSPAstarCellular = () => {
    setBSPAstarCellularMap(cleanup(bspAstarCellularMap, cleanUpStart));
  };

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
        <button onClick={() => setAppToShow(AppToShow.CELLULARBSP)}>
          BSp-Astar + Cellular
        </button>
      </nav>
      {appToShow === AppToShow.BSPASTAR && (
        <div className="app" id="bsp-astar">
          <h2>BSP-Astar</h2>
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
            dungeon={dungeon}
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
          <CellularSettings
            initialRoomRatio={initialRoomRatio}
            turnToWallThreshold={turnToWallThreshold}
            turnToRoomThreshold={turnToRoomThreshold}
            initialIterations={initialIterations}
            setInitialRoomRatio={setInitialRoomRatio}
            setTurnToWallThreshold={setTurnToWallThreshold}
            setTurnToRoomThreshold={setTurnToRoomThreshold}
            setInitialIterations={setInitialIterations}
            iterate={iterateCellular}
            initialize={initializeCellular}
          />
          <Log message={cellularMessage} />
          <CellularCanvas
            mapWidth={cellularMapWidth}
            mapHeight={cellularMapHeight}
            map={cellularMap}
          />
        </div>
      )}
      {appToShow === AppToShow.CELLULARBSP && (
        <div className="app" id="cellular-bsp-astar">
          <h2>BSP-AStar + Cellular</h2>
          <CellularBSPAstarSettings
            iterate={iterateBSPAstarCellular}
            initialize={initializeBSPAstarCellular}
            cleanup={cleanUpBSPAstarCellular}
          />
          <Log message={bspAstarCellularMessage} />
          <CellularBSPAstarCanvas
            mapWidth={bspAstarCellularWidth}
            mapHeight={bspAstarCellularHeight}
            map={bspAstarCellularMap}
          />
        </div>
      )}
    </div>
  );
};
