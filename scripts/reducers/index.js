import { combineReducers } from 'redux'
import { reducer as ReduxFormReducer } from 'redux-form'
import clientReducer from './clientReducer'
import serverReducer from './serverReducer'

const rootReducer = combineReducers({
  client: clientReducer,
  server: serverReducer,
  form: ReduxFormReducer
})

export default rootReducer
