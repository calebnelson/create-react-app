import React from 'react'
import { connect } from 'react-redux';
import GradeTable from '../components/GradeTable';
import { runQueryOnRoot, onAssignmentChange, onSubmissionChange, submit, reset } from '../Redux/actions';

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
      dispatch(submit(aid, 
        pids.map(problem => {
          return problem.id;
        }), 
        submissions.map(submission => {
          return {
            studentId: submission.student.id,
            responses: submission.responses,
          }
        })
      ));
      alert("Grades Submitted!");
    },
    revert: (assignmentId) => {
      dispatch(onAssignmentChange(assignmentId));
      alert("Changes reverted, original grades pulled from database");
    },
    reset: () => {
      dispatch(reset());
      dispatch(runQueryOnRoot());
      alert("Changes discarded");
    }
  };
};

let GradeTableContainer = (props) => {
  return props.problems.length && <GradeTable {...props} />
}

GradeTableContainer = connect(mapStateToProps, mapDispatchToProps)(
  GradeTableContainer
);

export default GradeTableContainer;
