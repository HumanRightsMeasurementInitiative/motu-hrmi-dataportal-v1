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
      <g transform={'translate(' + translateX + ', ' + translateY + ')'} onClick={this.onClick} className={jcn({ esrRect: true, clickable: onItemClick !== undefined }, styles)} opacity={currCountry === country || !currCountry ? 1 : 0.5}>
        <rect y={-maxValue} height={maxValue} width='9' x='-4.5' fill={isActive ? '#a1e2bc' : 'rgba(0, 0, 0, .1)'}></rect>
        { coreValue &&
          <g className="-circle-core">
            <circle className='core' cy={-coreValue} r='7' fill='#00b95f'></circle>
          </g>
        }
        { highIncomeValue &&
          <g className="-circle-high-income">
            <circle className='high' cy={-highIncomeValue} r='8' fill='#00b95f'></circle>
            <circle className='high' cy={-highIncomeValue} r='4' fill='#00b95f' strokeWidth='3' stroke='#fff'></circle>
          </g>
        }
      </g>
    )
  }
}
