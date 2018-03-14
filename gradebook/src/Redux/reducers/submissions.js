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
              return undefined;
            }),
          };
        }),
        columns: action.payload.problems.map(() => {
          return 0;
        }),
      };
    case 'CHANGE_SUBMISSION':
      const problemNum = action.problemNum;
      return {
        ...state,
        submissions: state.submissions.map(data => {
          if (data.studentId === action.studentId) {
            return {
              ...data,
              responses: data.responses
                .slice(0, problemNum - 1)
                .concat([action.response])
                .concat(data.responses.slice(problemNum)),
            };
          } else {
            return {
              ...data,
            };
          }
        }),
        columns: state.columns
          .slice(0, problemNum - 1)
          .concat([
            state.submissions.reduce((a, data) => {
              const b = data.responses ? data.responses[problemNum] : 0;
              if (!a) {
                a = 0;
              }
              return b ? a + b : a;
            }, 0),
          ])
          .concat(state.columns.slice(problemNum)),
      };
    default:
      return state;
  }
};
