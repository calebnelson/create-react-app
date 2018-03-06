export const runQueryOnRoot = () => ({
  type: 'QUERY_ROOT',
});

export const runQueryOnClass = classID => ({
  type: 'QUERY_CLASS',
  payload: classID,
});

export const runQueryOnLesson = lessonID => ({
  type: 'QUERY_LESSON',
  payload: lessonID,
});

export const runQueryOnAssignment = assignmentID => ({
  type: 'QUERY_ASSIGNMENT',
  payload: assignmentID,
});

export const onClassChange = classID => ({
  type: 'CLASS_CHANGE',
  payload: classID,
});

export const onLessonChange = lessonID => ({
  type: 'LESSON_CHANGE',
  payload: lessonID,
});

export const onAssignmentChange = assignmentID => ({
  type: 'ASSIGNMENT_CHANGE',
  payload: assignmentID,
});
