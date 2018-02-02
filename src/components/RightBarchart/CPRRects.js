import React from 'react'
import PropTypes from 'prop-types'
import { joinClassName as jcn } from '../utils'
import styles from './style.css'

export default class CountryName extends React.Component {
  static propTypes = {
    translateX: PropTypes.number.isRequired,
    translateY: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    minValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    currCountry: PropTypes.object,
    country: PropTypes.object.isRequired,
    onItemClick: PropTypes.func,
  }

  onClick = () => {
    const { country, onItemClick } = this.props
    if (onItemClick !== undefined) onItemClick(country)
  }

  render() {
    const { translateX, translateY, value, maxValue, minValue, currCountry, country, onItemClick } = this.props
    const isActive = currCountry && currCountry === country
    return (
      <g transform={'translate(' + translateX + ', ' + translateY + ')'} onClick={this.onClick} className={jcn({ clickable: onItemClick !== undefined }, styles)}>
        <rect className="-bar-background" y={-value} height={value} width='6' x='-3' fill={isActive ? '#abc1d9' : 'rgba(0, 0, 0, .1)'}></rect>
        <rect className="-bar-min-max" y={-maxValue} height={maxValue - minValue} width='6' x='-3' fill='#3378ae'></rect>
        <rect className="-bar-center" y={-value - 1} height='2' width='6' x='-3' fill='#fff'></rect>
      </g>
    )
  }
}
