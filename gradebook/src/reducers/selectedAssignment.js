const defaultState = {
  selectedAssignment: undefined,
};

export const selectedAssignmentReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'QUERY_CLASS':
      return {
        ...state,
        selectedAssignment: undefined,
      };
    case 'QUERY_LESSON':
      return {
        ...state,
        selectedAssignment: undefined,
      };
    case 'QUERY_ASSIGNMENT':
      return {
        ...state,
        selectedAssignment: action.payload,
      };
    default:
      return state;
  }
};
