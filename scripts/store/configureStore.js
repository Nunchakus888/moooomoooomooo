import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import injectTapEventPlugin from 'react-tap-event-plugin'
import rootReducer from '../reducers/index'
import personSagas from '../sagas/personSagas'

injectTapEventPlugin()

const sagaMiddleware = createSagaMiddleware()

export default () => {
  const enhancers = []
  const devToolsExtension = window.devToolsExtension
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }

  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(
        thunk
      ),
      applyMiddleware(
        sagaMiddleware
      ),
      ...enhancers
    )
  )
  sagaMiddleware.run(personSagas)
  return store
}
