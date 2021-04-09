import React, { useEffect, useRef } from "react";
import "./Canvas.css";
import { Room } from "./utils/BSP/BSP";
import { BSPNode } from "./utils/BSP/BSPTree";
import { Point } from "./utils/pathfinding/aStar";

interface Props {
  mapWidth: number;
  mapHeight: number;
  minArea: number;
  showLeafBoundaries: boolean;
  routes: Point[][];
  leaves?: BSPNode[];
  doors?: Point[][];
  graph: boolean[][];
}

const Canvas = (props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawRoom = (
    room: Room,
    context: CanvasRenderingContext2D,
    enumerate = true,
    index?: number
  ) => {
    const { x, y, width, height } = room;
    context.fillRect(x, y, width, height);
    if (enumerate && index !== undefined) {
      context.fillText(index.toString(), x + 2, y + 2);
      context.fillText("x:" + x + ", y:" + y, x + 2, y + 15);
      context.fillText("w:" + width + ", h:" + height, x + 2, y + 30);
    }
  };

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, props.mapWidth, props.mapHeight);
    context.fillStyle = "#000";
    context.font = "10px Arial";
    context.textBaseline = "top";
    if (props.leaves) {
      props.leaves?.forEach((node, i) => {
        const room = node.getRoom();
        if (room) {
          drawRoom(room, context, false, i);
          if (props.showLeafBoundaries) {
            const { x, y, width, height } = node.position;
            context.strokeRect(x, y, width, height);
          }
        }
      });
    }

    for (let i = 0; i < props.routes.length; i++) {
      for (let j = 0; j < props.routes[i].length; j++) {
        context.fillStyle = "#FF0000";
        context.fillRect(props.routes[i][j].x, props.routes[i][j].y, 2, 2);
      }
    }

    if (props.doors) {
      for (let i = 0; i < props.doors.length; i++) {
        context.fillStyle = "#FFF000";
        context.fillRect(props.doors[i][0].x, props.doors[i][0].y, 2, 4);
        context.fillRect(props.doors[i][1].x - 1, props.doors[i][1].y, 2, 4);
      }
    }
  }, [
    props.leaves,
    props.mapHeight,
    props.mapWidth,
    props.showLeafBoundaries,
    props.routes,
    props.doors,
    props.graph,
  ]);

  return (
    <canvas ref={canvasRef} width={props.mapWidth} height={props.mapHeight} />
  );
};

export default Canvas;
