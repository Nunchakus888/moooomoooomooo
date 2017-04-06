import { connect } from 'react-redux'
import { SSLink } from 'ss-mobile-components'
import * as Actions from '../actions/routerAction'

const mapDispatchProps = dispatch => ({
  onChangeRoute: (animation) => {
    dispatch(Actions.changeRouter(animation))
  }
})

export default connect(null, mapDispatchProps)(SSLink)
