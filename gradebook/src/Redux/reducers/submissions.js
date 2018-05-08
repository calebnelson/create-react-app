const defaultState = {
  submissions: [],
  columns: [],
};

export const submissionsReducer = (state = defaultState, action) => {
  let newSubmissions = {};
  let newCol = {};
  let newColumns = {};
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
            // responses: [],
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
      newSubmissions = {
        ...state.submissions,
        ...action.payload.grades,
      };

      newColumns = action.payload.problems.map((index) => 
        newSubmissions.reduce((accumulator, currentValue) => {
          const currentResponse = currentValue.responses[index];
          return accumulator + currentResponse;
        }, 0)
      );
      
      return {
        ...state,
        // submissions: state.submissions.map(data => {
        //   return {
        //     ...data,
        //     responses: action.payload.problems.map(() => {
        //       return null;
        //     }),
        //   };
        // }),
        submissions: newSubmissions,
        columns: newColumns,
      };
    case 'CHANGE_SUBMISSION':
      const problemNum = action.problemNum;
      newSubmissions = state.submissions.map(data => {
        if (data.studentId === action.studentId) {
          return {
            ...data,
            responses: data.responses
              .slice(0, problemNum)
              .concat(action.response)
              .concat(data.responses.slice(problemNum + 1)),
          };
        } else {
          return {
            ...data,
          };
        }
      });

      newCol = newSubmissions.reduce((accumulator, currentValue) => {
        const currentResponse = currentValue.responses[problemNum];
        return accumulator + currentResponse;
      }, 0);

      newColumns = state.columns
        .slice(0, problemNum)
        .concat(newCol)
        .concat(state.columns.slice(problemNum + 1));

      return {
        ...state,
        submissions: newSubmissions,
        columns: newColumns,
      };
    default:
      return state;
  }
};
