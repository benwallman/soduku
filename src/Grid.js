import React, { Component } from "react";

import GridSquare from "./GridSquare";
import {
  makeEmptyGrid,
  tryToGenerateGrid,
  answerRandomCell
} from "./generateGrid";

const howManyCorrect = grid =>
  grid.filter(({ answer, value }) => answer == value).length;

const getCellIndex = square => Math.floor(square + 1 / 9);

class Grid extends Component {
  state = {
    ready: false
  };
  componentDidMount() {
    const emptyGrid = makeEmptyGrid();
    try {
      const answerGrid = tryToGenerateGrid(emptyGrid);
      const semiAnsweredGrid = answerGrid.map(answerRandomCell);
      this.setState({
        ready: true,
        grid: semiAnsweredGrid,
        correct: howManyCorrect(semiAnsweredGrid)
      });
    } catch (e) {
      console.log(e);
      alert("Error instantiating grid, please refresh");
    }
  }

  get squares() {
    const squares = [];
    for (let i = 0; i < 9; i++) {
      squares.push(this.getSquareCells(i));
    }
    return squares;
  }

  getSquareCells = index => {
    if (index >= 9) throw new Error();
    const squareCells = this.state.grid.filter(
      ({ square }) => square === index
    );
    return squareCells;
  };

  handleChange = (value, index) => {
    const grid = this.state.grid.slice();
    grid[index].value = value;
    this.setState({
      grid,
      correct: howManyCorrect(grid)
    });
  };

  render() {
    if (!this.state.ready) return "Loading";
    if (this.state.correct === 81) return "Tadaa! 🍾🍾🍾";
    return (
      <>
        <h4>{this.state.correct}/81</h4>
        <div className="grid-container">
          {this.squares.map((square, index) => (
            <GridSquare
              square={square}
              key={index}
              onChange={this.handleChange}
            />
          ))}
        </div>
      </>
    );
  }
}

export default Grid;
