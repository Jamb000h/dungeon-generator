import React, { useState } from "react";

interface Props {
  initialize: (
    height: number,
    width: number,
    gridSize: number,
    roomRatio: number
  ) => void;
  iterate: () => void;
  cleanup: () => void;
}

export const CellularBSPAstarSettings = (props: Props) => {
  const [updatedMapWidth, setUpdatedMapWidth] = useState(500);
  const [updatedMapHeight, setUpdatedMapHeight] = useState(500);
  const [updatedGridSize, setUpdatedGridSize] = useState(35);
  const [updatedRoomRatio, setUpdatedRoomRatio] = useState(0.5);
  const [initialized, setInitialized] = useState(false);
  const [cleaned, setCleaned] = useState(false);

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
        onClick={() => {
          setInitialized(true);
          setCleaned(false);
          props.initialize(
            updatedMapHeight,
            updatedMapWidth,
            updatedGridSize,
            updatedRoomRatio
          );
        }}
      >
        initialize
      </button>
      {initialized && !cleaned && (
        <>
          <button onClick={() => props.iterate()}>iterate</button>
          <button
            onClick={() => {
              props.cleanup();
              setCleaned(true);
            }}
          >
            cleanup
          </button>
        </>
      )}
    </div>
  );
};
