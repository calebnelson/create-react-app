import React, { Component } from 'react';

function Cell(props) {
  return (
    <input
      type="number"
      id={''
        .concat(props.rowNum)
        .concat(', ')
        .concat(props.problemNum)}
      min="0"
      max="1"
      onChange={() =>
        props.onChange(props.studentId, props.rowNum, props.problemNum)}
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

function TableRow(props) {
  const total =
    props.responses &&
    props.responses.reduce((a, b) => {
      if (!a) {
        a = 0;
      }
      if (!b) {
        b = 0;
      }
      return a + b;
    }, 0);

  return (
    <tr>
      <td>{props.firstName}</td>
      <td>{props.lastName}</td>
      <td>{total}</td>
      <td>{''.concat(total * 100 / props.problems.length).concat('%')}</td>
      {props.problems.map(problemData => (
        <td key={props.studentId.concat(problemData.order)}>
          <Cell
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

class GradeTable extends Component {
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
      case '1':
      case '0':
        this.getCell(rowNum, problemNum).value = parseInt(event.key, 10);
        this.props.onChange(studentId, rowNum, problemNum);
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
      default:
        //console.log("".concat(event.key).concat(", ").concat(rowNum).concat(", ").concat(problemNum))
        break;
    }
  };

  getCell = (rowNum, problemNum) => {
    return document.getElementById(
      ''
        .concat(rowNum)
        .concat(', ')
        .concat(problemNum)
    );
  };

  getTotal = () => {
    const total = this.props.submissions.reduce((accumulator, currentValue) => {
      const currentResponseTotal = currentValue.responses.reduce((a, b) => {
        if (!a) {
          a = 0;
        }
        if (!b) {
          b = 0;
        }
        return a + b;
      }, 0);
      return accumulator + currentResponseTotal;
    }, 0);
    return Math.round(
      total * 100 / (this.props.submissions.length * this.props.problems.length)
    );
  };

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th />
              <th />
              <th>Total</th>
              <th>Percent</th>
              {this.props.problems.map(data => (
                <th key={'problemNum'.concat(data.order)}> {data.order} </th>
              ))}
            </tr>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>{this.getTotal() * this.props.problems.length / 100}</th>
              <th>{''.concat(this.getTotal()).concat('%')}</th>
              {this.props.columns.map((data, index) => (
                <th key={'columnNum'.concat(index)}> {data} </th>
              ))}
            </tr>
            {this.props.submissions ? (
              this.props.submissions.map((studentData, index) => (
                <TableRow
                  key={'rowNum'.concat(index)}
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
      </div>
    );
  }
}
export default GradeTable;
