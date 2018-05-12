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
      if(window.confirm("Do you want to submit these grades for this assignment?")){
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
        dispatch(reset());
        dispatch(runQueryOnRoot());
        alert("Grades Submitted!");
      }
    },
    revert: (assignmentId) => {
      if(window.confirm("Do you want to revert your changes?")){
        dispatch(onAssignmentChange(assignmentId));
        alert("Changes reverted, original grades pulled from database");
      }
    },
    reset: () => {
      if(window.confirm("Do you want to reset the application")){
        dispatch(reset());
        dispatch(runQueryOnRoot());
        alert("Changes discarded");
      }
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
