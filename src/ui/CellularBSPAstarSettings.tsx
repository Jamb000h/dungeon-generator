import React, { useState } from "react";

interface Props {
  initialize: (
    height: number,
    width: number,
    gridSize: number,
    roomRatio: number
  ) => void;
  iterate: () => void;
}

export const CellularBSPAstarSettings = (props: Props) => {
  const [updatedMapWidth, setUpdatedMapWidth] = useState(1000);
  const [updatedMapHeight, setUpdatedMapHeight] = useState(500);
  const [updatedGridSize, setUpdatedGridSize] = useState(40);
  const [updatedRoomRatio, setUpdatedRoomRatio] = useState(0.5);

  return (
    <div className="settings">
      <label htmlFor="width">
        width
        <input
          id="width"
          value={updatedMapWidth}
          onChange={(e) => setUpdatedMapWidth(parseInt(e.target.value) ?? 0)}
        />
      </label>
      <label htmlFor="height">
        height
        <input
          id="height"
          value={updatedMapHeight}
          onChange={(e) => setUpdatedMapHeight(parseInt(e.target.value) ?? 0)}
        />
      </label>
      <label htmlFor="gridSize">
        gridSize
        <input
          id="gridSize"
          value={updatedGridSize}
          onChange={(e) => setUpdatedGridSize(parseInt(e.target.value) ?? 0)}
        />
      </label>
      <label htmlFor="initialRoomRatio">
        initial room ratio
        <input
          id="initialRoomRatio"
          value={updatedRoomRatio}
          onChange={(e) =>
            setUpdatedRoomRatio(parseFloat(e.target.value) ?? 0.5)
          }
        />
      </label>
      <button
        onClick={() =>
          props.initialize(
            updatedMapHeight,
            updatedMapWidth,
            updatedGridSize,
            updatedRoomRatio
          )
        }
      >
        initialize
      </button>
      <button onClick={() => props.iterate()}>iterate</button>
    </div>
  );
};
