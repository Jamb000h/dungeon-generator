import React, { useEffect, useRef } from "react";
import { CellularMapPoint } from "../other/CellularAutomaton";
import "./Canvas.css";

interface Props {
  mapWidth: number;
  mapHeight: number;
  map: CellularMapPoint[][];
}

export const CellularCanvas = (props: Props) => {
  const { mapWidth, mapHeight, map } = props;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    context?.resetTransform();
    context?.scale(2, 2);
  }, [props.mapHeight, props.mapWidth]);

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    context?.clearRect(0, 0, props.mapWidth, props.mapHeight);
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === CellularMapPoint.ROOM) {
          if (context) {
            context.fillStyle = "#000";
            context.fillRect(x, y, 1, 1);
          }
        }
      }
    }
  });

  return <canvas ref={canvasRef} width={mapWidth} height={mapHeight} />;
};
