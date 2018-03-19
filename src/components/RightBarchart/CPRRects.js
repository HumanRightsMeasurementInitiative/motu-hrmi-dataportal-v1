import React from 'react'
import PropTypes from 'prop-types'
import { joinClassName as jcn } from '../utils'
import styles from './style.css'

export default class CPRRects extends React.Component {
  static propTypes = {
    translateX: PropTypes.number.isRequired,
    translateY: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    minValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    currCountry: PropTypes.object,
    country: PropTypes.object.isRequired,
    onItemClick: PropTypes.func,
    hoveredCountry: PropTypes.string,
    onItemHover: PropTypes.func,
    resetHoveredCountry: PropTypes.func,
  }

  onClick = () => {
    const { country, onItemClick } = this.props
    if (onItemClick !== undefined) onItemClick(country)
  }

  onMouseOver= () => {
    const { hoveredCountry, country, onItemHover } = this.props
    if ((!hoveredCountry || country.countryCode !== hoveredCountry) && onItemHover !== undefined) onItemHover(country.countryCode)
  }

  onMouseOut= () => {
    const { hoveredCountry, resetHoveredCountry } = this.props
    if (hoveredCountry !== null && resetHoveredCountry !== undefined) resetHoveredCountry()
  }

  render() {
    const { translateX, translateY, value, maxValue, minValue, currCountry, country, onItemClick } = this.props
    return (
      <g
        className={jcn({ cprRect: true, clickable: onItemClick !== undefined }, styles)}
        transform={'translate(' + translateX + ', ' + translateY + ')'}
        onClick={this.onClick}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        opacity={currCountry === country || !currCountry ? 1 : 0.5}
       >
        <rect className="-bar-min-max" y={-maxValue} height={maxValue - minValue} width='9' x='-4.5' fill='#3378ae'></rect>
        <rect className="-bar-center" y={-value - 1} height='2' width='9' x='-4.5' fill='#fff'></rect>
      </g>
    )
  }
}
