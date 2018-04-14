import React, { Component } from 'react';
import { View, Text, Button } from 'react-native-web';
import { Flex } from './Flex'
import { TextCell } from './TextCell'
import { InputCell } from './InputCell'

/*
This component represents one cell in the grade table referring to one students score on one problem
The props it expects are:
- defaultValue: 1, 0, or null, the intial value the field will have that comes from the submission that already exists in the API
- problemNum: the problem number this cell refers to
- rowNum: the TableRow (and therefore the student) the cell refers to
- studentId: the ID of the student the cell refers to, only used to pass into the onChange function
- onChange: the function that dispatches the action to the redux store once the value is changed, called when the value of the cell changes directly
- handleKeyDown: the function that handles key presses, defined in GradeTable
*/
class Cell extends React.Component{
  constructor(props) {
    super(props);

  }

  render() {
    const numInput = (this.props.rowNum * this.props.numProblems) + this.props.problemNum
    return (
      <InputCell
        placeholder={numInput.toString()}
        value={this.props.defaultValue || undefined}
        keyboardType='numeric'
        maxLength={1}
        innerRef={this.props.inputRef}
        onKeyPress={event =>
          this.props.handleKeyDown(
            event,
            this.props.rowNum,
            this.props.problemNum,
            this.props.studentId
          )}
      />
    );
  }
}

function TableColumn(props){
  return (
    <Flex col>
      <TextCell>{props.problemNum+1}</TextCell>
      <TextCell>{props.columnTotal}</TextCell>
      {props.submissions.map((submissionData, index) => (
        <Cell
          key={''
            .concat(index)
            .concat(', ')
            .concat(props.problemNum)}
          defaultValue={submissionData.responses[props.problemNum]}
          problemNum={props.problemNum}
          numProblems={submissionData.responses.length}
          rowNum={index}
          studentId={submissionData.studentId}
          onChange={props.onChange}
          handleKeyDown={props.handleKeyDown}
          inputRef={props.inputs[(index * submissionData.responses.length) + props.problemNum]}
        />
      ))}
    </Flex>
  )
}

/*
This component refers to the entire GradeTable itself -
since it is the highest level component in the file, most of the state handling happens here.
The props it expects are:
- assignment: the currently selected assignment
- problems: the set of problems in the assignment
- submissions: the JSON object that stores all the students and their responses to the problems
- columns: a list that holds the sum of the results on each individual problem for easy analysis
- onChange: the function that propogates every response change to the redux store
- submit: the function that submits the assignment
*/
class GradeTable extends Component {
  constructor(props){
    super(props);
    this.inputs = this.createRefs();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  createRefs = () => {
    const list = [];
    for (let i = 0; i < this.props.submissions.length; i++){
      for (let j = 0; j < this.props.problems.length; j++){
        list.push(React.createRef());
      }
    }
    return list;
  }

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
    if (this.props.submissions.length > 0 && this.props.problems.length > 0){
      return Math.round(
        total * 100 / (this.props.submissions.length * this.props.problems.length)
      );
    }
    return 0;
  };

  //handles navigation through the gradeTable with the arrow keys or WASD
  //passed to the individual cells and called there
  handleKeyDown = (event, rowNum, problemNum, studentId) => {
    event.preventDefault();
    const lastRow = this.props.submissions.length - 1;
    const lastProblem = this.props.problems.length - 1;
    const currentCell = (rowNum * (lastProblem+1)) + problemNum;

    const moveUp = () => {
      if (rowNum > 0) {
        const focusCell = currentCell - (lastProblem+1);
        this.inputs[focusCell].current.focus();
      } else {
        const focusCell = (lastRow * (lastProblem+1)) + problemNum;
        this.inputs[focusCell].current.focus();
      }
    }

    const moveDown = () => {
      if (rowNum < lastRow) {
        const focusCell = currentCell + (lastProblem+1);
        this.inputs[focusCell].current.focus();
      } else {
        const focusCell = problemNum;
        this.inputs[focusCell].current.focus();
      }
    }

    const moveLeft = () => {
      if (problemNum > 0 || rowNum > 0) {
        const focusCell = currentCell - 1;
        this.inputs[focusCell].current.focus();
      } else {
        const focusCell = (lastRow * (lastProblem+1)) + lastProblem;
        this.inputs[focusCell].current.focus();
      }
    }

    const moveRight = () => {
      if (problemNum < lastProblem || rowNum < lastRow) {
        const focusCell = currentCell + 1;
        this.inputs[focusCell].current.focus();
      } else {
        const focusCell = 0;
        this.inputs[focusCell].current.focus();
      }
    }

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
      case 'Tab':
      case 'd':
        moveRight();
        break;
      case '1':
      case '0':
        const nodeValue = parseInt(event.key, 10);
        // this.getCell(rowNum, problemNum).value = nodeValue;
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

  //Returns the cell component at (rowNum, problemNum)
  getCell = (rowNum, problemNum) => {
    return document.getElementById(
      ''
        .concat(rowNum)
        .concat(', ')
        .concat(problemNum)
    );
  };

  render() {
    return (
      <View>
        <Flex>
          <Flex col>
            <TextCell># Students</TextCell>
            <TextCell>First Name</TextCell>
            {this.props.submissions ? (
              this.props.submissions.map((studentData, index) => (
                <TextCell key={"firstname".concat(index)}>{studentData.firstName}</TextCell>
              ))
            ) : (
              <TextCell>No Students</TextCell>
            )}
          </Flex>
          <Flex col>
            <TextCell>{this.props.submissions.length}</TextCell>
            <TextCell>Last Name</TextCell>
            {this.props.submissions ? (
              this.props.submissions.map((studentData, index) => (
                <TextCell key={"lastname".concat(index)}>{studentData.lastName}</TextCell>
              ))
            ) : (
              <TextCell>No Students</TextCell>
            )}
          </Flex>
          <Flex col>
            <TextCell>Total</TextCell>
            <TextCell>{this.getTotal() * (this.props.problems.length || 0) / 100}</TextCell>
            {this.getTotals().map((total, index) => (
              <TextCell key={"total".concat(index)}>{total}</TextCell>
            ))}
          </Flex>
          <Flex col>
            <TextCell>Percent</TextCell>
            <TextCell>{this.getTotal() * (this.props.problems.length || 0) / 100}</TextCell>
            {this.getTotals().map((total, index) => (
              <TextCell key={'percent'.concat(index)}>{''.concat(total * 100 / this.props.problems.length).concat('%')}</TextCell>
            ))}
          </Flex>
          {this.props.problems ? (
            this.props.problems.map((problemData, index) => (
              <TableColumn
                key={'columnNum'.concat(index)}
                problemNum={index}
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
        </Flex>
        <Button id="submitButton" onPress={this.props.submit} title="Submit" />
      </View>
    )
  }
}
export default GradeTable;
