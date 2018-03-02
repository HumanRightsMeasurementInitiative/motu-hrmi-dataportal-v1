import React from 'react'
import PropTypes from 'prop-types'
import { joinClassName as jcn } from '../utils'
import styles from './style.css'

export default class CountryName extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    currCountry: PropTypes.object,
    country: PropTypes.object.isRequired,
    onItemClick: PropTypes.func,
  }

  onClick = () => {
    const { country, onItemClick } = this.props
    if (onItemClick !== undefined) onItemClick(country)
  }

  render() {
    const { children, currCountry, country, onItemClick } = this.props
    const isActive = currCountry && currCountry === country
    return (
      <text textAnchor='end' fontSize='11px' fontWeight={isActive ? 800 : 400} fill={currCountry === country || !currCountry ? '#212121' : '#616161'} onClick={this.onClick} className={jcn({ clickable: onItemClick !== undefined }, styles)}>{children}</text>
    )
  }
}
