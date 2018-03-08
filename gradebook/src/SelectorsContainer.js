import { connect } from 'react-redux';
import {
  onClassChange,
  onLessonChange,
  onAssignmentChange,
  runQueryOnClass,
  runQueryOnLesson,
  runQueryOnAssignment,
  runQueryOnRoot,
} from './actions';
import Selectors from './Selectors';

const mapStateToProps = state => {
  return {
    classes: state.classes,
    lessons: state.lessons,
    assignments: state.assignments,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(runQueryOnRoot());
    },
    onClassChange: changeEvent => {
      dispatch(onClassChange(changeEvent.target.value));
      dispatch(runQueryOnClass(changeEvent.target.value));
    },
    onLessonChange: changeEvent => {
      dispatch(onLessonChange(changeEvent.target.value));
      dispatch(runQueryOnLesson(changeEvent.target.value));
    },
    onAssignmentChange: changeEvent => {
      dispatch(onAssignmentChange(changeEvent.target.value));
      dispatch(runQueryOnAssignment(changeEvent.target.value));
    },
  };
};

const SelectorsContainer = connect(mapStateToProps, mapDispatchToProps)(
  Selectors
);

export default SelectorsContainer;
