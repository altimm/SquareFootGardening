// src/App.tsx
import React, { useState, useEffect } from "react";
import Grid from "./components/Grid.tsx";
import "./App.css";
import generateLayout from "./utils/generateLayout.tsx";
import vegetablesData from "./utils/plants.json";
import PlantDetails from "./components/PlantDetails.tsx";

export type Vegetable = {
  name: string;
  spacing: number;
  sun: string;
  water: string;
  nitrogen: string;
  height: number;
  perennial: boolean;
  ph: string;
  companion_plant: [string];
  enemy_plant: [string];
  color: string;
};

const typedVegetablesData: Vegetable[] = vegetablesData as Vegetable[];

const App = () => {
  const [tiles, setTiles] = useState<(Vegetable | null)[][]>(
    Array.from({ length: 4 }, () => Array(4).fill(null))
  );
  const [rows, setRows] = useState<number>(4);
  const [cols, setCols] = useState<number>(4);
  const [vegetables, setVegetables] = useState<Vegetable[]>([]);
  const [selectedVegetable, setSelectedVegetable] = useState<Vegetable>();

  useEffect(() => {
    setVegetables(typedVegetablesData);
    setSelectedVegetable(typedVegetablesData[0] || {});
  }, []);

  const handleClick = (rowIndex: number, colIndex: number) => {
    const newTiles: (Vegetable | null)[][] = tiles.map((row, rIndex) =>
      row.map((tile, cIndex) => {
        if (rIndex === rowIndex && cIndex === colIndex) {
          return selectedVegetable || null;
        }
        return tile || null;
      })
    );
    setTiles(newTiles);
  };

  const handleRowsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRows = parseInt(event.target.value, 10);
    setRows(newRows);
    setTiles(Array.from({ length: newRows }, () => Array(cols).fill("")));
  };

  const handleColsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCols = parseInt(event.target.value, 10);
    setCols(newCols);
    setTiles(Array.from({ length: rows }, () => Array(newCols).fill("")));
  };

  const handleVegetableChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedVeg: Vegetable | undefined = vegetables.find(
      (veg) => veg.name === event.target.value
    );
    setSelectedVegetable(selectedVeg);
  };

  const getLayoutPlant = (
    existingGrid: (Vegetable | null)[][],
    allVegetables: Vegetable[]
  ) => {
    const layout = generateLayout(existingGrid, allVegetables);
    setTiles(layout);
  };

  return (
    <div className="App">
      <div style={{ marginLeft: "30px", marginRight: "30px" }}>
        <h1>SquareFoot Gardening</h1>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div>
              <label>
                Rows:
                <select value={rows} onChange={handleRowsChange}>
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Columns:
                <select value={cols} onChange={handleColsChange}>
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Vegetable:
                <select
                  value={selectedVegetable?.name || ""}
                  onChange={handleVegetableChange}
                >
                  <option value="">None</option>
                  {vegetables.map((veg) => (
                    <option key={veg.name} value={veg.name}>
                      {veg.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <Grid
                tiles={tiles}
                handleClick={handleClick}
                vegetables={vegetables}
              />
              <button
                onClick={() => {
                  getLayoutPlant(tiles, vegetables);
                }}
              >
                Generate Layout
              </button>
              <button
                onClick={() =>
                  setTiles(
                    Array.from({ length: rows }, () => Array(cols).fill(null))
                  )
                }
              >
                Reset Layout
              </button>
            </div>
          </div>
          <div style={{ marginLeft: "20px", maxWidth: "500px" }}>
            <PlantDetails selectedVegetable={selectedVegetable} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
