import React from 'react'
import PropTypes from 'prop-types'
import { joinClassName as jcn } from '../utils'
import styles from './style.css'

export default class CountryName extends React.Component {
  static propTypes = {
    translateX: PropTypes.number.isRequired,
    translateY: PropTypes.number.isRequired,
    highIncomeValue: PropTypes.number.isRequired,
    coreValue: PropTypes.number.isRequired,
    currCountry: PropTypes.object,
    country: PropTypes.object.isRequired,
    onItemClick: PropTypes.func,
  }

  onClick = () => {
    const { country, onItemClick } = this.props
    if (onItemClick !== undefined) onItemClick(country)
  }

  render() {
    const { translateX, translateY, highIncomeValue, coreValue, currCountry, country, onItemClick } = this.props
    const maxValue = Math.max(highIncomeValue, coreValue)
    const isActive = currCountry && currCountry === country
    return (
      <g transform={'translate(' + translateX + ', ' + translateY + ')'} onClick={this.onClick} className={jcn({ clickable: onItemClick !== undefined }, styles)}>
        <rect y={-maxValue} height={maxValue} width='6' x='-3' fill={isActive ? '#b2eacf' : 'rgba(0, 0, 0, .1)'}></rect>
        <g className="-circle-core">
          <circle className='core' cy={-coreValue} r='5' fill='#00b95f'></circle>
        </g>
        <g className="-circle-high-income">
          <circle className='high' cy={-highIncomeValue} r='6' fill='#00b95f'></circle>
          <circle className='high' cy={-highIncomeValue} r='3' fill='#00b95f' strokeWidth='2' stroke='#fff'></circle>
        </g>
      </g>
    )
  }
}
