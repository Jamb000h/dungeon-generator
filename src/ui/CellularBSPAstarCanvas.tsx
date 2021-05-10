import React, { useEffect, useRef } from "react";
import { CellularMapPoint } from "../other/Cellular";
import "./Canvas.css";

interface Props {
  mapWidth: number;
  mapHeight: number;
  map: CellularMapPoint[][];
}

export const CellularBSPAstarCanvas = (props: Props) => {
  const { mapWidth, mapHeight, map } = props;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (context) {
      context.clearRect(0, 0, props.mapWidth, props.mapHeight);
      context.fillStyle = "#000";
      context.fillRect(0, 0, mapWidth, mapHeight);
      context.fillStyle = "#fff";
      for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
          if (map[y][x] !== CellularMapPoint.WALL) {
            context.fillRect(x, y, 1, 1);
          }
        }
      }
    }
  });

  return <canvas ref={canvasRef} width={mapWidth} height={mapHeight} />;
};
