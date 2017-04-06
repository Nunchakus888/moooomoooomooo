import * as types from '../actionType/personTypes'

const initialState = {
  entities: {},
  ids: []
}

const personReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PERSON_PUSH_SUCCEEDED:
      return Object.assign({}, state, {
        entities: action.entities.persons,
        ids: action.result
      })
    case types.PERSON_PULL_SUCCEEDED:
      return Object.assign({}, state, {
        entities: action.entities.persons,
        ids: action.result
      })

    case types.PERSONS_FETCH_SUCCEEDED:
      return Object.assign({}, state, {
        entities: action.entities.persons,
        ids: action.result
      })
    default:
      return state
  }
}

export default personReducer

export const getPerson = (state) => {
  return state.server.person
}
