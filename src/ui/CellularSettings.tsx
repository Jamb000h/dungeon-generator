import React, { useState } from "react";

interface Props {
  initialRoomRatio: number;
  turnToRoomThreshold: number;
  turnToWallThreshold: number;
  initialIterations: number;
  setInitialRoomRatio: (ratio: number) => void;
  setTurnToRoomThreshold: (threshold: number) => void;
  setTurnToWallThreshold: (threshold: number) => void;
  setInitialIterations: (iterations: number) => void;
  initialize: (height: number, width: number) => void;
  iterate: () => void;
}

export const CellularSettings = (props: Props) => {
  const {
    initialRoomRatio,
    turnToRoomThreshold,
    turnToWallThreshold,
    initialIterations,
    setInitialRoomRatio,
    setTurnToRoomThreshold,
    setTurnToWallThreshold,
    setInitialIterations,
    initialize,
    iterate,
  } = props;
  const [updatedMapWidth, setUpdatedMapWidth] = useState(1000);
  const [updatedMapHeight, setUpdatedMapHeight] = useState(500);

  return (
    <div className="settings">
      <label htmlFor="width">
        width
        <input
          id="width"
          type="number"
          step="1"
          value={updatedMapWidth}
          onChange={(e) => setUpdatedMapWidth(parseInt(e.target.value) ?? 0)}
        />
      </label>
      <label htmlFor="height">
        height
        <input
          id="height"
          type="number"
          step="1"
          value={updatedMapHeight}
          onChange={(e) => setUpdatedMapHeight(parseInt(e.target.value) ?? 0)}
        />
      </label>
      <label htmlFor="initialIterations">
        initial iterations to run
        <input
          id="initialIterations"
          type="number"
          step="1"
          value={initialIterations}
          onChange={(e) => setInitialIterations(parseInt(e.target.value) ?? 5)}
        />
      </label>
      <label htmlFor="initialRoomRatio">
        initial room ratio
        <input
          id="initialRoomRatio"
          type="number"
          min="0"
          max="1"
          step="0.05"
          value={initialRoomRatio}
          onChange={(e) =>
            setInitialRoomRatio(parseFloat(e.target.value) ?? 0.5)
          }
        />
      </label>
      <label htmlFor="turnToRoomThreshold">
        turn to room threshold
        <input
          id="turnToRoomThreshold"
          type="number"
          step="1"
          min="0"
          max="8"
          value={turnToRoomThreshold}
          onChange={(e) =>
            setTurnToRoomThreshold(parseInt(e.target.value) ?? 5)
          }
        />
      </label>
      <label htmlFor="turnToWallThreshold">
        turn to wall threshold
        <input
          id="turnToWallThreshold"
          type="number"
          step="1"
          min="0"
          max="8"
          value={turnToWallThreshold}
          onChange={(e) =>
            setTurnToWallThreshold(parseInt(e.target.value) ?? 5)
          }
        />
      </label>
      <button onClick={() => initialize(updatedMapHeight, updatedMapWidth)}>
        initialize
      </button>
      <button onClick={() => iterate()}>iterate</button>
    </div>
  );
};
