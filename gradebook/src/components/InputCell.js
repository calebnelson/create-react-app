import React, { Component } from 'react';
import { GridCell, GridCellTop, GridCellLeft, GridCellTopLeft } from './GridCells';

class InputCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue || '',
    };
  }

  keyPress = event => {
    switch (event.key) {
      case '1':
      case '0':
        this.setState({
          value: event.key,
        });
        break;
      case ' ':
      case 'Backspace':
        this.setState({
          value: '',
        });
        break;

      default:
        break;
    }
    this.props.handleKeyDown(
      event,
      this.props.rowNum,
      (this.props.problemNum - 1), //this is because handleKeyDown expects problemNums to start at 0, while they currently start at 1
      this.props.studentId
    );
  };

  render() {
    const col = this.props.problemNum;
    const row = this.props.rowNum;
    if (col !== 1 && row !== 0){
      return (
        <GridCell
          value={this.state.value}
          keyboardType="default"
          maxLength={1}
          innerRef={this.props.inputRef}
          onKeyPress={event => this.keyPress(event)}
        />
      );
    }
    if (col !== 1 && row === 0){
      return (
        <GridCellTop
          value={this.state.value}
          keyboardType="default"
          maxLength={1}
          innerRef={this.props.inputRef}
          onKeyPress={event => this.keyPress(event)}
        />
      );
    }
    if (col === 1 && row !== 0){
      return (
        <GridCellLeft
          value={this.state.value}
          keyboardType="default"
          maxLength={1}
          innerRef={this.props.inputRef}
          onKeyPress={event => this.keyPress(event)}
        />
      );
    }
    if (col === 1 && row === 0){
      return (
        <GridCellTopLeft
          value={this.state.value}
          keyboardType="default"
          maxLength={1}
          innerRef={this.props.inputRef}
          onKeyPress={event => this.keyPress(event)}
        />
      );
    }
  }
}
export default InputCell;
