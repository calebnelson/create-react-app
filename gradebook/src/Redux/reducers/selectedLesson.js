const defaultState = {
  selectedLesson: undefined,
};

export const selectedLessonReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'QUERY_CLASS':
      return {
        ...state,
        selectedLesson: defaultState.selectedLesson,
      };
    case 'QUERY_LESSON':
      return {
        ...state,
        selectedLesson: action.payload,
      };
    case 'RESET':
      return {
        ...state,
        selectedLesson: defaultState.selectedLesson,
      };
    default:
      return state;
  }
};
