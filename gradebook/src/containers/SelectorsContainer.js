import { connect } from 'react-redux';
import {
  onClassChange,
  onLessonChange,
  onAssignmentChange,
  runQueryOnRoot,
} from '../Redux/actions';
import Selectors from '../components/Selectors';

const mapStateToProps = state => {
  return {
    classes: state.classesReducer.classes,
    lessons: state.lessonsReducer.lessons,
    assignments: state.assignmentsReducer.assignments,
    selectedClass: state.selectedClassReducer.selectedClass,
    selectedLesson: state.selectedLessonReducer.selectedLesson,
    selectedAssignment: state.selectedAssignmentReducer.selectedAssignment,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(runQueryOnRoot());
    },
    onClassChange: changeValue => {
      dispatch(onClassChange(changeValue));
    },
    onLessonChange: changeValue => {
      dispatch(onLessonChange(changeValue));
    },
    onAssignmentChange: changeValue => {
      dispatch(onAssignmentChange(changeValue));
    },
  };
};

const SelectorsContainer = connect(mapStateToProps, mapDispatchToProps)(
  Selectors
);

export default SelectorsContainer;
