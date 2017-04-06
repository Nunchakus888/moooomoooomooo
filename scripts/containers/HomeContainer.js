import { connect } from 'react-redux'
import homePage from '../page/homePage'
import { getRouter } from '../reducers/RouterReducer'

const mapStateToProps = state => ({
  routerDirection: getRouter(state).routerDirection
})

export default connect(mapStateToProps, null)(homePage)
