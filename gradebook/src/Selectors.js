import React, { Component } from 'react';
import {query} from './graphql'


const classQuery = `
    query{
        classrooms {
            id
            code
            endDate
        }
    }
`

const lessonQuery = `
    query lessonsFromClass($classID: ID!) {
        classroom(id: $classID) {
            lessons {
                id
                lessonPlan {
                    title
                    order
                }
            }
        }
    }
`
const assignmentQuery = `
    query assignementsFromLesson($lessonID: ID!) {
        lesson(id: $lessonID) {
            assignments {
                id
                problemSet {
                    title
                    order
                }
            }
        }
    }
`

function Classes(props){
    return(
        <select id="classSelector" key="classSelectorField" onChange={props.onChange}>
            <option value="" selected disabled hidden>Select Class</option>
            {props.classes.map((data) => 
                <option value={data.id} key={data.id}>
                    {data ? data.code : "Getting Classes..."}
                </option>)
            }
        </select>
    );
}

function Lessons(props){
    return(
        <select id="lessonSelector" key="lessonSelectorField" onChange={props.onChange}>
            <option value="" selected disabled hidden>Select Lesson</option>
            {props.lessons.map((data) => 
                <option value={data.id} key={data.id}>
                    {data.lessonPlan ? data.lessonPlan.order.toString().concat(". ").concat(data.lessonPlan.title) : 'No Lesson Plan Found'}
                </option>)
            }
        </select>
    );
}

function Assignments(props){
    return(
        <select id="assignmentSelector" key="assignmentSelectorField" onChange={props.onChange}>
            <option value="" selected disabled hidden>Select Assignment</option>
            {props.assignments.map((data) => 
                <option value={data.id} key={data.id}>
                    {data.problemSet ? data.problemSet.order.toString().concat(". ").concat(data.problemSet.title) : 'No Problem Set Found'}
                </option>)
            }
        </select>
    );
}

class Selectors extends Component{
    constructor(props){
        super(props);
        this.state = {
            classes: [],
            lessons: [],
            assignments: [],
            selectedClass: undefined,
            selectedLesson: undefined,
            selectedAssignment: undefined,
        };
        this.runClassQuery();
    }

    async runClassQuery(){
        const res = await query(classQuery);
        const queryRes = await res.json();
        this.setStateAsync({classes: queryRes.data.classrooms});
    }

    async runLessonQuery(classID){
        var variables = "{ \"classID\": \"".concat(classID).concat("\" }");
        const res = await query(lessonQuery, variables);
        const queryRes = await res.json();
        var sortedLessons = queryRes.data.classroom.lessons.sort(function(a, b){
            return a.lessonPlan.order - b.lessonPlan.order;
        });
        this.setStateAsync({lessons: sortedLessons})
    }

    async runAssignmentQuery(lessonID){
        var variables = "{ \"lessonID\": \"".concat(lessonID).concat("\" }");
        const res = await query(assignmentQuery, variables);
        const queryRes = await res.json();
        var sortedAssignments = queryRes.data.lesson.assignments.sort(function(a, b){
            return a.problemSet.order - b.problemSet.order;
        });
        this.setStateAsync({assignments: sortedAssignments})
    }

    setStateAsync(state){
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    onClassChange(newClassEvent){
        var classID = newClassEvent.target.value;
        var index = this.state.classes.findIndex(x => x.id === classID);
        var sc = this.state.classes[index];
        this.setState({
            lessons: [],
            assignments: [],
            selectedClass: sc,
            selectedLesson: undefined,
            selectedAssignment: undefined,
        });
        this.runLessonQuery(sc.id);
    }

    onLessonChange(newLessonEvent){
        var lessonID = newLessonEvent.target.value;
        var index = this.state.lessons.findIndex(x => x.id === lessonID);
        var sl = this.state.lessons[index];
        this.setState({
            assignments: [],
            selectedLesson: sl,
            selectedAssignment: undefined,
        })
        this.runAssignmentQuery(sl.id);
    }

    onAssignmentChange(newAssignmentEvent){
        var assignmentID = newAssignmentEvent.target.value;
        var index = this.state.lessons.findIndex(x => x.id === assignmentID);
        var sa = this.state.assignments[index];
        this.setState({
            selectedLesson: sa
        })
    }

    render() {
        return(
            <div className="classes">
                <Classes key="classSelector"
                    classes={this.state.classes}
                    onChange={i => this.onClassChange(i)}
                />
                <Lessons key="lessonSelector"
                    lessons={this.state.lessons}
                    onChange={i => this.onLessonChange(i)}
                />
                <Assignments key="lessonSelector"
                    assignments={this.state.assignments}
                    onChange={i => this.onAssignmentChange(i)}
                />
            </div>
        );
    }
}

export default Selectors;