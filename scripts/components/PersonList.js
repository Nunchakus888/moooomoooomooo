import React, { Component, PropTypes } from 'react'

const propTypes = {
  getItems: PropTypes.func.isRequired,
  items: PropTypes.object
}

class PersonList extends Component {
  componentDidMount() {
    const { getItems } = this.props
    getItems()
  }

  render() {
    const { items } = this.props
    if (!items || !items.ids) {
      return null
    }
    return (
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
    )
  }
}

PersonList.propTypes = propTypes

export default PersonList
