import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import WelcomeContainer from '../containers/WelcomeContainer'
import HomeContainer from '../containers/HomeContainer'
import PullPushListPage from '../containers/PullPushListPageContainer'
import notFoundPage from '../page/notFoundPage'

const routes = (
  <Route path="/" component={HomeContainer} >
    <IndexRoute component={WelcomeContainer} />
    <Route path="pullPushList" component={PullPushListPage} />
    <Route path="*" component={notFoundPage} />
  </Route>
)

const RouterDemo = () => (
  <Router history={browserHistory} >
    {routes}
  </Router>
)

export default RouterDemo
