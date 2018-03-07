import React, { Component } from 'react';

function Classes(props){
    return(
        <select id="classSelector" key="classSelectorField" onChange={props.onChange}>
            <option value="" selected disabled hidden>Select Class</option>
            <option value="" >Select Class?</option>
            {props.classes ? props.classes.map((data) => 
                <option value={data.id} key={data.id}>
                    {data ? data.code : "Getting Classes..."}
                </option>) : 'No Classes'
            }
        </select>
    );
}

function Lessons(props){
    return(
        <select id="lessonSelector" key="lessonSelectorField" onChange={props.onChange}>
            <option value="" selected disabled hidden>Select Lesson</option>
            {props.lessons ? props.lessons.map((data) => 
                <option value={data.id} key={data.id}>
                    {data.lessonPlan ? data.lessonPlan.order.toString().concat(". ").concat(data.lessonPlan.title) : 'No Lesson Plan Found'}
                </option>) : 'No Lessons'
            }
        </select>
    );
}

function Assignments(props){
    return(
        <select id="assignmentSelector" key="assignmentSelectorField" onChange={props.onChange}>
            <option value="" selected disabled hidden>Select Assignment</option>
            {props.assignments ? props.assignments.map((data) => 
                <option value={data.id} key={data.id}>
                    {data.problemSet ? data.problemSet.order.toString().concat(". ").concat(data.problemSet.title) : 'No Problem Set Found'}
                </option>) : 'No Assignments'
            }
        </select>
    );
}



class Selectors extends Component{    
    render() {
        if (this.props.onLoad){
            this.props.onLoad();
        }

        return(
            <div className="selectors">
                <Classes key="classSelector"
                    classes={this.props.classes}
                    onChange={this.props.onClassChange}
                />
                <Lessons key="lessonSelector"
                    lessons={this.props.lessons}
                    onChange={this.props.onLessonChange}
                />
                <Assignments key="assignmentSelector"
                    assignments={this.props.assignments}
                    onChange={this.props.onAssignmentChange}
                />
            </div>
        );
    }
}

export default Selectors;