import { connect } from 'react-redux';
import GradeTable from './GradeTable';
import { onSubmissionChange } from '../Redux/actions';

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
    onChange: (studentId, problemNum) => {
      dispatch(
        onSubmissionChange(
          studentId,
          problemNum,
          document.getElementById(studentId.concat(problemNum))
        )
      );
    },
  };
};

const GradeTableContainer = connect(mapStateToProps, mapDispatchToProps)(
  GradeTable
);

export default GradeTableContainer;
