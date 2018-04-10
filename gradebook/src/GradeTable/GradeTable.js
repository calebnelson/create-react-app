import React, { Component } from 'react';
import { View, Text, Button } from 'react-native-web';

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
    <View style={{flex: 1, flexDirection: 'row', alignContent: 'center'}}>
      <Text>{props.firstName}</Text>
      <Text>{props.lastName}</Text>
      <Text>{props.total}</Text>
      <Text>{''.concat(props.total * 100 / props.problems.length).concat('%')}</Text>
      {props.problems.map((problemData, index) => (
        <Cell
          defaultValue={props.responses[index]}
          problemNum={problemData.order}
          rowNum={props.rowNum}
          studentId={props.studentId}
          onChange={props.onChange}
          handleKeyDown={props.handleKeyDown}
        />
      ))}
    </View>
  );
}

function TableColumn(props){
  return (
    <View style={{flex: 1, flexDirection: 'column', alignContent: 'center'}}>
      <Text>{props.problemNum+1}</Text>
      <Text>{props.columnTotal}</Text>
      {props.submissions.map((submissionData, index) => (
        <Cell
          defaultValue={submissionData.responses[props.problemNum]}
          problemNum={props.problemNum}
          rowNum={index}
          studentId={submissionData.studentId}
          onChange={props.onChange}
          handleKeyDown={props.handleKeyDown}
        />
      ))}
    </View>
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
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Text>Num Students:</Text>
            <Text>First Name</Text>
            {this.props.submissions ? (
              this.props.submissions.map((studentData, index) => (
                <Text>{studentData.firstName}</Text>
              ))
            ) : (
              <Text>No Students</Text>
            )}
          </View>
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Text>{this.props.submissions.length}</Text>
            <Text>Last Name</Text>
            {this.props.submissions ? (
              this.props.submissions.map((studentData, index) => (
                <Text>{studentData.lastName}</Text>
              ))
            ) : (
              <Text>No Students</Text>
            )}
          </View>
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Text>Total</Text>
            <Text>{this.getTotal() * (this.props.problems.length || 0) / 100}</Text>
            {this.getTotals().map((total, index) => (
              <Text>{total}</Text>
            ))}
          </View>
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Text>Percent</Text>
            <Text>{this.getTotal() * (this.props.problems.length || 0) / 100}</Text>
            {this.getTotals().map((total, index) => (
              <Text>{''.concat(total * 100 / this.props.problems.length).concat('%')}</Text>
            ))}
          </View>
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
        </View>
        <Button id="submitButton" onPress={this.props.submit} title="Submit" />
      </View>
    )
  }

  // render() {
  //   return (
  //     <View>
  //       <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
  //         <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
  //           <Text>Num Students: </Text>
  //           <Text>{this.props.submissions.length}</Text>
  //           <Text>Total</Text>
  //           <Text>Percent</Text>
  //           {this.props.problems.map(data => (
  //             <Text>{data.order}</Text>
  //           ))}
  //         </View>
  //         <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
  //           <Text>First Name</Text>
  //           <Text>Last Name</Text>
  //           <Text>{this.getTotal() * (this.props.problems.length || 0) / 100}</Text>
  //           <Text>{''.concat(this.getTotal()).concat('%')}</Text>
  //           {this.props.columns.map((data, index) => (
  //             <Text>{data}</Text>
  //           ))}
  //         </View>
  //         {this.props.submissions ? (
  //           this.props.submissions.map((studentData, index) => (
  //             <TableRow
  //               key={'rowNum'.concat(index)}
  //               total={this.getTotals()[index]}
  //               responses={studentData.responses}
  //               firstName={studentData.firstName}
  //               lastName={studentData.lastName}
  //               problems={this.props.problems}
  //               rowNum={index}
  //               studentId={studentData.studentId}
  //               onChange={this.props.onChange}
  //               handleKeyDown={this.handleKeyDown}
  //             />
  //           ))
  //         ) : (
  //           'No Students'
  //         )}
  //       </View>
  //       <Button id="submitButton" onPress={this.props.submit} title="Submit" />
  //     </View>
  //   );
  // }
}
export default GradeTable;
