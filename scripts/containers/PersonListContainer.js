import { connect } from 'react-redux'
import * as Actions from '../actions/personAction'
import PersonList from '../components/PersonList'
import { getPerson } from '../reducers/PersonReducer'

const mapStateToProps = state => ({
  items: getPerson(state)
})

const mapDispatchProps = dispatch => ({
  getItems: () => {
    dispatch(Actions.getItems())
  }
})

export default connect(mapStateToProps, mapDispatchProps)(PersonList)
