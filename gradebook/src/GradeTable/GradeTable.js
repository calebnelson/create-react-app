import React, { Component } from 'react';

class GradeTable extends Component {
  render() {
    return (
      <div>
        <table>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Total</th>
            <th>Percent</th>
          </tr>
          {this.props.enrollments ? (
            this.props.enrollments.map(data => (
              <tr>
                <td>{data.student.firstName}</td>
                <td>{data.student.lastName}</td>
                <td>0</td>
                <td>0%</td>
              </tr>
            ))
          ) : (
            'No Students'
          )}
        </table>
        <p>{JSON.stringify(this.props.assignment)}</p>
        <p>{JSON.stringify(this.props.problems)}</p>
        <p>{JSON.stringify(this.props.enrollments)}</p>
      </div>
    );
  }
}
export default GradeTable;
