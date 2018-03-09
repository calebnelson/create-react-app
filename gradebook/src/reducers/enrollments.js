const defaultState = {
  enrollments: [],
  loading: false,
  error: '',
};

export const enrollmentsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'QUERY_CLASS':
      return {
        ...state,
        enrollments: defaultState.enrollments,
        loading: true,
      };
    case 'QUERY_CLASS_SUCCESS':
      return {
        ...state,
        enrollments: action.payload.enrollments,
        loading: false,
      };
    case 'QUERY_CLASS_FAILURE':
      const payload = action.payload;
      return {
        ...state,
        error: payload.message || payload.toString() || 'Unknown error',
        loading: false,
      };
    default:
      return state;
  }
};
