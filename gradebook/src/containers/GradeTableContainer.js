import { connect } from 'react-redux';
import GradeTable from '../components/GradeTable';
import { onSubmissionChange, submit } from '../Redux/actions';

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
    onChange: (studentId, rowNum, problemNum, nodeValue) => {
      // console.log(nodeValue);
      // console.log(typeof(nodeValue));
      dispatch(
        onSubmissionChange(
          studentId,
          problemNum,
          nodeValue,
        )
      );
    },
    submit: submissions => {
      dispatch(submit(submissions));
    },
  };
};

const GradeTableContainer = connect(mapStateToProps, mapDispatchToProps)(
  GradeTable
);

export default GradeTableContainer;
