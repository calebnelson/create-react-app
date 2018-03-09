const defaultState = {
  selectedLesson: undefined,
};

export const selectedLessonReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_CLASS':
      return {
        ...state,
        selectedLesson: undefined,
      };
    case 'CHANGE_LESSON':
      return {
        ...state,
        selectedLesson: action.payload,
      };
    default:
      return state;
  }
};
