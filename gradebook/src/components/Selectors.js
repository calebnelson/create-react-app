import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native-web';
import { Flex } from './Flex';

function Classes(props) {
  return (
    <Picker
      onValueChange={(itemValue, itemPosition) => props.onChange(itemValue)}
    >
      <Picker.Item
        value="Select Classroom"
        key="Select Classroom"
        label="Select Classroom"
      />
      {props.classes ? (
        props.classes.map(data => (
          <Picker.Item
            value={data.id}
            key={data.id}
            label={data ? data.code : 'Getting Classes...'}
          />
        ))
      ) : (
        'No Classes'
      )}
    </Picker>
  );
}

function Lessons(props) {
  return (
    <Picker
      onValueChange={(itemValue, itemPosition) => props.onChange(itemValue)}
    >
      <Picker.Item
        value="Select Lesson"
        key="Select Lesson"
        label="Select Lesson"
      />
      {props.lessons ? (
        props.lessons.map(data => (
          <Picker.Item
            value={data.id}
            key={data.id}
            label={
              data.lessonPlan ? (
                data.lessonPlan.order
                  .toString()
                  .concat('. ')
                  .concat(data.lessonPlan.title)
              ) : (
                'No Lesson Plan Found'
              )
            }
          />
        ))
      ) : (
        'No Lessons'
      )}
    </Picker>
  );
}

function Assignments(props) {
  return (
    <Picker
      onValueChange={(itemValue, itemPosition) => props.onChange(itemValue)}
    >
      <Picker.Item
        value="Select Assignment"
        key="Select Assignment"
        label="Select Assignment"
      />
      {props.assignments ? (
        props.assignments.map(data => (
          <Picker.Item
            value={data.id}
            key={data.id}
            label={
              data.problemSet ? (
                data.problemSet.order
                  .toString()
                  .concat('. ')
                  .concat(data.problemSet.title)
              ) : (
                'No Problem Set Found'
              )
            }
          />
        ))
      ) : (
        'No Assignments'
      )}
    </Picker>
  );
}

class Selectors extends Component {
  componentDidMount() {
    this.props.onLoad && this.props.onLoad();
  }

  render() {
    return (
      <Flex col>
        <Text>Classroom: </Text>
        <Classes
          key="classSelector"
          classes={this.props.classes}
          onChange={this.props.onClassChange}
        />
        <Text>Lesson: </Text>
        <Lessons
          key="lessonSelector"
          lessons={this.props.lessons}
          onChange={this.props.onLessonChange}
        />
        <Text>Assignment: </Text>
        <Assignments
          key="assignmentSelector"
          assignments={this.props.assignments}
          onChange={this.props.onAssignmentChange}
        />
      </Flex>
    );
  }
}

export default Selectors;
