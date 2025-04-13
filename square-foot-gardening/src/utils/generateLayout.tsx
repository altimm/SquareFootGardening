import { Vegetable } from "../App";

function scorePosition(
  vegetable: Vegetable,
  row: number,
  col: number,
  grid: (Vegetable | null)[][]
) {
  let score = 0;
  const rows = grid.length;
  const cols = grid[0].length;
  const existingVegetables = Array.from(
    new Set(grid.flat().filter((veg) => veg !== null))
  );
  for (let r = Math.max(0, row - 1); r < Math.min(rows, row + 2); r++) {
    for (let c = Math.max(0, col - 1); c < Math.min(cols, col + 2); c++) {
      const neighbor = grid[r][c];
      if (neighbor !== null) {
        const isDiagonal = r !== row && c !== col;

        if (vegetable.companion_plant.includes(neighbor.name)) {
          score += isDiagonal ? 1 : 2;
        }
        if (neighbor.companion_plant.includes(vegetable.name)) {
          score += isDiagonal ? 2 : 3;
        }
        if (vegetable.enemy_plant.includes(neighbor.name)) {
          score -= isDiagonal ? 3 : 6;
        }
        if (vegetable.name === neighbor.name) {
          score += isDiagonal ? 0 : 1;
        }
      }
    }
  }

  if (existingVegetables.includes(vegetable)) {
    score -= 1;
  }

  if (vegetable.height > 24 && row === 0) {
    //back row
    score += 2;
  } else if (vegetable.height <= 12 && row + 1 === rows) {
    //front row
    score += 2;
  } else if (
    vegetable.height > 12 &&
    vegetable.height <= 24 &&
    row >= 1 &&
    row < rows - 1
  ) {
    //middle row
    score += 1;
  }

  return score;
}

function generateLayout(
  existing_grid: (Vegetable | null)[][],
  all_vegetables: Vegetable[]
) {
  const rows = existing_grid.length;
  const cols = existing_grid[0].length;
  const newGrid = existing_grid.map((row) => [...row]);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (newGrid[i][j] === null) {
        let bestVegetable: Vegetable | null = null;
        let bestScore = -Infinity;

        const shuffledVegetables = all_vegetables.sort(
          () => Math.random() - 0.5
        );
        for (const vegetable of shuffledVegetables) {
          const score = scorePosition(vegetable, i, j, newGrid);
          if (score > bestScore) {
            bestScore = score;
            bestVegetable = vegetable;
          }
        }

        newGrid[i][j] = bestVegetable;
      }
    }
  }

  return newGrid;
}

export default generateLayout;
