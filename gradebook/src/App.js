import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';

import SelectorsContainer from './Selectors/SelectorsContainer';
import GradeTableContainer from './GradeTable/GradeTableContainer';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Ardent Academy Gradebook App</h1>
        <div>
          <SelectorsContainer />
          <br />
          {(this.props.class === null || this.props.lesson === null || this.props.assignment === null)
            ? <h4>Choose Class, Lesson and Assignment</h4>
            : <GradeTableContainer />}
        </div>
      </div>
    );
  }
}

//export default App;
export default connect(state => ({
  class: state.selectedClassReducer.selectedClass || null,
  lesson: state.selectedLessonReducer.selectedLesson || null,
  assignment: state.selectedAssignmentReducer.selectedAssignment || null,
}))(App);
