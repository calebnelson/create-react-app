import React, { Component } from 'react';
import { View, Button } from 'react-native-web';
import { Flex } from './Flex';
import { TextCell } from './TextCell';
import { TableColumn } from './TableColumn';

const GradeTableFlex = Flex.extend`
  margin: 1em;
`

const NameFlex = Flex.extend`
  max-width: 8em;
`

const NumFlex = Flex.extend`
  max-width: 4em;
`

class GradeTable extends Component {
  constructor(props) {
    super(props);
    this.inputs = this.createRefs();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  createRefs = () => {
    const list = [];
    for (let i = 0; i < this.props.submissions.length; i++) {
      for (let j = 0; j < this.props.problems.length; j++) {
        list.push(React.createRef());
      }
    }
    return list;
  };

  //Returns a list for the total score on the assignment for each student
  getTotals = () => {
    return this.props.submissions.map(studentData => {
      return studentData.responses.reduce((a, b) => {
        if (!a) {
          a = 0;
        }
        if (!b) {
          b = 0;
        }
        return a + b;
      }, 0);
    });
  };

  //Returns the total score for all students divided by the maximum possible score and rounded to 2 decimal places
  getTotal = () => {
    const total = this.getTotals().reduce((a, b) => {
      if (!a) {
        a = 0;
      }
      if (!b) {
        b = 0;
      }
      return a + b;
    }, 0);
    if (this.props.submissions.length > 0 && this.props.problems.length > 0) {
      return Math.round(
        total *
          100 /
          (this.props.submissions.length * this.props.problems.length)
      );
    }
    return 0;
  };

  handleKeyDown = (event, rowNum, problemNum, studentId) => {
    event.preventDefault();
    const lastRow = this.props.submissions.length - 1;
    const lastProblem = this.props.problems.length - 1;
    const currentCell = rowNum * (lastProblem + 1) + problemNum;

    const moveUp = () => {
      let focusCell;
      if (rowNum > 0) {
        focusCell = currentCell - (lastProblem + 1);
        this.inputs[focusCell].current.focus();
      } else {
        focusCell = lastRow * (lastProblem + 1) + problemNum;
        this.inputs[focusCell].current.focus();
      }
      return focusCell;
    };

    const moveDown = () => {
      let focusCell;
      if (rowNum < lastRow) {
        focusCell = currentCell + (lastProblem + 1);
        this.inputs[focusCell].current.focus();
      } else {
        focusCell = problemNum;
        this.inputs[focusCell].current.focus();
      }
      return focusCell;
    };

    const moveLeft = () => {
      let focusCell;
      if (problemNum > 0 || rowNum > 0) {
        focusCell = currentCell - 1;
        this.inputs[focusCell].current.focus();
      } else {
        focusCell = lastRow * (lastProblem + 1) + lastProblem;
        this.inputs[focusCell].current.focus();
      }
      return focusCell;
    };

    const moveRight = () => {
      let focusCell;
      if (problemNum < lastProblem || rowNum < lastRow) {
        focusCell = currentCell + 1;
        this.inputs[focusCell].current.focus();
      } else {
        focusCell = 0;
        this.inputs[focusCell].current.focus();
      }
      return focusCell;
    };

    switch (event.key) {
      case 'ArrowUp':
      case 'w':
        moveUp();
        break;
      case 'ArrowDown':
      case 's':
        moveDown();
        break;
      case 'ArrowLeft':
      case 'a':
        moveLeft();
        break;
      case 'ArrowRight':
      case 'Enter':
      case 'd':
        moveRight();
        break;
      case '1':
      case '0':
        const nodeValue = parseInt(event.key, 10);
        this.props.onChange(studentId, rowNum, problemNum, nodeValue);
        moveRight();
        break;
      case ' ':
        this.props.onChange(studentId, rowNum, problemNum, null);
        moveRight();
        break;
      case 'Backspace':
        this.props.onChange(studentId, rowNum, problemNum, null);
        moveLeft();
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <View>
        <GradeTableFlex>
          <NameFlex col grow>
            <TextCell left>Students - {this.props.submissions.length}</TextCell>
            <TextCell left altcolor>First Name</TextCell>
            {this.props.submissions ? (
              this.props.submissions.map((studentData, index) => (
                <TextCell left altcolor={index % 2 == 1} key={'firstname'.concat(index)}>
                  {studentData.student.firstName}
                </TextCell>
              ))
            ) : (
              <TextCell>No Students</TextCell>
            )}
          </NameFlex>
          <NameFlex col grow>
            <TextCell></TextCell>
            <TextCell left altcolor>Last Name</TextCell>
            {this.props.submissions ? (
              this.props.submissions.map((studentData, index) => (
                <TextCell left altcolor={index % 2 == 1} key={'lastname'.concat(index)}>
                  {studentData.student.lastName}
                </TextCell>
              ))
            ) : (
              <TextCell>No Students</TextCell>
            )}
          </NameFlex>
          <NumFlex col grow>
            <TextCell>Total</TextCell>
            <TextCell altcolor>
              {this.getTotal() * (this.props.problems.length || 0) / 100}
            </TextCell>
            {this.getTotals().map((total, index) => (
              <TextCell altcolor={index % 2 == 1} key={'total'.concat(index)}>{total}</TextCell>
            ))}
          </NumFlex>
          <NumFlex col grow>
            <TextCell>Percent</TextCell>
            <TextCell altcolor>{''.concat(this.getTotal()).concat('%')}</TextCell>
            {this.getTotals().map((total, index) => (
              <TextCell altcolor={index % 2 == 1} key={'percent'.concat(index)}>
                {''
                  .concat(total * 100 / this.props.problems.length)
                  .concat('%')}
              </TextCell>
            ))}
          </NumFlex>
          {this.props.problems ? (
            this.props.problems.map((problemData, index) => (
              <TableColumn
                key={'columnNum'.concat(index)}
                problem={this.props.problems[index]}
                columnTotal={this.props.columns[index]}
                submissions={this.props.submissions}
                onChange={this.props.onChange}
                handleKeyDown={this.handleKeyDown}
                inputs={this.inputs}
              />
            ))
          ) : (
            'No Students'
          )}
        </GradeTableFlex>
        <Button id="submitButton" onPress={() => this.props.submit(this.props.assignment, this.props.problems, this.props.submissions)} title="Submit" color="#B1B695" />
        <Button id="revertButton" onPress={() => this.props.revert(this.props.assignment)} title="Revert Changes" color='#C05746'/>
        <Button id="resetButton" onPress={() => this.props.reset()} title="Reset Application" color='#4B3B47'/>
      </View>
    );
  }
}
export default GradeTable;
