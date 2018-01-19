import React from 'react'
import PropTypes from 'prop-types'

export default class CountryName extends React.Component {
  static propTypes = {
    translateX: PropTypes.number.isRequired,
    translateY: PropTypes.number.isRequired,
    highPos: PropTypes.number.isRequired,
    corePos: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    minValue: PropTypes.number.isRequired,
    currCountry: PropTypes.object,
    country: PropTypes.object.isRequired,
    onItemClick: PropTypes.func,
  }

  onClick = () => {
    const { country, onItemClick } = this.props
    onItemClick(country)
  }

  render() {
    const { translateX, translateY, highPos, corePos, maxValue, minValue, currCountry, country } = this.props
    const isActive = currCountry && currCountry.name === country.name
    return (
      <g transform={'translate(' + translateX + ', ' + translateY + ')'} onClick={this.onClick}>
        { highPos > 0 &&
          <rect height={highPos} width='6' x='-3' fill={isActive ? '#b2eacf' : '#eee'}></rect>
        }
        { corePos > 0 &&
          <g>
            <circle className='core' cy={highPos - corePos} r='5' fill='#00b95f'></circle>
            <circle className='high' r='6' fill='#00b95f'></circle>
            <circle className='high' r='3' fill='#00b95f' strokeWidth='2px' stroke='#fff'></circle>
          </g>
        }
        { isActive &&
          <g>
            <text y='-20' fontSize='12' fill='#616161' fontWeight='600'>{maxValue} %</text>
            <text y='-8' fontSize='12' fill='#616161' fontWeight='600'>{minValue} %</text>
          </g>
        }
      </g>
    )
  }
}
