import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { View, Text } from 'react-native-web';

import SelectorsContainer from './containers/SelectorsContainer';
import GradeTableContainer from './containers/GradeTableContainer';

class App extends Component {
  render() {
    return (
      <View>
        <SelectorsContainer />
        {this.props.needsClass ||
        this.props.needsLesson ||
        this.props.needsAssignment ? (
          <Text>Choose Class, Lesson and Assignment</Text>
        ) : (
          <GradeTableContainer />
        )}
      </View>
    );
  }
}

//export default App;
export default connect(state => ({
  needsClass: !state.selectedClassReducer.selectedClass,
  needsLesson: !state.selectedLessonReducer.selectedLesson,
  needsAssignment: !state.selectedAssignmentReducer.selectedAssignment,
}))(App);
