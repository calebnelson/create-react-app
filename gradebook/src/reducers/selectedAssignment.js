const defaultState = {
  selectedAssignment: undefined,
};

export const selectedAssignmentReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_CLASS':
      return {
        ...state,
        selectedAssignment: undefined,
      };
    case 'CHANGE_LESSON':
      return {
        ...state,
        selectedAssignment: undefined,
      };
    case 'CHANGE_ASSIGNMENT':
      return {
        ...state,
        selectedAssignment: action.payload,
      };
    default:
      return state;
  }
};
