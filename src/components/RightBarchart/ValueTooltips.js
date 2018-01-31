import React from 'react'
import PropTypes from 'prop-types'

export default class CountryName extends React.Component {
  static propTypes = {
    isESR: PropTypes.bool.isRequired,
    translateX: PropTypes.number.isRequired,
    translateY: PropTypes.number.isRequired,
    country: PropTypes.object.isRequired,
    currCountry: PropTypes.object,
    highIncomeDisplay: PropTypes.string,
    coreDisplay: PropTypes.string,
    valueDisplay: PropTypes.string,
    highIncomeValue: PropTypes.number,
    coreValue: PropTypes.number,
    maxValue: PropTypes.number,
  }

  render() {
    const { isESR, translateX, translateY, currCountry, country, highIncomeDisplay, coreDisplay, valueDisplay, highIncomeValue, coreValue, maxValue } = this.props
    const isActive = currCountry && currCountry === country
    return (
      <g transform={'translate(' + translateX + ', ' + translateY + ')'}>
        { isESR && isActive &&
          <g>
            <text y={-highIncomeValue + 3} x={8} fontSize='12' fill='#616161' fontWeight='600'>{highIncomeDisplay}%</text>
            <text y={-coreValue + 3} x={8} fontSize='12' fill='#616161' fontWeight='600'>{coreDisplay}%</text>
          </g>
        }
        { !isESR && isActive &&
          <text y={-maxValue - 4} fontSize='12' fill='#3378ae' fontWeight='600' textAnchor='middle'>
            {valueDisplay}
          </text>
        }
      </g>
    )
  }
}
