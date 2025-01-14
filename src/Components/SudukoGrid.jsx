import React, { useRef, useState } from "react";

const SudukoGrid = () => {
  const Grid = Array.from({ length: 9 }, () => Array(9).fill(""));

  const [grid, setGrid] = useState(Grid);
  const inputRefs = useRef([]);
  const [beforeSolve, setBeforeSolve] = useState([]);

  //   Grid?.map((row, rowInd) =>
  //     row.map((col, colInd) => console.log(Grid[rowInd][colInd]))
  //   );

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

  function solveSudoku(grid) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === "" || isNaN(grid[row][col])) {
          for (let value = 1; value <= 9; value++) {
            if (isValid(grid, row, col, value)) {
              grid[row][col] = value;

              if (solveSudoku(grid)) return true;
              grid[row][col] = "";
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  const handleInputChange = (row, col, event, value) => {
    const newGrid = grid.map((r) => [...r]);

    if (event.key === " " || value === " ") {
      const currentIndex = row * 9 + col;
      const nextIndex = currentIndex + 1;

      newGrid[row][col] = "";
      setGrid(newGrid);

      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }
    } else if (/^[1-9]$/.test(value) && value.length === 1) {
      newGrid[row][col] = parseInt(value);
      setGrid(newGrid);
     setBeforeSolve(newGrid);
      const currentIndex = row * 9 + col;
      const nextIndex = currentIndex + 1;

      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }
    }
  };
  const handleKeyDown = (row, col, event, value) => {
    if (event.key == "Backspace" && grid[row][col] !== "") {
      const newGrid = grid.map((r) => [...r]);
      newGrid[row][col] = "";
      setGrid(newGrid);
      
    //   const currentIndex = row * 9 + col;
    //   const prevIndex = currentIndex - 1;

    //   if (inputRefs.current[prevIndex]) {
    //     inputRefs.current[prevIndex].focus();
    //   }
    }
    if (event.key == "Backspace" && grid[row][col] === "") {
      const currentIndex = row * 9 + col;
      const prevIndex = currentIndex - 1;

      if (inputRefs.current[prevIndex]) {
        inputRefs.current[prevIndex].focus();
      }
    }
  };

  const handleSolve = () => {
    console.log("SolveSuduko called");

    // console.log(grid);
    const newGrid = grid.map((row) => row.slice());
    setBeforeSolve(grid.map((row) => [...row]));

    // console.log("Before Solve:", beforeSolve);


    if (solveSudoku(newGrid)) {
      setGrid(newGrid);

    //   setTimeout(()=>{
    //     console.log("After Solve:", grid);
    //   },1000)
    //   console.log("After Solve:", grid);
    } else {
      alert("No solution exists for the given input.");
    }
  };

  const handleReset = () => {
    setGrid(Array.from({ length: 9 }, () => Array(9).fill("")));
  };

  return (
    <div className="flex justify-center flex-col items-center w-full h-screen">
      <div className="text-[50px] font-bold">Suduko Solver</div>

      <div className="grid grid-cols-9 border-[3px] border-black">
        {grid.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              ref={(el) => (inputRefs.current[rowIndex * 9 + colIndex] = el)}
              value={value}
              onKeyDown={(e) => handleKeyDown(rowIndex, colIndex, e, e.key)}
              onChange={(e) =>
                handleInputChange(rowIndex, colIndex, e, e.target.value)
              }
              className={`
    ${
      beforeSolve.length > 0 &&
      beforeSolve[rowIndex][colIndex] !== grid[rowIndex][colIndex] && grid[rowIndex][colIndex] !== ""
        ? "text-blue-700"
        : "text-black"
    } 
    ${colIndex === 2 || colIndex === 5 ? "border-r-[3px] border-r-black" : ""} 
    ${rowIndex === 2 || rowIndex === 5 ? "border-b-[3px] border-b-black" : ""} 
    h-[40px] border text-[30px] font-bold text-center border-red-500 w-[40px]`}
            />
          ))
        )}
      </div>

      <div className="flex mt-6 gap-5">
        <button
          className="p-1 bg-gray-400 rounded-md px-5 "
          onClick={handleSolve}
        >
          Solve
        </button>
        <button
          className="p-1 bg-gray-400 rounded-md px-5 "
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SudukoGrid;
