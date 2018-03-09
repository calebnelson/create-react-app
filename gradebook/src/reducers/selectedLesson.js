const defaultState = {
  selectedLesson: undefined,
};

export const selectedLessonReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'QUERY_CLASS':
      return {
        ...state,
        selectedLesson: undefined,
      };
    case 'QUERY_LESSON':
      return {
        ...state,
        selectedLesson: action.payload,
      };
    default:
      return state;
  }
};
