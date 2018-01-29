import React from 'react'
import PropTypes from 'prop-types'
import { joinClassName as jcn } from '../utils'
import styles from './style.css'

export default class CountryName extends React.Component {
  static propTypes = {
    translateX: PropTypes.number.isRequired,
    translateY: PropTypes.number.isRequired,
    highPos: PropTypes.number.isRequired,
    corePos: PropTypes.number.isRequired,
    currCountry: PropTypes.object,
    country: PropTypes.object.isRequired,
    onItemClick: PropTypes.func,
  }

  onClick = () => {
    const { country, onItemClick } = this.props
    if (onItemClick !== undefined) onItemClick(country)
  }

  render() {
    const { translateX, translateY, highPos, corePos, currCountry, country, onItemClick } = this.props
    const isActive = currCountry && currCountry.name === country.name
    return (
      <g transform={'translate(' + translateX + ', ' + translateY + ')'} onClick={this.onClick} className={jcn({ clickable: onItemClick !== undefined }, styles)}>
        { highPos > 0 &&
          <rect height={highPos} width='6' x='-3' fill={isActive ? '#b2eacf' : 'rgba(0, 0, 0, .1)'}></rect>
        }
        { corePos > 0 &&
          <g>
            <circle className='core' cy={highPos - corePos} r='5' fill='#00b95f'></circle>
            <circle className='high' r='6' fill='#00b95f'></circle>
            <circle className='high' r='3' fill='#00b95f' strokeWidth='2px' stroke='#fff'></circle>
          </g>
        }
      </g>
    )
  }
}
