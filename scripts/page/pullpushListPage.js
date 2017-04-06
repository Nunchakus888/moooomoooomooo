import React, { Component, PropTypes } from 'react'
import { SSPullPushList } from 'ss-mobile-components'
import SSTitle from '../containers/SSTitleContainer'

const propTypes = {
  getItems: PropTypes.func,
  pullText: PropTypes.string,
  pushText: PropTypes.string,
  onPush: PropTypes.func,
  onPull: PropTypes.func,
  items: PropTypes.object
}

const listData = []
for (let i = 1; i < 50; i++) {
  listData.push(<li><span>行{i}</span><span>行{i}</span></li>)
}

class PullPushListPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollY: 0
    }
    this.onScrollCallBack = this.onScrollCallBack.bind(this)
  }
  componentDidMount() {
    const { getItems } = this.props
    getItems()
  }
  onScrollCallBack(IScroll) {
    this.setState({ scrollY: IScroll.y })
  }
  render() {
    const { scrollY } = this.state
    const { pullText, pushText, onPush, onPull, items } = this.props
    const listConfig = {
      pullText,
      pushText,
      onPush,
      onPull,
      onScrollCallBack: IScroll => this.onScrollCallBack(IScroll)
    }
    return (
      <section className="page" >
        <center>
          <SSTitle
            title="SSPullPushList"
            titleLeft={{ iconName: 'angle-left' }}
          />
        </center>
        scrollY: {scrollY}
        <SSPullPushList {...listConfig} >
          <ul className="person">
            {
              items.ids.map(id => (
                <li key={id}>
                  <span >姓名:{items.entities[id].name}</span>
                  <span >年龄:{items.entities[id].age}</span>
                </li>
              ))
            }
          </ul>
        </SSPullPushList>
      </section>
    )
  }
}
PullPushListPage.propTypes = propTypes

export default PullPushListPage
