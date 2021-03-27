import React, { useEffect, useRef } from "react";
import "./Canvas.css";
import { Room } from "./utils/BSP/BSP";
import { BSPNode } from "./utils/BSP/BSPTree";

interface Props {
  mapWidth: number;
  mapHeight: number;
  minArea: number;
  leaves?: BSPNode[];
}

const Canvas = (props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawRoom = (
    room: Room,
    context: CanvasRenderingContext2D,
    enumerate = false,
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
    context.font = "10px Arial";
    context.textBaseline = "top";
    if (props.leaves) {
      props.leaves?.forEach((node, i) => {
        const room = node.getRoom();
        if (room) {
          drawRoom(room, context, false, i);
          const { x, y, width, height } = node.position;
          context.strokeRect(x, y, width, height);
        }
      });
    }
  }, [props.leaves, props.mapHeight, props.mapWidth]);

  return (
    <canvas
      ref={canvasRef}
      width={props.mapWidth + 5}
      height={props.mapHeight + 5}
    />
  );
};

export default Canvas;
