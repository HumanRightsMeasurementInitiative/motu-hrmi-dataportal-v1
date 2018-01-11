import React from 'react'
import PropTypes from 'prop-types'

export default class CountryName extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    country: PropTypes.object.isRequired,
    onItemClick: PropTypes.func.isRequired,
  }

  onClick = () => {
    const { country, onItemClick } = this.props
    onItemClick(country)
  }

  render() {
    const { children } = this.props
    return (
      <text textAnchor='end' fontSize='10px' fill='#9a9a9b' onClick={this.onClick}>{children}</text>
    )
  }
}
