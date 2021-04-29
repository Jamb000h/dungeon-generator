import React, { useState } from "react";

export const CellularSettings = () => {
  const [updatedMapWidth, setUpdatedMapWidth] = useState(1000);
  const [updatedMapHeight, setUpdatedMapHeight] = useState(500);

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
    </div>
  );
};
