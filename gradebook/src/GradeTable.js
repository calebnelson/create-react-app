import React, { Component } from 'react';

class GradeTable extends Component {
  render() {
    return (
      <div>
        <p>{JSON.stringify(this.props.assignment)}</p>
        <p>{JSON.stringify(this.props.problems)}</p>
        <p>{JSON.stringify(this.props.enrollments)}</p>
      </div>
    );
  }
}
export default GradeTable;
