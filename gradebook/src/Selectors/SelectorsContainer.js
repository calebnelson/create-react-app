import { connect } from 'react-redux';
import {
  onClassChange,
  onLessonChange,
  onAssignmentChange,
  runQueryOnRoot,
} from '../Redux/actions';
import Selectors from './Selectors';

const mapStateToProps = state => {
  return {
    classes: state.classesReducer.classes,
    lessons: state.lessonsReducer.lessons,
    assignments: state.assignmentsReducer.assignments,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(runQueryOnRoot());
    },
    onClassChange: changeEvent => {
      dispatch(onClassChange(changeEvent.target.value));
    },
    onLessonChange: changeEvent => {
      dispatch(onLessonChange(changeEvent.target.value));
    },
    onAssignmentChange: changeEvent => {
      dispatch(onAssignmentChange(changeEvent.target.value));
    },
  };
};

const SelectorsContainer = connect(mapStateToProps, mapDispatchToProps)(
  Selectors
);

export default SelectorsContainer;
