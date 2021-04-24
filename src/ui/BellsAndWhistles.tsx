import React, { useState } from "react";

interface Props {
  generate: (width: number, height: number, gridSize: number) => void;
  setShowLeafBoundaries: (value: boolean) => void;
  setShowGrid: (value: boolean) => void;
  setShowRoutes: (value: boolean) => void;
  setShowRooms: (value: boolean) => void;
  setShowDoors: (value: boolean) => void;
  showLeafBoundaries: boolean;
  showGrid: boolean;
  showRoutes: boolean;
  showRooms: boolean;
  showDoors: boolean;
}

export const BellsAndWhistles = (props: Props) => {
  const [updatedMapWidth, setUpdatedMapWidth] = useState(1000);
  const [updatedMapHeight, setUpdatedMapHeight] = useState(500);
  const [updatedGridSize, setUpdatedGridSize] = useState(40);

  return (
    <div className="settings">
      <label htmlFor="width">
        width
        <input
          id="width"
          value={updatedMapWidth}
          onChange={(e) => setUpdatedMapWidth(parseInt(e.target.value) || 0)}
        />
      </label>
      <label htmlFor="height">
        height
        <input
          id="height"
          value={updatedMapHeight}
          onChange={(e) => setUpdatedMapHeight(parseInt(e.target.value) || 0)}
        />
      </label>
      <label htmlFor="gridSize">
        gridSize
        <input
          id="gridSize"
          value={updatedGridSize}
          onChange={(e) => setUpdatedGridSize(parseInt(e.target.value) || 0)}
        />
      </label>
      <label htmlFor="showLeafBoundaries">
        show leaf boundaries
        <input
          type="checkbox"
          id="showLeafBoundaries"
          checked={props.showLeafBoundaries}
          onChange={(e) => props.setShowLeafBoundaries(e.target.checked)}
        />
      </label>
      <label htmlFor="showGrid">
        show grid
        <input
          type="checkbox"
          id="showGrid"
          checked={props.showGrid}
          onChange={(e) => props.setShowGrid(e.target.checked)}
        />
      </label>
      <label htmlFor="showRoutes">
        show routes
        <input
          type="checkbox"
          id="showRoutes"
          checked={props.showRoutes}
          onChange={(e) => props.setShowRoutes(e.target.checked)}
        />
      </label>
      <label htmlFor="showRooms">
        show rooms
        <input
          type="checkbox"
          id="showRooms"
          checked={props.showRooms}
          onChange={(e) => props.setShowRooms(e.target.checked)}
        />
      </label>
      <label htmlFor="showDoors">
        show doors
        <input
          type="checkbox"
          id="showDoors"
          checked={props.showDoors}
          onChange={(e) => props.setShowDoors(e.target.checked)}
        />
      </label>
      <input
        type="button"
        onClick={() =>
          props.generate(updatedMapWidth, updatedMapHeight, updatedGridSize)
        }
        value="Generate"
      />
    </div>
  );
};
