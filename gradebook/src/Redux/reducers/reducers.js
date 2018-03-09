import { combineReducers } from 'redux';

import { classesReducer } from './classes';
import { lessonsReducer } from './lessons';
import { assignmentsReducer } from './assignments';
import { problemsReducer } from './problems';
import { enrollmentsReducer } from './enrollments';
import { selectedClassReducer } from './selectedClass';
import { selectedLessonReducer } from './selectedLesson';
import { selectedAssignmentReducer } from './selectedAssignment';

const gradebookReducers = combineReducers({
  classesReducer,
  lessonsReducer,
  assignmentsReducer,
  problemsReducer,
  enrollmentsReducer,
  selectedClassReducer,
  selectedLessonReducer,
  selectedAssignmentReducer,
});

export default gradebookReducers;