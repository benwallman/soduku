import React, { Component } from "react";

class Cell extends Component {
  state = {
    answer: this.props.answer,
    value: this.props.value
  };
  handleInput = event => {
    const { value } = event.target;
    const { answer } = this.state;
    // eslint-disable-next-line
    if (value == this.state.answer) {
      // this.setState({
      //   value: answer
      // });
      this.props.onChange();
    } else {
      if (value) alert("incorrect option");
      // this.setState({
      //   value: undefined
      // });
    }
  };
  render() {
    return (
      <input
        className="cell"
        type="text"
        value={this.props.value}
        onChange={this.handleInput}
      />
    );
  }
}

export default Cell;
