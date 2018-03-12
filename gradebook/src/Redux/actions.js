export const runQueryOnRoot = () => ({
  type: 'QUERY_ROOT',
});

export const onClassChange = classID => ({
  type: 'QUERY_CLASS',
  payload: classID,
});

export const onLessonChange = lessonID => ({
  type: 'QUERY_LESSON',
  payload: lessonID,
});

export const onAssignmentChange = assignmentID => ({
  type: 'QUERY_ASSIGNMENT',
  payload: assignmentID,
});

export const onSubmissionChange = (studentId, problemNum, response) => ({
  type: 'CHANGE_SUBMISSION',
  studentId,
  problemNum,
  response,
});
