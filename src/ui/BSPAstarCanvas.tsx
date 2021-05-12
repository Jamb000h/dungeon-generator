import React, { useEffect, useRef } from "react";
import { Dungeon } from "../enums/Dungeon";
import { MapPoint } from "../enums/MapPoint";
import "./Canvas.css";

interface Props {
  mapWidth: number;
  mapHeight: number;
  showLeafBoundaries: boolean;
  showGrid: boolean;
  showRoutes: boolean;
  showRooms: boolean;
  showDoors: boolean;
  dungeon: Dungeon | null;
}

export const BSPAstarCanvas = (props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (props.dungeon === null) return;

    const { map, doors, routes } = props.dungeon;
    const leaves = props.dungeon.bspTree.getLeaves();

    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, props.mapWidth, props.mapHeight);
    context.fillStyle = "#000";
    context.font = "10px Arial";
    context.textBaseline = "top";

    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (
          (map[y][x] === MapPoint.GRID || map[y][x] === MapPoint.ROAD) &&
          props.showGrid
        ) {
          context.fillStyle = "#008000";
          context.fillRect(x, y, 1, 1);
        }

        if (
          (props.showRooms && map[y][x] === MapPoint.ROOM) ||
          map[y][x] === MapPoint.DOOR
        ) {
          context.fillStyle = "#000";
          context.fillRect(x, y, 1, 1);
        }
      }
    }

    if (props.showRoutes) {
      for (let i = 0; i < routes.length; i++) {
        for (let j = 0; j < routes[i].length; j++) {
          context.fillStyle = "#FF0000";
          context.fillRect(routes[i][j].x, routes[i][j].y, 2, 2);
        }
      }
    }

    if (props.showDoors) {
      for (let i = 0; i < doors.length; i++) {
        context.fillStyle = "#FFF000";

        if (i > 0) {
          context.fillRect(doors[i].inDoor.x - 2, doors[i].inDoor.y - 2, 5, 5);
        }

        if (i < doors.length - 1) {
          context.fillRect(
            doors[i].outDoor.x - 2,
            doors[i].outDoor.y - 2,
            5,
            5
          );
        }
      }
    }

    if (leaves && props.showLeafBoundaries) {
      for (let i = 0; i < leaves.length; i++) {
        const { x, y, width, height } = leaves[i].area;
        context.strokeRect(x, y, width, height);
      }
    }
  }, [
    props.dungeon,
    props.mapHeight,
    props.mapWidth,
    props.showLeafBoundaries,
    props.showGrid,
    props.showRoutes,
    props.showRooms,
    props.showDoors,
  ]);

  return (
    <canvas ref={canvasRef} width={props.mapWidth} height={props.mapHeight} />
  );
};
