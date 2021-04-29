import React, { useEffect, useRef } from "react";
import "./Canvas.css";

interface Props {
  mapWidth: number;
  mapHeight: number;
}

export const CellularCanvas = (props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, props.mapWidth, props.mapHeight);
  }, [props.mapWidth, props.mapHeight]);

  return (
    <canvas ref={canvasRef} width={props.mapWidth} height={props.mapHeight} />
  );
};
