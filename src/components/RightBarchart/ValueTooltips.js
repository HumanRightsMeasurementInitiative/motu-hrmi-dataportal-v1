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
            { highIncomeValue && <text y={-highIncomeValue + 4} x={10} fontSize='16' fill='#616161' fontWeight='700'>{highIncomeDisplay}%</text>}
            { coreValue && <text y={-coreValue + 4} x={10} fontSize='16' fill='#616161' fontWeight='700'>{coreDisplay}%</text>}
          </g>
        }
        { !isESR && isActive &&
          <text y={-maxValue - 4} fontSize='16' fill='#3378ae' fontWeight='700' textAnchor='middle'>
            {valueDisplay}
          </text>
        }
      </g>
    )
  }
}
