import React, { PropTypes } from 'react'
import { SSPullPushList, SSTitle } from 'ss-mobile-components'
import { Icon } from 'react-fa'
import SSLink from '../containers/SSLinkContainer'

const btnList = [
  { name: 'SSPullPushList', iconName: 'bars', url: 'pullPushList' }
]

const propTypes = {
  onChangeRoute: PropTypes.func
}

const WelcomePage = ({ onChangeRoute }) => (
  <section className="project-describe page" >
    <SSTitle title="列表" />
    <SSPullPushList>
      <ul className="demoLinks">
        {
          btnList.map((item, i) => (
            <li key={i} >
              <Icon name={item.iconName} />
              <SSLink
                text={item.name}
                url={item.url}
                onChangeRoute={onChangeRoute}
              />
              <Icon name="angle-right" />
            </li>
          ))
        }
      </ul>
    </SSPullPushList>
  </section>
)

WelcomePage.propTypes = propTypes

export default WelcomePage
