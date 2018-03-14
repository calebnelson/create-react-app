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
                  responses={studentData.responses}
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
