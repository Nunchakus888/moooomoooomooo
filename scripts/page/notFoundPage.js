import React from 'react'
import SSTitle from '../containers/SSTitleContainer'

const notFound = () => (
  <section className="page" >
    <SSTitle
      title="您访问的页面不存在！"
      titleLeft={{ iconName: 'angle-left' }}
    />
    <div className="notFound" >
      404
    </div>
  </section>
)

export default notFound
