import React, { Component } from 'react';

class GradeTable extends Component {
  render() {
    return (
      <div>
        <form>
          <table>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Total</th>
              <th>Percent</th>
              {this.props.problems.map(data => <th> {data.order} </th>)}
            </tr>
            {this.props.enrollments ? (
              this.props.enrollments.map(data => (
                <tr>
                  <td>{data.student.firstName}</td>
                  <td>{data.student.lastName}</td>
                  <td>0</td>
                  <td>0%</td>
                  {this.props.problems.map(data => (
                    <td>
                      <input type="text" />
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              'No Students'
            )}
          </table>
        </form>
      </div>
    );
  }
}
export default GradeTable;
