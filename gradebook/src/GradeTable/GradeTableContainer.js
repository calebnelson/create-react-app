import { connect } from 'react-redux';
import GradeTable from './GradeTable';

const mapStateToProps = state => {
  return {
    assignment: state.selectedAssignmentReducer.selectedAssignment,
    problems: state.problemsReducer.problems,
    enrollments: state.enrollmentsReducer.enrollments,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const GradeTableContainer = connect(mapStateToProps, mapDispatchToProps)(
  GradeTable
);

export default GradeTableContainer;
