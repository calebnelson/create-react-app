import React, { Component } from 'react';
import { View } from 'react-native-web';

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

/*
This component represents one row in the grade table referring to one student's assignment
The props it expects are:
- total: the student's total score on the assignment
- responses: the student's score on each individual assignment
- firstName, lastName, studentId: student's first name, last name, and ID
- problems: the JSON object that stores the problems, mapped over to create the Cells
- rowNum: self-explanatory
- onChange, handleKeyDown: passed to cells
*/
function TableRow(props) {
  return (
    <tr>
      <td>{props.firstName}</td>
      <td>{props.lastName}</td>
      <td>{props.total}</td>
      <td>
        {''.concat(props.total * 100 / props.problems.length).concat('%')}
      </td>
      {props.problems.map((problemData, index) => (
        <td key={props.studentId.concat(problemData.order)}>
          <Cell
            defaultValue={props.responses[index]}
            problemNum={problemData.order}
            rowNum={props.rowNum}
            studentId={props.studentId}
            onChange={props.onChange}
            handleKeyDown={props.handleKeyDown}
          />
        </td>
      ))}
    </tr>
  );
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
    const lastProblem = this.props.problems.length;
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
        if (problemNum > 1) {
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
            this.getCell(rowNum + 1, 1).focus();
          } else {
            this.getCell(0, 1).focus();
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
          this.getCell(rowNum + 1, 1).focus();
        } else {
          this.getCell(0, 1).focus();
        }
        break;
      case ' ':
        this.getCell(rowNum, problemNum).value = null;
        this.props.onChange(studentId, rowNum, problemNum, null);
        if (problemNum < lastProblem) {
          this.getCell(rowNum, problemNum + 1).focus();
        } else if (rowNum < lastRow) {
          this.getCell(rowNum + 1, 1).focus();
        } else {
          this.getCell(0, 1).focus();
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
        <table>
          <tbody>
            <tr>
              <th>Num Students: </th>
              <th>{this.props.submissions.length}</th>
              <th>Total</th>
              <th>Percent</th>
              {this.props.problems.map(data => (
                <th key={'problemNum'.concat(data.order)}> {data.order} </th>
              ))}
            </tr>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>{this.getTotal() * (this.props.problems.length || 0) / 100}</th>
              <th>{''.concat(this.getTotal()).concat('%')}</th>
              {this.props.columns.map((data, index) => (
                <th key={'columnNum'.concat(index)}> {data} </th>
              ))}
            </tr>
            {this.props.submissions ? (
              this.props.submissions.map((studentData, index) => (
                <TableRow
                  key={'rowNum'.concat(index)}
                  total={this.getTotals()[index]}
                  responses={studentData.responses}
                  firstName={studentData.firstName}
                  lastName={studentData.lastName}
                  problems={this.props.problems}
                  rowNum={index}
                  studentId={studentData.studentId}
                  onChange={this.props.onChange}
                  handleKeyDown={this.handleKeyDown}
                />
              ))
            ) : (
              'No Students'
            )}
          </tbody>
        </table>
        <button type="button" id="submitButton" onClick={this.props.submit}>
          Submit
        </button>
      </View>
    );
  }
}
export default GradeTable;
