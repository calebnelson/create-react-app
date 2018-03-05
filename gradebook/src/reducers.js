import { combineReducers } from 'redux';

/*const classesReducer = (state = [], action) => {
    switch (action.type){
        /*case 'GET_CLASSES':
            return {
                ...state,
                loading: true,
            }
        case 'GET_CLASSES_SUCCESS':
            return {
                ...state,
                classes: action.payload,
                loading: false,
            }
        case 'GET_CLASSES_FAILURE':
            const payload = action.payload
            return{
                ...state,
                error: payload.message || payload.toString() || 'Unknown error',
                loading: false,
                classes: []
            }
        default:
            return state;
    }
}

const lessonsReducer = (state = [], action) => {
    switch (action.type){
        case 'GET_LESSONS':

    }
}
*/

const classReducer = (state = [], action) => {
  switch (action.type) {
    case 'CLASS_CHANGE':
      return {
        ...state,
        selectedClass: action.payload,
      };
    default:
      return state;
  }
};

const lessonReducer = (state = [], action) => {
  switch (action.type) {
    case 'CLASS_CHANGE':
      return {
        ...state,
        selectedLesson: undefined,
      };
    case 'LESSON_CHANGE':
      return {
        ...state,
        selectedLesson: action.payload,
      };
    default:
      return state;
  }
};

const assignmentReducer = (state = [], action) => {
  switch (action.type) {
    case 'CLASS_CHANGE':
      return {
        ...state,
        selectedAssignment: undefined,
      };
    case 'LESSON_CHANGE':
      return {
        ...state,
        selectedAssignment: undefined,
      };
    case 'ASSIGNMENT_CHANGE':
      return {
        ...state,
        selectedAssignment: action.payload,
      };
    default:
      return state;
  }
};
