const defaultState = {
  selectedClass: undefined,
};

export const selectedClassReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'QUERY_CLASS':
      return {
        ...state,
        selectedClass: action.payload,
      };
    default:
      return state;
  }
};
