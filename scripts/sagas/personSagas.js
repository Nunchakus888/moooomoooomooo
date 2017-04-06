import { call, put, takeLatest, fork } from 'redux-saga/effects'
import { normalize } from 'normalizr'
import { callApi } from '../services/api'
import * as ActionTypes from '../actionType/personTypes'
import * as schema from '../sagas/schema'

// getPersons
function* fetchPersons() {
  yield put({ type: ActionTypes.PERSONS_FETCH_REQUEST })
  try {
    const json = yield call(callApi, 'getData', 'GET')
    const result = normalize(json, schema.arrayOfPersons)
    yield put({ type: ActionTypes.PERSONS_FETCH_SUCCEEDED, ...result })
  } catch (e) {
    yield put({ type: ActionTypes.PERSONS_FETCH_FAILED, message: e.message })
  }
}

function* fetchWatcher() {
  yield takeLatest(ActionTypes.PERSONS_FETCH_REQUESTED, fetchPersons)
}

// pull Persons
function* pullPerson(action) {
  yield put({ type: ActionTypes.PERSON_PULL_REQUEST })
  try {
    const json = yield call(callApi, 'mockPull', 'POST', { command: 'pull' })
    const result = normalize(json, schema.arrayOfPersons)
    yield put({ type: ActionTypes.PERSON_PULL_SUCCEEDED, ...result })
    yield action.resolve()
  } catch (e) {
    yield put({ type: ActionTypes.PERSON_PULL_FAILED, message: e.message })
    yield action.reject('pull fail')
  }
}

function* pullWatcher() {
  yield takeLatest(ActionTypes.PRESON_PULL_REQUESTED, pullPerson)
}


// push
function* pushPerson(action) {
  yield put({ type: ActionTypes.PERSON_PUSH_REQUEST })
  try {
    const json = yield call(callApi, 'mockPush', 'POST', { command: 'push' })
    const result = normalize(json, schema.arrayOfPersons)
    yield put({ type: ActionTypes.PERSON_PUSH_SUCCEEDED, ...result })
    yield action.resolve()
  } catch (e) {
    yield put({ type: ActionTypes.PERSON_PUSH_FAILED, message: e.message })
    yield action.reject('pull fail')
  }
}

function* pushWatcher() {
  yield takeLatest(ActionTypes.PRESON_PUSH_REQUESTED, pushPerson)
}

function* personSaga() {
  const sagas = []
  sagas.push(fork(pullWatcher))
  sagas.push(fork(pushWatcher))
  sagas.push(fork(fetchWatcher))
  yield sagas
}

export default personSaga
