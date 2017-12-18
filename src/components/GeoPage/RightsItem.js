import React from 'react'
import PropTypes from 'prop-types'

export default class RightsItem extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    right: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
  }

  onClick = () => {
    const { right, onItemClick } = this.props
    onItemClick(right)
  }

  render() {
    const { children } = this.props
    return (
      <li onClick={this.onClick}>Right to {children}</li>
    )
  }
}
