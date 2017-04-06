import { combineReducers } from 'redux'
import RouterReducer from './RouterReducer'

const clientReducer = combineReducers({
  router: RouterReducer
})

export default clientReducer
