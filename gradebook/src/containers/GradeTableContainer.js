import React from 'react'
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
      dispatch(
        onSubmissionChange(
          studentId,
          problemNum,
          nodeValue,
        )
      );
    },
    submit: (aid, pids, submissions) => {
      dispatch(submit(aid, pids, submissions.map(submission => {
        return {
          studentId: submission.studentId,
          responses: submission.responses,
        }
      })));
    },
  };
};

let GradeTableContainer = (props) => {
  return props.problems.length && <GradeTable {...props} />
}

GradeTableContainer = connect(mapStateToProps, mapDispatchToProps)(
  GradeTableContainer
);

export default GradeTableContainer;
