const defaultState = {
  lessons: [],
  loading: false,
  error: '',
};

export const lessonsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'QUERY_CLASS':
      return {
        ...state,
        lessons: defaultState.lessons,
        loading: true,
      };
    case 'QUERY_CLASS_SUCCESS':
      return {
        ...state,
        lessons: action.payload.lessons,
        loading: false,
      };
    case 'QUERY_CLASS_FAILURE':
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
