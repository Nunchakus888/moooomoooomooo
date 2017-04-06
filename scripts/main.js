import 'babel-polyfill'
import 'fastclick'
import 'isomorphic-fetch'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import '../styles/main.scss'
import RouterDemo from './router/routerDemo'
import configureStore from './store/configureStore'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <div>
      <RouterDemo />
    </div>
  </Provider>,
  document.getElementById('main')
)
