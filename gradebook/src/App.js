import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Selectors from './Selectors';
import SelectorsContainer from './SelectorsContainer';
import GradeTable from './GradeTable';

import { query } from './graphql';

const queryOnRoot = `
    query{
        classrooms {
            id
            code
            startDate
        }
    }
`;

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
`;

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
`;

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
`;

class App extends Component {
  constructor(props) {
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

  async runQueryOnRoot() {
    const queryRes = await query(queryOnRoot);
    const sortedClasses = queryRes.data.classrooms.sort(function(a, b) {
      return new Date(b.startDate) - new Date(a.startDate);
    });
    this.setState({ classes: sortedClasses });
  }

  async runQueryOnClass(classID) {
    const variables = '{ "classID": "'.concat(classID).concat('" }');
    const queryRes = await query(queryOnClass, variables);
    const sortedLessons = queryRes.data.classroom.lessons.sort(function(a, b) {
      return a.lessonPlan.order - b.lessonPlan.order;
    });
    const sortedEnrollments = queryRes.data.classroom.enrollments.sort(function(
      a,
      b
    ) {
      return a.student.lastName - b.student.lastName;
    });
    this.setState({ lessons: sortedLessons, enrollments: sortedEnrollments });
  }

  async runQueryOnLesson(lessonID) {
    const variables = '{ "lessonID": "'.concat(lessonID).concat('" }');
    const queryRes = await query(queryOnLesson, variables);
    const sortedAssignments = queryRes.data.lesson.assignments.sort(function(
      a,
      b
    ) {
      return a.problemSet.order - b.problemSet.order;
    });
    this.setState({ assignments: sortedAssignments });
  }

  async runQueryOnAssignment(assignmentID) {
    const variables = '{ "assignmentID": "'.concat(assignmentID).concat('" }');
    const queryRes = await query(queryOnAssignment, variables);
    const sortedProblems = queryRes.data.assignment.problemSet.problems.sort(
      function(a, b) {
        return a.order - b.order;
      }
    );
    this.setState({ problems: sortedProblems });
  }

  onClassChange(newClassEvent) {
    const classID = newClassEvent.target.value;
    const index = this.state.classes.findIndex(x => x.id === classID);
    const sc = this.state.classes[index];
    this.setState({
      lessons: [],
      assignments: [],
      selectedClass: sc,
      selectedLesson: undefined,
      selectedAssignment: undefined,
    });
    this.runQueryOnClass(sc.id);
  }

  onLessonChange(newLessonEvent) {
    const lessonID = newLessonEvent.target.value;
    const index = this.state.lessons.findIndex(x => x.id === lessonID);
    const sl = this.state.lessons[index];
    this.setState({
      assignments: [],
      selectedLesson: sl,
      selectedAssignment: undefined,
    });
    this.runQueryOnLesson(sl.id);
  }

  onAssignmentChange(newAssignmentEvent) {
    const assignmentID = newAssignmentEvent.target.value;
    const index = this.state.assignments.findIndex(x => x.id === assignmentID);
    const sa = this.state.assignments[index];
    this.setState({
      selectedAssignment: sa,
    });
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
          {/* <Selectors
            classes={this.state.classes}
            lessons={this.state.lessons}
            assignments={this.state.assignments}
            onClassChange={i => this.onClassChange(i)}
            onLessonChange={i => this.onLessonChange(i)}
            onAssignmentChange={i => this.onAssignmentChange(i)}
          /> */}
          <SelectorsContainer />
          <GradeTable
            assignment={this.state.selectedAssignment}
            enrollments={this.state.enrollments}
            problems={this.state.problems}
          />
        </div>
      </div>
    );
  }
}

export default App;
