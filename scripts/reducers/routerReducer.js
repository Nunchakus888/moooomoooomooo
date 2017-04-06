import * as ActionTypes from '../actionType/routerTypes'

const initialState = {
  routerDirection: 'forthcome'
}

const routerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_ROUTER:
      return Object.assign({}, state, {
        routerDirection: action.animation
      })
    default:
      return state
  }
}

export default routerReducer

export const getRouter = (state) => {
  return state.client.router
}
