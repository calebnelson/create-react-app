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
  type: 'CHANGE_CLASS',
  payload: classID,
});

export const onLessonChange = lessonID => ({
  type: 'CHANGE_LESSON',
  payload: lessonID,
});

export const onAssignmentChange = assignmentID => ({
  type: 'CHANGE_ASSIGNMENT',
  payload: assignmentID,
});
