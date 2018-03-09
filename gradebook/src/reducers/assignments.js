const defaultState = {
  assignments: [],
  loading: false,
  error: '',
};

export const assignmentsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_CLASS':
      return {
        ...state,
        assignments: defaultState.assignments,
      };
    case 'CHANGE_LESSON':
      return {
        ...state,
        assignments: defaultState.assignments,
      };
    case 'QUERY_LESSON':
      return {
        ...state,
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
        assignments: defaultState.assignments,
      };
    default:
      return state;
  }
};
