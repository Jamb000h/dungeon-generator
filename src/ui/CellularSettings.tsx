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
      <label htmlFor="initialIterations">
        initial iterations to run
        <input
          id="initialIterations"
          value={initialIterations}
          onChange={(e) => setInitialIterations(parseInt(e.target.value) ?? 5)}
        />
      </label>
      <label htmlFor="initialRoomRatio">
        initial room ratio
        <input
          id="initialRoomRatio"
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
