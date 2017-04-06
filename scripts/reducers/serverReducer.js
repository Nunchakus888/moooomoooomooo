import { combineReducers } from 'redux'
import PersonReducer from './PersonReducer'

const serverReducer = combineReducers({
  person: PersonReducer
})

export default serverReducer
