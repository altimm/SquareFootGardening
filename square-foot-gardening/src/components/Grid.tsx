// src/components/Grid.js
import React from "react";
import Tile from "./Tile.tsx";
import { Vegetable } from "../App";

const Grid = ({
  tiles,
  handleClick,
  vegetables,
}: {
  tiles: (Vegetable | null)[][];
  handleClick: (rowIndex: number, colIndex: number) => void;
  vegetables: Vegetable[];
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: `repeat(${tiles.length}, 100px)`,
        gridTemplateColumns: `repeat(${tiles[0].length}, 100px)`,
        gap: "10px",
      }}
    >
      {tiles.flatMap((row, rowIndex) =>
        row.map((veg, colIndex) => (
          <Tile
            key={`${rowIndex}-${colIndex}`}
            name={veg?.name ?? ""}
            handleClick={() => handleClick(rowIndex, colIndex)}
            vegetables={vegetables}
          />
        ))
      )}
    </div>
  );
};

export default Grid;
