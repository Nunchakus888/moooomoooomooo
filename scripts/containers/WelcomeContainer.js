import { connect } from 'react-redux'
import * as Actions from '../actions/routerAction'
import WelcomePage from '../page/welcomePage'

const mapDispatchProps = dispatch => ({
  onChangeRoute: (url) => {
    dispatch(Actions.changeRouter(url))
  }
})

export default connect(null, mapDispatchProps)(WelcomePage)
