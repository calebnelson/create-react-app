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
    onChange: (studentId, rowNum, problemNum) => {
      dispatch(
        onSubmissionChange(
          studentId,
          problemNum,
          parseInt(
            document.getElementById(
              ''
                .concat(rowNum)
                .concat(', ')
                .concat(problemNum)
            ).value,
            10
          ) > 0
            ? 1
            : 0
        )
      );
    },
  };
};

const GradeTableContainer = connect(mapStateToProps, mapDispatchToProps)(
  GradeTable
);

export default GradeTableContainer;
