function generateSudoku(level) {
  // Helper function to shuffle an array
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Helper function to check if a number can be placed at a given position
  function isSafe(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
      if (
        board[row][x] === num ||
        board[x][col] === num ||
        board[3 * Math.floor(row / 3) + Math.floor(x / 3)][
          3 * Math.floor(col / 3) + (x % 3)
        ] === num
      ) {
        return false;
      }
    }
    return true;
  }

  // Helper function to solve the Sudoku board using backtracking
  function solveSudoku(board) {
    let emptySpot = findEmptySpot(board);
    if (!emptySpot) return true;
    let [row, col] = emptySpot;

    for (let num = 1; num <= 9; num++) {
      if (isSafe(board, row, col, num)) {
        board[row][col] = num;
        if (solveSudoku(board)) {
          return true;
        }
        board[row][col] = 0;
      }
    }
    return false;
  }

  // Helper function to find an empty spot on the board
  function findEmptySpot(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return null;
  }

  // Generate a fully solved Sudoku board
  function generateFullBoard() {
    let board = Array.from({ length: 9 }, () => Array(9).fill(0));

    // Randomly initialize the first row
    let firstRow = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    board[0] = firstRow;

    solveSudoku(board);
    return board;
  }

  // Check if the board has a unique solution
  function hasUniqueSolution(board) {
    let solutions = 0;

    function solveAndCount(board) {
      let emptySpot = findEmptySpot(board);
      if (!emptySpot) {
        solutions++;
        return solutions === 1;
      }
      let [row, col] = emptySpot;

      for (let num = 1; num <= 9; num++) {
        if (isSafe(board, row, col, num)) {
          board[row][col] = num;
          if (!solveAndCount(board)) {
            board[row][col] = 0;
            return false;
          }
          board[row][col] = 0;
        }
      }
      return solutions === 1;
    }

    solveAndCount(board);
    return solutions === 1;
  }

  // Remove numbers from the board to create a puzzle
  function createPuzzle(board, level) {
    let attempts = level; // The higher the level, the more attempts to remove numbers
    while (attempts > 0) {
      let row = Math.floor(Math.random() * 9);
      let col = Math.floor(Math.random() * 9);
      while (board[row][col] === 0) {
        row = Math.floor(Math.random() * 9);
        col = Math.floor(Math.random() * 9);
      }
      let backup = board[row][col];
      board[row][col] = 0;

      if (!hasUniqueSolution(board)) {
        board[row][col] = backup;
        attempts--;
      }
    }
    return board;
  }

  // Solve a given Sudoku puzzle
  function solveSudokuPuzzle(board) {
    solveSudoku(board);
    return board;
  }

  // Generate a Sudoku puzzle
  let fullBoard = generateFullBoard();
  let puzzleBoard = createPuzzle(fullBoard, level); // Adjust the level for difficulty
  return {
    puzzle: puzzleBoard,
    solve: function () {
      return solveSudokuPuzzle(puzzleBoard.map((row) => row.slice()));
    },
  };
}

export default generateSudoku;
