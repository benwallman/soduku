import React from "react";
import Cell from "./Cell";

const GridSquare = ({ square, onChange }) => (
  <div className="grid-square">
    {square.map(({ column, row, index, value, answer }) => (
      <Cell
        key={`${column}-${row}`}
        value={value}
        answer={answer}
        onChange={() => onChange(answer, index)}
      />
    ))}
  </div>
);

export default GridSquare;
