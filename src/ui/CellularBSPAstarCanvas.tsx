import React, { useEffect, useRef } from "react";
import { CellularMapPoint } from "../enums/CellularMapPoint";
import "./Canvas.css";

interface Props {
  mapWidth: number;
  mapHeight: number;
  map: CellularMapPoint[][];
}

export const CellularBSPAstarCanvas = (props: Props) => {
  const { mapWidth, mapHeight, map } = props;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const padding = 5;
  const paddedMapWidth = mapWidth + padding * 2;
  const paddedMapHeight = mapHeight + padding * 2;

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (context) {
      context.clearRect(0, 0, paddedMapWidth, paddedMapHeight);
      context.fillStyle = "#000";
      context.fillRect(0, 0, paddedMapWidth, paddedMapHeight);
      context.fillStyle = "#fff";
      for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
          if (map[y][x] !== CellularMapPoint.WALL) {
            context.fillRect(x + padding, y + padding, 1, 1);
          }
        }
      }
    }
  });

  return (
    <canvas ref={canvasRef} width={paddedMapWidth} height={paddedMapHeight} />
  );
};
