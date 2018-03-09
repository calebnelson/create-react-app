const defaultState = {
  problems: [],
  loading: false,
  error: '',
};

export const problemsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_CLASS':
      return {
        ...state,
        problems: defaultState.problems,
      };
    case 'CHANGE_LESSON':
      return {
        ...state,
        problems: defaultState.problems,
      };
    case 'CHANGE_ASSIGNMENT':
      return {
        ...state,
        problems: defaultState.problems,
      };
    case 'QUERY_ASSIGNMENT':
      return {
        ...state,
        loading: true,
      };
    case 'QUERY_ASSIGNMENT_SUCCESS':
      return {
        ...state,
        problems: action.payload.problems,
        loading: false,
      };
    case 'QUERY_ASSIGNMENT_FAILURE':
      const payload = action.payload;
      return {
        ...state,
        error: payload.message || payload.toString() || 'Unknown error',
        loading: false,
        problems: defaultState.problems,
      };
    default:
      return state;
  }
};
