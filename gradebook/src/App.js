import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Selectors from './Selectors'
import GradeTable from './GradeTable'
import {query} from './graphql'

const queryOnRoot = `
    query{
        classrooms {
            id
            code
            startDate
        }
    }
`

const queryOnClass = `
    query queryOnClass($classID: ID!) {
      classroom(id: $classID) {
        enrollments {
          id
          student {
            firstName
            lastName
          }
        }
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

const queryOnLesson = `
    query queryOnLesson($lessonID: ID!) {
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

const queryOnAssignment = `
  query queryOnAssignment($assignmentID: ID!) {
    assignment(id: $assignmentID) {
      problemSet {
        problems {
          order
        }
      }
    }
  }
`

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        classes: [],
        lessons: [],
        assignments: [],
        problems: [],
        enrollments: [],
        selectedClass: undefined,
        selectedLesson: undefined,
        selectedAssignment: undefined,
    };
    this.runQueryOnRoot();
  }

  async runQueryOnRoot(){
    const res = await query(queryOnRoot);
    const queryRes = await res.json();
    var sortedClasses = queryRes.data.classrooms.sort(function(a, b){
        return new Date(b.startDate) - new Date(a.startDate);
    });
    this.setStateAsync({classes: sortedClasses});
  }

  async runQueryOnClass(classID){
    var variables = "{ \"classID\": \"".concat(classID).concat("\" }");
    const res = await query(queryOnClass, variables);
    const queryRes = await res.json();
    var sortedLessons = queryRes.data.classroom.lessons.sort(function(a, b){
      return a.lessonPlan.order - b.lessonPlan.order;
    });
    var sortedEnrollments = queryRes.data.classroom.enrollments.sort(function(a, b){
      return a.student.lastName - b.student.lastName;
    })
    this.setStateAsync({lessons: sortedLessons, enrollments: sortedEnrollments})
  }

  async runQueryOnLesson(lessonID){
    var variables = "{ \"lessonID\": \"".concat(lessonID).concat("\" }");
    const res = await query(queryOnLesson, variables);
    const queryRes = await res.json();
    var sortedAssignments = queryRes.data.lesson.assignments.sort(function(a, b){
        return a.problemSet.order - b.problemSet.order;
    });
    this.setStateAsync({assignments: sortedAssignments})
  }

  async runQueryOnAssignment(assignmentID){
    var variables = "{ \"assignmentID\": \"".concat(assignmentID).concat("\" }");
    const res = await query(queryOnAssignment, variables);
    const queryRes = await res.json();
    var sortedProblems = queryRes.data.assignment.problemSet.problems.sort(function(a, b){
        return a.order - b.order;
    });
    this.setStateAsync({problems: sortedProblems})
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
    this.runQueryOnClass(sc.id);
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
    this.runQueryOnLesson(sl.id);
  }

  onAssignmentChange(newAssignmentEvent){
    var assignmentID = newAssignmentEvent.target.value;
    var index = this.state.assignments.findIndex(x => x.id === assignmentID);
    var sa = this.state.assignments[index];
    this.setState({
        selectedAssignment: sa
    })
    this.runQueryOnAssignment(sa.id);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>          
        </header>
        <div>
          <Selectors 
            classes = {this.state.classes}
            lessons = {this.state.lessons}
            assignments = {this.state.assignments}
            onClassChange = {i => this.onClassChange(i)}
            onLessonChange = {i => this.onLessonChange(i)}
            onAssignmentChange = {i => this.onAssignmentChange(i)}
          />
        </div>
        <div>
          <GradeTable 
            assignment = {this.state.selectedAssignment}
            enrollments = {this.state.enrollments}
            problems = {this.state.problems}
          />
        </div>
      </div>
    );
  }
}

export default App;
