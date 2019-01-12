import React from "react";
import ReactDOM from "react-dom";

import Grid from "./Grid";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Soduku</h1>
      <h2>(Attempt)</h2>
      <Grid />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
