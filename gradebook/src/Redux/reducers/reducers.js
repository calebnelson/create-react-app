import { combineReducers } from 'redux';

import { classesReducer } from './classes';
import { lessonsReducer } from './lessons';
import { assignmentsReducer } from './assignments';
import { problemsReducer } from './problems';
import { selectedClassReducer } from './selectedClass';
import { selectedLessonReducer } from './selectedLesson';
import { selectedAssignmentReducer } from './selectedAssignment';
import { submissionsReducer } from './submissions';

const gradebookReducers = combineReducers({
  classesReducer,
  lessonsReducer,
  assignmentsReducer,
  problemsReducer,
  selectedClassReducer,
  selectedLessonReducer,
  selectedAssignmentReducer,
  submissionsReducer,
});

export default gradebookReducers;
