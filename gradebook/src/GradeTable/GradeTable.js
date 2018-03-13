import React, { Component } from 'react';

function Cell(props) {
  return (
    <input
      type="number"
      min="0"
      max="1"
      onInput={props.onInput && props.onInput()}
    />
  );
}

class GradeTable extends Component {
  render() {
    return (
      <div>
        <table>
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
              <tr>
                <td>{studentData.firstName}</td>
                <td>{studentData.lastName}</td>
                <td>
                  {studentData.responses &&
                    studentData.responses.reduce((a, b) => {
                      return a + b;
                    }, 0)}
                </td>
                <td>{'0%'}</td>
                {this.props.problems.map(problemData => (
                  <td>
                    <Cell
                      studentId={studentData.studentId}
                      problemNum={problemData.order}
                      // onInput={this.props.onInput}
                    />
                  </td>
                ))}
              </tr>
            ))
          ) : (
            'No Students'
          )}
        </table>
        <input type="submit" value="Submit" />
      </div>
    );
  }
}
export default GradeTable;
