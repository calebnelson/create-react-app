import React, { Component } from 'react';

function Cell(props) {
  return (
    <input
      type="number"
      id={props.studentId.concat(props.problemNum)}
      min="0"
      max="1"
      onChange={() => props.onChange(props.studentId, props.problemNum)}
    />
  );
}

function TableRow(props) {
  return (
    <tr>
      <td>{props.firstName}</td>
      <td>{props.lastName}</td>
      <td>
        0
        {/* {studentData.responses &&
        studentData.responses.reduce((a, b) => {
          return a + b;
        }, 0)} */}
      </td>
      <td>{'0%'}</td>
      {props.problems.map(problemData => (
        <td>
          <Cell
            studentId={props.studentId}
            problemNum={problemData.order}
            onChange={props.onChange}
          />
        </td>
      ))}
    </tr>
  );
}

class GradeTable extends Component {
  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th />
              <th />
              <th />
              <th />
              {this.props.problems.map(data => <th> {data.order} </th>)}
            </tr>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Total</th>
              <th>Percent</th>
              {this.props.columns.map(data => <th> {data} </th>)}
            </tr>
            {this.props.submissions ? (
              this.props.submissions.map(studentData => (
                <TableRow
                  firstName={studentData.firstName}
                  lastName={studentData.lastName}
                  problems={this.props.problems}
                  studentId={studentData.studentId}
                  onChange={this.props.onChange}
                />
              ))
            ) : (
              'No Students'
            )}
          </tbody>
        </table>
        <input type="submit" value="Submit" />
      </div>
    );
  }
}
export default GradeTable;
