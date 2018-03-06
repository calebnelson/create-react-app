import 'redux';

const defaultState = {
  classes: [],
  lessons: [],
  assignments: [],
  problems: [],
  enrollments: [],
  selectedClass: undefined,
  selectedLesson: undefined,
  selectedAssignment: undefined,
  loading: false,
};

const classesReducer = (state = defaultState, action) => {
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

const lessonsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CLASS_CHANGE':
      return {
        ...state,
        lessons: defaultState.lessons,
      };
    case 'QUERY_CLASS':
      return {
        ...state,
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
        lessons: defaultState.lessons,
      };
    default:
      return state;
  }
};

const assignmentsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CLASS_CHANGE':
      return {
        ...state,
        assignments: defaultState.assignments,
      };
    case 'LESSONS_CHANGE':
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

const problemsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CLASS_CHANGE':
      return {
        ...state,
        problems: defaultState.problems,
      };
    case 'LESSONS_CHANGE':
      return {
        ...state,
        problems: defaultState.problems,
      };
    case 'ASSIGNMENT_CHANGE':
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

const enrollmentsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CLASS_CHANGE':
      return {
        ...state,
        enrollments: defaultState.enrollments,
      };
    case 'QUERY_CLASS':
      return {
        ...state,
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
        enrollments: defaultState.enrollments,
      };
    default:
      return state;
  }
};

const selectedClassReducer = (state = defaultState, action) => {
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

const selectedLessonReducer = (state = defaultState, action) => {
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

const selectedAssignmentReducer = (state, action) => {
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
