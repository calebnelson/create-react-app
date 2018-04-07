import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { View, Text } from 'react-native-web';

import SelectorsContainer from './Selectors/SelectorsContainer';
import GradeTableContainer from './GradeTable/GradeTableContainer';

class App extends Component {
  render() {
    return (
      <View>
        <Text>Ardent Academy Gradebook App</Text>
        <SelectorsContainer />
        {(this.props.class === null || this.props.lesson === null || this.props.assignment === null)
          ? <Text>Choose Class, Lesson and Assignment</Text>
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
