import React, { Component } from 'react';
import { InputCell, InputCellTop, InputCellLeft, InputCellTopLeft } from './InputCell';

class Cell extends Component {
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
      this.props.problemNum,
      this.props.studentId
    );
  };

  render() {
    const col = this.props.problemNum;
    const row = this.props.rowNum;
    if (col !== 1 && row !== 0){
      return (
        <InputCell
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
        <InputCellTop
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
        <InputCellLeft
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
        <InputCellTopLeft
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
export default Cell;
