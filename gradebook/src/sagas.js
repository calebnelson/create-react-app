import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { query } from './graphql';

const queryOnRoot = `
    query{
        classrooms {
            id
            code
            startDate
        }
    }
`;

const queryOnClass = `
    query queryOnClass($classID: ID!) {
      classroom(id: $classID) {
        enrollments {
          id
          student {
            firstName
            lastName
          }
        }
        lessons {
          id
          lessonPlan {
            title
            order
          }
        }
      }
    }
`;

const queryOnLesson = `
    query queryOnLesson($lessonID: ID!) {
        lesson(id: $lessonID) {
            assignments {
                id
                problemSet {
                    title
                    order
                }
            }
        }
    }
`;

const queryOnAssignment = `
  query queryOnAssignment($assignmentID: ID!) {
    assignment(id: $assignmentID) {
      problemSet {
        problems {
          order
        }
      }
    }
  }
`;

export function* queryRoot(action) {
  try {
    const res = yield call(query, queryOnRoot);
    const sortedClasses = res.data.classrooms.sort(
      (a, b) => new Date(b.startDate) - new Date(a.startDate)
    );
    yield put({
      type: 'QUERY_ROOT_SUCCESS',
      payload: { classes: sortedClasses },
    });
  } catch (err) {
    yield put({
      type: 'QUERY_ROOT_ERROR',
      payload: err,
    });
  }
}

export function* queryClass(action) {
  try {
    const res = yield call(query, queryOnClass, action.payload);
    const sortedLessons = res.data.classroom.lessons.sort(
      (a, b) => a.lessonPlan.order - b.lessonPlan.order
    );
    const sortedEnrollments = res.data.classroom.enrollments.sort(
      (a, b) => a.student.lastName - b.student.lastName
    );
    yield put({
      type: 'QUERY_CLASS_SUCCESS',
      payload: { lessons: sortedLessons, enrollments: sortedEnrollments },
    });
  } catch (err) {
    yield put({
      type: 'QUERY_CLASS_ERROR',
      payload: err,
    });
  }
}

export function* queryLesson(action) {
  try {
    const res = yield call(query, queryOnLesson, action.payload);
    const sortedAssignments = res.data.lesson.assignments.sort(
      (a, b) => a.problemSet.order - b.problemSet.order
    );
    yield put({
      type: 'QUERY_LESSON_SUCCESS',
      payload: { assignments: sortedAssignments },
    });
  } catch (err) {
    yield put({
      type: 'QUERY_LESSON_ERROR',
      payload: err,
    });
  }
}

export function* queryAssignment(action) {
  try {
    const res = yield call(query, queryOnAssignment, action.payload);
    const sortedProblems = res.data.assignment.problemSet.problems.sort(
      (a, b) => a.order - b.order
    );
    yield put({
      type: 'QUERY_ASSIGNMENT_SUCCESS',
      payload: { problems: sortedProblems },
    });
  } catch (err) {
    yield put({
      type: 'QUERY_ASSIGNMENT_ERROR',
      payload: err,
    });
  }
}

export default function* main() {
  yield all([
    takeLatest('QUERY_ROOT', queryRoot),
    takeLatest('QUERY_CLASS', queryClass),
    takeLatest('QUERY_LESSON', queryLesson),
    takeLatest('QUERY_ASSIGNMENT', queryAssignment),
  ]);
}
