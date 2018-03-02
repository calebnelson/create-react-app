import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Selectors from './Selectors'
import GradeTable from './GradeTable'
import {query} from './graphql'

const classQuery = `
    query{
        classrooms {
            id
            code
            startDate
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

class App extends Component {
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
    var sortedClasses = queryRes.data.classrooms.sort(function(a, b){
        return new Date(b.startDate) - new Date(a.startDate);
    });
    this.setStateAsync({classes: sortedClasses});
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
          <GradeTable />
        </div>
      </div>
    );
  }
}

export default App;
