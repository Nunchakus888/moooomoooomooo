import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const eventFilter = ['INPUT', 'TEXTAREA', 'BUTTON']
// 移动端阻止事件冒泡，不执行 click 事件
document.addEventListener('touchend', (e) => {
  let isAdopt = true
  for (let i = 0; i < eventFilter.length; i++) {
    if (e.target.className.indexOf('datepicker') > -1) {
      // 如果点击了日期控件，控件上默认的事件为 click 事件不能阻止
      isAdopt = false
      break
      // 如果是提交表单按钮，则不阻止 click 事件，引用 click 事件需要出发表单的 onSubmit 事件
    } else if (e.target.className.indexOf('ss-button') !== -1 && e.target.type !== 'submit') {
      // 如果是 SSButton 组件，并且也不是 type='submit' 阻止 click
      isAdopt = true
      break
    } else if (e.target.type === 'submit' && eventFilter[i] === e.target.tagName) {
      // 如果是提交按钮，不阻止click 等事件
      isAdopt = false
      break
    } else if (eventFilter[i] === e.target.tagName) {
      // 如果是表单元素，不阻止默认事件
      isAdopt = false
      break
    }
  }
  if (isAdopt) {
    e.preventDefault()
  }
})
const Home = (props) => {
  /*
    routerDirection：是决定跳转路由的时候动画绘制的方向
    SSBack：路由回退时使用  ( history.go(-1) )
    SSForthcome：路由正常跳转时使用 browserHistory.push(url)
  */
  const { children, location, routerDirection } = props
  let routerJumpAnimation = ''
  switch (routerDirection) {
    case 'rightToLeft':
      routerJumpAnimation = 'SSForthcome'
      break
    case 'leftToRight':
      routerJumpAnimation = 'SSBack'
      break
    default:
  }

  return (
    <section className="page" >
      <ReactCSSTransitionGroup
        component="div"
        transitionName={routerJumpAnimation}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {React.cloneElement(children, {
          key: location.pathname
        })}
      </ReactCSSTransitionGroup>
    </section>
  )
}

Home.propTypes = {
  children: React.PropTypes.node,
  routerDirection: React.PropTypes.string,
  location: React.PropTypes.object
}

export default Home
