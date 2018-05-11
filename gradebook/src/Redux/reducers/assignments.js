const defaultState = {
  assignments: [],
  loading: false,
  error: '',
};

export const assignmentsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'QUERY_CLASS':
      return {
        ...state,
        assignments: defaultState.assignments,
      };
    case 'QUERY_LESSON':
      return {
        ...state,
        assignments: defaultState.assignments,
        loading: true,
      };
    case 'QUERY_LESSON_SUCCESS':
      return {
        ...state,
        assignments: action.payload.assignments,
        loading: false,
      };
    case 'QUERY_LESSON_FAILURE':
      const payload = action.payload;
      return {
        ...state,
        error: payload.message || payload.toString() || 'Unknown error',
        loading: false,
      };
    case 'RESET':
      return defaultState;
    default:
      return state;
  }
};
