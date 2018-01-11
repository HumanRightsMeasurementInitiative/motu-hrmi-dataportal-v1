import React from 'react'
import PropTypes from 'prop-types'

export default class CountryName extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    country: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
  }

  onClick = () => {
    const { country, onItemClick } = this.props
    onItemClick(country)
  }

  render() {
    const { children } = this.props
    return (
      <text textAnchor='end' style={{ fontSize: '10px' }} onClick={this.onClick}>{children}</text>
    )
  }
}
