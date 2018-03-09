const defaultState = {
  classes: [],
  loading: false,
  error: '',
};

export const classesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'QUERY_ROOT':
      return {
        ...state,
        loading: true,
      };
    case 'QUERY_ROOT_SUCCESS':
      return {
        ...state,
        classes: action.payload.classes,
        loading: false,
      };
    case 'QUERY_ROOT_FAILURE':
      const payload = action.payload;
      return {
        ...state,
        error: payload.message || payload.toString() || 'Unknown error',
        loading: false,
        classes: defaultState.classes,
      };
    default:
      return state;
  }
};
