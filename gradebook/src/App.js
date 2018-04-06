import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { View } from 'react-native-web';

import SelectorsContainer from './Selectors/SelectorsContainer';
import GradeTableContainer from './GradeTable/GradeTableContainer';

class App extends Component {
  render() {
    return (
      <View>
        <h1>Ardent Academy Gradebook App</h1>
        <SelectorsContainer />
        <br />
        {(this.props.class === null || this.props.lesson === null || this.props.assignment === null)
          ? <h4>Choose Class, Lesson and Assignment</h4>
          : <GradeTableContainer />}
      </View>
    );
  }
}

//export default App;
export default connect(state => ({
  class: state.selectedClassReducer.selectedClass || null,
  lesson: state.selectedLessonReducer.selectedLesson || null,
  assignment: state.selectedAssignmentReducer.selectedAssignment || null,
}))(App);
