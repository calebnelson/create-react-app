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
                  {this.props.problems.map(problemData => (
                    <td>
                      <input
                        type="number"
                        min="0"
                        max="1"
                        name={data.student.lastName.concat(
                          problemData.order.toString()
                        )}
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
        </form>
      </div>
    );
  }
}
export default GradeTable;
