import { all, call, put, takeLatest } from 'redux-saga/effects';
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
  query queryOnClass($classId: ID!) {
    classroom(id: $classId) {
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
  query queryOnLesson($lessonId: ID!) {
      lesson(id: $lessonId) {
          assignments {
              id
              problemSet {
                  title
                  order
                  kind
              }
          }
      }
  }
`;

const queryOnAssignment = `
  query queryOnAssignment($assignmentId: ID!) {
    assignment(id: $assignmentId) {
      problemSet {
        problems {
          id
          order
        }
      }
    }
    gradesForAssignment(id: $assignmentId, fillEmpty: true){
      student{
        id
        firstName
        lastName
      }
      responses
    }
  }
`;

const submitGrades = `
  mutation($aid: ID!, $pids: [ID], $input: [GradeAssignmentInput!]){
    gradeAssignment(assignmentId: $aid, problemIds: $pids, inputs: $input){
      success
      message
    }
  }
`

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
    const variables = '{ "classId": "'.concat(action.payload).concat('" }');
    const res = yield call(query, queryOnClass, variables);
    const sortedLessons = res.data.classroom.lessons.sort(
      (a, b) => a.lessonPlan.order - b.lessonPlan.order
    );
    yield put({
      type: 'QUERY_CLASS_SUCCESS',
      payload: { lessons: sortedLessons },
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
    const variables = '{ "lessonId": "'.concat(action.payload).concat('" }');
    const res = yield call(query, queryOnLesson, variables);
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
    const variables = '{ "assignmentId": "'
      .concat(action.payload)
      .concat('" }');
    const res = yield call(query, queryOnAssignment, variables);
    const sortedProblems = res.data.assignment.problemSet.problems.sort(
      (a, b) => a.order - b.order
    );
    const sortedGrades = res.data.gradesForAssignment.sort(
      (a, b) => {
        const lastNameSort = a.student.lastName.toLowerCase().localeCompare(b.student.lastName.toLowerCase())
        if (lastNameSort === 0){
          return a.student.firstName.toLowerCase().localeCompare(b.student.firstName.toLowerCase())
        }
        return lastNameSort
      }
    );
    yield put({
      type: 'QUERY_ASSIGNMENT_SUCCESS',
      payload: {
        problems: sortedProblems,
        grades: sortedGrades,
      },
    });
  } catch (err) {
    yield put({
      type: 'QUERY_ASSIGNMENT_ERROR',
      payload: err,
    });
  }
}

export function* submit(action){
  try{
    const variables = {
      aid: action.aid,
      pids: action.pids,
      input: action.input,
    }
    const res = yield call(query, submitGrades, variables);
    if(res.data.gradeAssignment.success){
      yield put({
        type: 'SUBMIT_SUCCESS',
        payload: res.data.gradeAssignment.message,
      })
    }
    else{
      yield put({
        type: 'SUBMIT_ERROR',
        payload: res.data.gradeAssignment.message,
      })
    }
  } catch(err) {
    yield put({
      type: 'SUBMIT_ERROR',
      payload: err,
    });
  }
}

export default function* sagas() {
  yield all([
    takeLatest('QUERY_ROOT', queryRoot),
    takeLatest('QUERY_CLASS', queryClass),
    takeLatest('QUERY_LESSON', queryLesson),
    takeLatest('QUERY_ASSIGNMENT', queryAssignment),
    takeLatest('SUBMIT', submit)
  ]);
}
