import { connect } from 'react-redux'
import { SSTitle } from 'ss-mobile-components'
import * as Actions from '../actions/routerAction'

const mapDispatchProps = dispatch => ({
  onChangeRoute: () => {
    dispatch(Actions.changeRouter('leftToRight'))
  }
})

export default connect(null, mapDispatchProps)(SSTitle)
