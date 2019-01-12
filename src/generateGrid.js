const assignSquare = (column, row) => {
  let square = 0;
  square += Math.floor(row / 3);
  square += 3 * Math.floor(column / 3);
  return square;
};

export const makeEmptyGrid = () => {
  let grid = [];
  let index = 0;
  for (let column = 0; column < 9; column++) {
    grid[column] = [];
    for (let row = 0; row < 9; row++) {
      grid[column][row] = {
        value: undefined,
        answer: undefined,
        column: column,
        row: row,
        index,
        square: assignSquare(column, row)
      };
      index += 1;
    }
  }
  return grid;
};

const possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const getRandomValueFromArray = arr =>
  arr[Math.floor(Math.random() * arr.length)];

const getAllColumnValues = (index, grid) => {
  const columns = grid.filter(({ column }) => column === index);
  const filledColumns = columns.filter(({ column }) => column === index);
  const columnValues = filledColumns.filter(({ answer }) => answer);
  return columnValues;
};

const getAllRowValues = (index, grid) => {
  const rows = grid.filter(({ row }) => row === index);
  const filledRows = rows.filter(({ row }) => row === index);
  const rowValues = filledRows.filter(({ answer }) => answer);
  return rowValues;
};

const getAllSquareValues = (index, grid) => {
  const squares = grid.filter(({ square }) => square === index);
  const filledSquares = squares.filter(({ square }) => square === index);
  const squareValues = filledSquares.filter(({ answer }) => answer);
  return squareValues;
};

const getUniqueValuesFromArray = (value, index, self) =>
  self.indexOf(value) === index;

const generateCellOption = (row, square, column, grid) => {
  let options = possibleNumbers.slice(0);

  let usedValues = [
    getAllColumnValues(column, grid),
    getAllRowValues(row, grid),
    getAllSquareValues(square, grid)
  ]
    .flat()
    .map(({ answer }) => answer)
    .filter(getUniqueValuesFromArray);

  const possibleOptions = options.filter(val => !usedValues.includes(val));

  if (!possibleOptions.length) {
    throw new Error("Whoops, please try again");
  }

  const randomValue = getRandomValueFromArray(possibleOptions);

  return randomValue;
};

const containsNoAnswer = obj => !obj.answer;

const flattenTwoDArray = twoDArray => twoDArray.flat();

const attemptToFillOnePieceOfTheGrid = grid => {
  const newGrid = [...grid];
  const firstUnansweredCell = newGrid.findIndex(containsNoAnswer);
  const { column, square, row } = newGrid[firstUnansweredCell];
  try {
    const answer = generateCellOption(row, square, column, newGrid);
    newGrid[firstUnansweredCell].answer = answer;
  } catch (e) {
    throw e;
  }
  return newGrid;
};

export const fillGrid = emptyGrid => {
  let grid = flattenTwoDArray(emptyGrid);
  let progress = 0;
  let attempts = 0;

  let maxAttempts = 400;

  while (!grid[grid.length - 1].answer && attempts <= maxAttempts) {
    attempts += 1;
    try {
      grid = attemptToFillOnePieceOfTheGrid(grid);
      progress += 1;
    } catch (e) {
      // if err, backtrack
      progress -= 3;
      grid = grid.map((cell, index) => {
        const newCell = { ...cell };
        if (index >= progress) {
          newCell.answer = undefined;
        }
        return newCell;
      });
    }
  }
  if (attempts >= maxAttempts) throw Error("failed to instantiate grid");
  return grid;
};

export const tryToGenerateGrid = (emptyGrid, maxAttempts = 20) => {
  let success = false;
  let attempts = 0;
  let grid;
  while (attempts <= maxAttempts && !success) {
    attempts += 1;
    try {
      grid = fillGrid(emptyGrid);
      success = true;
    } catch (e) {
      // Do nothing with error 🙃
    }
  }
  if (attempts >= maxAttempts && !success) {
    throw Error("too many attempts, please refresh");
  }
  return grid;
};

export const answerRandomCell = cell => {
  if (Math.random() > 0.5) {
    return cell;
  }
  const newCell = { ...cell };
  newCell.value = newCell.answer;
  return newCell;
};
