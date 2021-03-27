import React, { useState, useEffect } from "react";
import Canvas from "./Canvas";
import BSP, { generateRooms } from "./utils/BSP/BSP";
import BSPTree from "./utils/BSP/BSPTree";

function App() {
  const [bspTree, setBSPTree] = useState<BSPTree | null>(null);
  const [mapWidth, setMapWidth] = useState(1600);
  const [mapHeight, setMapHeight] = useState(900);
  const [minArea, setMinArea] = useState(1000);
  const [padding, setPadding] = useState(10);
  const [updatedMapWidth, setUpdatedMapWidth] = useState(1600);
  const [updatedMapHeight, setUpdatedMapHeight] = useState(900);
  const [updatedMinArea, setUpdatedMinArea] = useState(1000);

  const generate = () => {
    setMapWidth(updatedMapWidth);
    setMapHeight(updatedMapHeight);
    setMinArea(updatedMinArea);
    const paddedMinArea = (updatedMinArea + padding * 2) * (padding * 2 + 1);
    const bspTree = BSP(mapWidth, mapHeight, { minArea: paddedMinArea });
    setBSPTree(bspTree);

    // Generate rooms from the bspTree leaf nodes and store in state
    generateRooms(bspTree.getLeaves(), updatedMinArea, padding);
  };

  useEffect(() => {
    // When loading UI, if there's no BSP Tree
    // Generate one and store it in state
    generate();
  }, []);

  return (
    <div className="app">
      <div>
        <label htmlFor="width">
          width
          <input
            id="width"
            value={updatedMapWidth}
            onChange={(e) => setUpdatedMapWidth(parseInt(e.target.value))}
          />
        </label>
        <label htmlFor="height">
          height
          <input
            id="height"
            value={updatedMapHeight}
            onChange={(e) => setUpdatedMapHeight(parseInt(e.target.value))}
          />
        </label>
        <label htmlFor="minArea">
          minArea
          <input
            id="minArea"
            value={updatedMinArea}
            onChange={(e) => setUpdatedMinArea(parseInt(e.target.value))}
          />
        </label>
        <label htmlFor="padding">
          padding
          <input
            id="padding"
            value={padding}
            onChange={(e) => setPadding(parseInt(e.target.value))}
          />
        </label>
        <input type="button" onClick={() => generate()} value="Generate" />
      </div>
      <Canvas
        mapWidth={mapWidth}
        mapHeight={mapHeight}
        minArea={minArea}
        leaves={bspTree?.getLeaves()}
      />
    </div>
  );
}

export default App;
