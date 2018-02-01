import React from 'react'
import PropTypes from 'prop-types'
import { joinClassName as jcn } from '../utils'
import styles from './style.css'

export default class CountryName extends React.Component {
  static propTypes = {
    translateX: PropTypes.number.isRequired,
    translateY: PropTypes.number.isRequired,
    // highPos: PropTypes.number.isRequired,
    // corePos: PropTypes.number.isRequired,
    highIncomeValue: PropTypes.number.isRequired,
    coreValue: PropTypes.number.isRequired,
    // highIncomeDisplay: PropTypes.string.isRequired,
    // coreDisplay: PropTypes.string.isRequired,
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
        {
          // highPos > 0 &&
          // <rect height={highPos} width='6' x='-3' fill={isActive ? '#b2eacf' : 'rgba(0, 0, 0, .1)'}></rect>
        }
        <rect y={-maxValue} height={maxValue} width='6' x='-3' fill={isActive ? '#b2eacf' : 'rgba(0, 0, 0, .1)'}></rect>
        {
          // corePos > 0 &&
          <g className="-circle-core">
            <circle className='core' cy={-coreValue} r='5' fill='#00b95f'></circle>
          </g>
        }
        {
          <g className="-circle-high-income">
            <circle className='high' cy={-highIncomeValue} r='6' fill='#00b95f'></circle>
            <circle className='high' cy={-highIncomeValue} r='3' fill='#00b95f' strokeWidth='2' stroke='#fff'></circle>
          </g>
          // <text y={-highIncomeValue + 3} x={8} fontSize='12' fill='#616161' fontWeight='600'>{highIncomeDisplay}%</text>
          // <text y={-coreValue + 3} x={8} fontSize='12' fill='#616161' fontWeight='600'>{coreDisplay}%</text>
        }
      </g>
    )
  }
}
