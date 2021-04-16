import React, { useEffect, useRef } from "react";
import { BSPNode } from "../data-structures/BSPNode";
import { MapPoint } from "../enums/MapPoint";
import { Point } from "../interfaces/Point";
import { RoomDoors } from "../interfaces/RoomDoors";
import "./Canvas.css";

interface Props {
  mapWidth: number;
  mapHeight: number;
  minArea: number;
  showLeafBoundaries: boolean;
  routes: Point[][];
  leaves?: BSPNode[];
  doors: RoomDoors[];
  map: MapPoint[][];
  showGrid: boolean;
  showRoutes: boolean;
  showRooms: boolean;
  showDoors: boolean;
}

const Canvas = (props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, props.mapWidth, props.mapHeight);
    context.fillStyle = "#000";
    context.font = "10px Arial";
    context.textBaseline = "top";

    for (let y = 0; y < props.map.length; y++) {
      for (let x = 0; x < props.map[y].length; x++) {
        if (props.map[y][x] === MapPoint.GRID && props.showGrid) {
          context.fillStyle = "#008000";
          context.fillRect(x, y, 1, 1);
        }

        if (
          (props.showRooms && props.map[y][x] === MapPoint.ROOM) ||
          props.map[y][x] === MapPoint.DOOR
        ) {
          context.fillStyle = "#000";
          context.fillRect(x, y, 1, 1);
        }
      }
    }

    if (props.showDoors) {
      for (let i = 0; i < props.doors.length; i++) {
        context.fillStyle = "#FF0000";

        if (i > 0) {
          context.fillRect(
            props.doors[i].inDoor.x - 1,
            props.doors[i].inDoor.y - 1,
            3,
            3
          );
        }

        if (i < props.doors.length - 1) {
          context.fillRect(
            props.doors[i].outDoor.x - 1,
            props.doors[i].outDoor.y - 1,
            3,
            3
          );
        }
      }
    }

    if (props.showRoutes) {
      for (let i = 0; i < props.routes.length; i++) {
        for (let j = 0; j < props.routes[i].length; j++) {
          context.fillStyle = "#FF0000";
          context.fillRect(props.routes[i][j].x, props.routes[i][j].y, 2, 2);
        }
      }
    }

    if (props.leaves && props.showLeafBoundaries) {
      for (let i = 0; i < props.leaves.length; i++) {
        const { x, y, width, height } = props.leaves[i].area;
        context.strokeRect(x, y, width, height);
      }
    }
  }, [
    props.leaves,
    props.mapHeight,
    props.mapWidth,
    props.showLeafBoundaries,
    props.routes,
    props.doors,
    props.map,
    props.showGrid,
    props.showRoutes,
    props.showRooms,
    props.showDoors,
  ]);

  return (
    <canvas ref={canvasRef} width={props.mapWidth} height={props.mapHeight} />
  );
};

export default Canvas;
