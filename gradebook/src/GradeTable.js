import React, { Component } from 'react';

class GradeTable extends Component{
    render() {
        console.log(this.props.assignment);
        console.log(this.props.problems);
        console.log(this.props.enrollments);
        return(
            <div>
                <p>{JSON.stringify(this.props.assignment)}</p>
                <p>{JSON.stringify(this.props.problems)}</p>
                <p>{JSON.stringify(this.props.enrollments)}</p>
            </div>
        );
    }
}
export default GradeTable