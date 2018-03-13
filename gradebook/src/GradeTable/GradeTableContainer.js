import { connect } from 'react-redux';
import GradeTable from './GradeTable';
import { onSubmissionChange } from '../Redux/actions';

const processEvent = inputEvent => {
  //TODO: return the studentId, problemNum, and response from the inputEvent
};

const mapStateToProps = state => {
  return {
    assignment: state.selectedAssignmentReducer.selectedAssignment,
    problems: state.problemsReducer.problems,
    submissions: state.submissionsReducer.submissions,
    columns: state.submissionsReducer.columns,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInput: inputEvent => {
      dispatch(onSubmissionChange(processEvent(inputEvent)));
    },
  };
};

const GradeTableContainer = connect(mapStateToProps, mapDispatchToProps)(
  GradeTable
);

export default GradeTableContainer;
