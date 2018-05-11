const defaultState = {
  selectedAssignment: undefined,
};

export const selectedAssignmentReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'QUERY_CLASS':
      return {
        ...state,
        selectedAssignment: defaultState.selectedAssignment,
      };
    case 'QUERY_LESSON':
      return {
        ...state,
        selectedAssignment: defaultState.selectedAssignment,
      };
    case 'QUERY_ASSIGNMENT':
      return {
        ...state,
        selectedAssignment: action.payload,
      };
    case 'RESET':
      return {
        ...state,
        selectedAssignment: defaultState.selectedAssignment,
      };
    default:
      return state;
  }
};
