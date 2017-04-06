import * as ActionTypes from '../actionType/personTypes'

export const getItems = () => {
  return {
    type: ActionTypes.PERSONS_FETCH_REQUESTED
  }
}

export const mockPull = (resolve, reject) => {
  return {
    type: ActionTypes.PRESON_PULL_REQUESTED,
    resolve,
    reject
  }
}

export const mockPush = (resolve, reject) => {
  return {
    type: ActionTypes.PRESON_PUSH_REQUESTED,
    resolve,
    reject
  }
}
