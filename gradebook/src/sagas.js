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

function* getClasses(action) {
  try {
    const res = yield call(query, queryOnRoot);
    const sortedClasses = res.data.classrooms.sort(
      (a, b) => new Date(b.startDate) - new Date(a.startDate)
    );
    yield put({
      type: 'GET_CLASSES_SUCCESS',
      payload: sortedClasses,
    });
  } catch (err) {
    yield put({
      type: 'GET_CLASSES_ERROR',
      payload: err,
    });
  }
}

function* getLessons(action) {}
