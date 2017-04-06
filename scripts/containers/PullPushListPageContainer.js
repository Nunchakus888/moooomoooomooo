import { connect } from 'react-redux'
import pullpushListPage from '../page/pullpushListPage'
import { getPerson } from '../reducers/PersonReducer'
import * as Actions from '../actions/personAction'

const mapStateToProps = state => ({
  pullText: '上拉就可以刷新',
  pushText: '拖拽就可以翻页',
  items: getPerson(state)
})

const mapDispatchProps = dispatch => ({
  getItems: () => {
    dispatch(Actions.getItems())
  },
  onPush: () => {
    return new Promise((resolve, reject) =>
      dispatch(Actions.mockPush(resolve, reject)))
  },
  onPull: () => {
    return new Promise((resolve, reject) =>
      dispatch(Actions.mockPull(resolve, reject)))
  }
})

export default connect(mapStateToProps, mapDispatchProps)(pullpushListPage)
