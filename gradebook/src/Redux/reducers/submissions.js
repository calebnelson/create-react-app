const defaultState = {
  submissions: [],
  columns: [],
};

export const submissionsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'QUERY_CLASS':
      return {
        ...state,
        submissions: defaultState.submissions,
      };
    case 'QUERY_CLASS_SUCCESS':
      return {
        ...state,
        submissions: action.payload.enrollments.map(data => {
          return {
            studentId: data.student.id,
            firstName: data.student.firstName,
            lastName: data.student.lastName,
            assignmentId: undefined,
            responses: [],
          };
        }),
        columns: [],
      };
    case 'QUERY_ASSIGNMENT':
      return {
        ...state,
        submissions: state.submissions.map(data => {
          return {
            ...data,
            assignmentId: action.payload,
          };
        }),
      };
    case 'QUERY_ASSIGNMENT_SUCCESS':
      return {
        ...state,
        submissions: state.submissions.map(data => {
          return {
            ...data,
            responses: action.payload.problems.map(() => {
              return null;
            }),
          };
        }),
        columns: action.payload.problems.map(() => {
          return 0;
        }),
      };
    case 'CHANGE_SUBMISSION':
      const problemNum = action.problemNum;
      const newSubmissions = state.submissions.map(data => {
        if (data.studentId === action.studentId) {
          return {
            ...data,
            responses: data.responses
              .slice(0, problemNum - 1)
              .concat(action.response)
              .concat(data.responses.slice(problemNum)),
          };
        } else {
          return {
            ...data,
          };
        }
      });

      const newCol = newSubmissions.reduce((accumulator, currentValue) => {
        const currentResponse = currentValue.responses[problemNum - 1];
        return accumulator + currentResponse;
      }, 0);

      const newColumns = state.columns
        .slice(0, problemNum - 1)
        .concat(newCol)
        .concat(state.columns.slice(problemNum));

      return {
        ...state,
        submissions: newSubmissions,
        columns: newColumns,
      };
    default:
      return state;
  }
};
