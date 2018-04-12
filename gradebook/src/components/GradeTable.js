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
function Cell(props) {
  return (
    <input
      type="number"
      value={props.defaultValue || undefined}
      id={''
        .concat(props.rowNum)
        .concat(', ')
        .concat(props.problemNum)}
      min="0"
      max="1"
      onKeyDown={event =>
        props.handleKeyDown(
          event,
          props.rowNum,
          props.problemNum,
          props.studentId
        )}
    />
  );
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
          rowNum={index}
          studentId={submissionData.studentId}
          onChange={props.onChange}
          handleKeyDown={props.handleKeyDown}
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
    switch (event.key) {
      case 'ArrowUp':
      case 'w':
        if (rowNum > 0) {
          this.getCell(rowNum - 1, problemNum).focus();
        } else {
          this.getCell(lastRow, problemNum).focus();
        }
        break;
      case 'ArrowDown':
      case 's':
        if (rowNum < lastRow) {
          this.getCell(rowNum + 1, problemNum).focus();
        } else {
          this.getCell(0, problemNum).focus();
        }
        break;
      case 'ArrowLeft':
      case 'a':
        if (problemNum > 0) {
          this.getCell(rowNum, problemNum - 1).focus();
        } else if (rowNum > 0) {
          this.getCell(rowNum - 1, lastProblem).focus();
        } else {
          this.getCell(lastRow, lastProblem).focus();
        }
        break;
      case 'ArrowRight':
      case 'Enter':
      case 'Tab':
      case 'd':
          if (problemNum < lastProblem) {
            this.getCell(rowNum, problemNum + 1).focus();
          } else if (rowNum < lastRow) {
            this.getCell(rowNum + 1, 0).focus();
          } else {
            this.getCell(0, 0).focus();
          }
          break;
      case '1':
      case '0':
        const nodeValue = parseInt(event.key, 10);
        this.getCell(rowNum, problemNum).value = nodeValue;
        this.props.onChange(studentId, rowNum, problemNum, nodeValue);
        if (problemNum < lastProblem) {
          this.getCell(rowNum, problemNum + 1).focus();
        } else if (rowNum < lastRow) {
          this.getCell(rowNum + 1, 0).focus();
        } else {
          this.getCell(0, 0).focus();
        }
        break;
      case ' ':
        this.getCell(rowNum, problemNum).value = null;
        this.props.onChange(studentId, rowNum, problemNum, null);
        if (problemNum < lastProblem) {
          this.getCell(rowNum, problemNum + 1).focus();
        } else if (rowNum < lastRow) {
          this.getCell(rowNum + 1, 0).focus();
        } else {
          this.getCell(0, 0).focus();
        }
        break;
      case 'Backspace':
        this.getCell(rowNum, problemNum).value = null;
        this.props.onChange(studentId, rowNum, problemNum, null);
        if (problemNum < lastProblem) {
          this.getCell(rowNum, problemNum + 1).focus();
        } else if (rowNum < lastRow) {
          this.getCell(rowNum + 1, 0).focus();
        } else {
          this.getCell(0, 0).focus();
        }
        if (problemNum > 0) {
          this.getCell(rowNum, problemNum - 1).focus();
        } else if (rowNum > 0) {
          this.getCell(rowNum - 1, lastProblem).focus();
        } else {
          this.getCell(lastRow, lastProblem).focus();
        }
        break;
      default:
        //console.log("".concat(event.key).concat(", ").concat(rowNum).concat(", ").concat(problemNum))
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
