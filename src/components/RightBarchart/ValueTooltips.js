import React from 'react'
import PropTypes from 'prop-types'

export default class ValueTooltips extends React.Component {
  static propTypes = {
    isESR: PropTypes.bool.isRequired,
    translateX: PropTypes.number.isRequired,
    translateY: PropTypes.number.isRequired,
    country: PropTypes.object.isRequired,
    currCountry: PropTypes.object,
    highIncomeDisplay: PropTypes.string,
    coreDisplay: PropTypes.string,
    highIncomeValue: PropTypes.number,
    coreValue: PropTypes.number,
    maxDisplay: PropTypes.string,
    minDisplay: PropTypes.string,
    meanDisplay: PropTypes.string,
    maxValue: PropTypes.number,
    minValue: PropTypes.number,
    meanValue: PropTypes.number,
    hoveredCountry: PropTypes.string,
  }

  render() {
    const { isESR, translateX, translateY, currCountry, country, highIncomeDisplay, coreDisplay, highIncomeValue, coreValue, maxDisplay, minDisplay, meanDisplay, maxValue, minValue, meanValue, hoveredCountry } = this.props
    const isActive = currCountry && currCountry === country
    return (
      <g transform={'translate(' + translateX + ', ' + translateY + ')'}>
        { isESR && isActive &&
          <g>
            { highIncomeValue && <text y={-highIncomeValue + 4} x={10} fontSize='16' fill='#616161' fontWeight='700'>{highIncomeDisplay}%</text>}
            { coreValue && <text y={Math.abs(highIncomeValue - coreValue) < 20 ? (highIncomeValue > coreValue ? -highIncomeValue + 18 : -highIncomeValue - 10) : -coreValue + 4} x={10} fontSize='16' fill='#616161' fontWeight='700'>{coreDisplay}%</text>}
          </g>
        }
        { !isESR && (isActive || hoveredCountry === country.countryCode) &&
          <g>
            <text y={maxValue - minValue < 20 ? -meanValue - 2 : -maxValue + 8} x='10' fontSize='14' fill='#3378ae' fontWeight='500'>
              {maxDisplay}
            </text>
            <text y={maxValue - minValue < 20 ? -meanValue + 10 : -minValue} x='10' fontSize='14' fill='#3378ae' fontWeight='500'>
              {minDisplay}
            </text>
            <text y={-meanValue + 4} x='-10' fontSize='16' fill='#3378ae' fontWeight='700' textAnchor='end'>
              {meanDisplay}
            </text>
          </g>
        }
      </g>
    )
  }
}
