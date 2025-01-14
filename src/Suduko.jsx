import React, { useState } from "react";

const SudokuSolver = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(""))
  );

  const isValid = (grid, row, col, num) => {
    for (let x = 0; x < 9; x++) {
      if (grid[row][x] == num || grid[x][col] == num) return false;
    }
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i + startRow][j + startCol] == num) return false;
      }
    }
    return true;
  };

  const solveSudoku = (grid) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === "") {
          for (let num = 1; num <= 9; num++) {
            if (isValid(grid, row, col, num)) {
              grid[row][col] = num;
              if (solveSudoku(grid)) return true;
              grid[row][col] = "";
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const handleInputChange = (row, col, value) => {
    const newGrid = [...grid];
    if (value === "" || (/^[1-9]$/.test(value) && value.length === 1)) {
      newGrid[row][col] = value ? parseInt(value) : "";
      setGrid(newGrid);
    }
  };

  const handleSolve = () => {
    const newGrid = grid.map((row) => row.slice());
    if (solveSudoku(newGrid)) {
      setGrid(newGrid);
    } else {
      alert("No solution exists for the given input.");
    }
  };

  const handleReset = () => {
    setGrid(Array.from({ length: 9 }, () => Array(9).fill("")));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Sudoku Solver</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 40px)",
          gap: "px",
          justifyContent: "center",
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              value={value}
              onChange={(e) =>
                handleInputChange(rowIndex, colIndex, e.target.value)
              }
              maxLength="1"
              style={{
                width: "40px",
                height: "40px",
                textAlign: "center",
                fontSize: "18px",
                color:"black",
                border: "1px solid #000",
                backgroundColor:
                  (Math.floor(rowIndex / 3) + Math.floor(colIndex / 3)) % 2 ===
                  0
                    ? "#f0f0f0"
                    : "#fff",
              }}
            />
          ))
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleSolve} style={{ marginRight: "10px" }}>
          Solve
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default SudokuSolver;