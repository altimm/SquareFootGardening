// src/components/Tile.js
import React from "react";
import "../App.css";
import { Vegetable } from "../App";

interface TileProps {
  name: string;
  handleClick: () => void;
  vegetables: Vegetable[];
}

const Tile: React.FC<TileProps> = ({ name, handleClick, vegetables }) => {
  const vegetable: Vegetable | undefined = vegetables.find(
    (veg) => veg?.name === name
  );
  const backgroundColor = vegetable ? vegetable.color : "gray";
  const spacing = vegetable ? vegetable.spacing + "x" : "";
  const height = vegetable ? vegetable.height + '"' : "";

  return (
    <div
      onClick={handleClick}
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: backgroundColor,
        margin: "5px",
        display: "flex",
        color: "white",
        textAlign: "center",
        lineHeight: "normal",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>{name}</div>
      <div>{spacing}</div>
      <div>{height}</div>
    </div>
  );
};

export default Tile;
