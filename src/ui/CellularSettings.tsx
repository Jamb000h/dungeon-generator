import React, { useEffect, useState } from "react";

interface Props {
  initialRoomRatio: number;
  turnToRoomThreshold: number;
  turnToWallThreshold: number;
  setInitialRoomRatio: (ratio: number) => void;
  setTurnToRoomThreshold: (ratio: number) => void;
  setTurnToWallThreshold: (ratio: number) => void;
  initialize: (height: number, width: number) => void;
  iterate: () => void;
}

export const CellularSettings = (props: Props) => {
  const {
    initialRoomRatio,
    turnToRoomThreshold,
    turnToWallThreshold,
    setInitialRoomRatio,
    setTurnToRoomThreshold,
    setTurnToWallThreshold,
    initialize,
    iterate,
  } = props;
  const [updatedMapWidth, setUpdatedMapWidth] = useState(1000);
  const [updatedMapHeight, setUpdatedMapHeight] = useState(500);

  useEffect(() => {
    props.initialize(updatedMapHeight, updatedMapWidth);
  }, []);

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
      <label htmlFor="initialRoomRatio">
        initial room ratio
        <input
          id="initialRoomRatio"
          value={initialRoomRatio}
          onChange={(e) =>
            setInitialRoomRatio(parseFloat(e.target.value) || 0.5)
          }
        />
      </label>
      <label htmlFor="turnToRoomThreshold">
        turn to room threshold
        <input
          id="turnToRoomThreshold"
          value={turnToRoomThreshold}
          onChange={(e) =>
            setTurnToRoomThreshold(parseInt(e.target.value) || 5)
          }
        />
      </label>
      <label htmlFor="turnToWallThreshold">
        turn to wall threshold
        <input
          id="turnToWallThreshold"
          value={turnToWallThreshold}
          onChange={(e) =>
            setTurnToWallThreshold(parseInt(e.target.value) || 5)
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
