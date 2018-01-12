import React from 'react'
import PropTypes from 'prop-types'

export default class CountryName extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    currCountry: PropTypes.object,
    country: PropTypes.object.isRequired,
    onItemClick: PropTypes.func.isRequired,
  }

  onClick = () => {
    const { country, onItemClick } = this.props
    onItemClick(country)
  }

  render() {
    const { children, currCountry, country } = this.props
    const isActive = currCountry && currCountry.name === country.name
    return (
      <text textAnchor='end' fontSize='10px' fontWeight={isActive ? 'bold' : 600} fill={isActive ? '#616161' : '#9a9a9b'} onClick={this.onClick}>{children}</text>
    )
  }
}
