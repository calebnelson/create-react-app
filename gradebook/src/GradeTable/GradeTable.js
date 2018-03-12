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
            {this.props.problems.map(data => <th> {data.order} </th>)}
          </tr>
          {this.props.enrollments ? (
            this.props.enrollments.map(studentData => (
              <tr>
                <td>{studentData.student.firstName}</td>
                <td>{studentData.student.lastName}</td>
                <td>0</td>
                <td>0%</td>
                {this.props.problems.map(problemData => (
                  <td>
                    <form
                      name={studentData.student.lastName.concat(
                        problemData.order.toString()
                      )}
                    >
                      <input
                        type="number"
                        min="0"
                        max="1"
                        name={studentData.student.lastName.concat(
                          problemData.order.toString()
                        )}
                      />
                    </form>
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
