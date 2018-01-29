import React from 'react'
import PropTypes from 'prop-types'

export default class CountryName extends React.Component {
  static propTypes = {
    isESR: PropTypes.bool.isRequired,
    translateX: PropTypes.number.isRequired,
    translateY: PropTypes.number.isRequired,
    country: PropTypes.object.isRequired,
    currCountry: PropTypes.object,
    maxValue: PropTypes.number,
    minValue: PropTypes.number,
    textValue: PropTypes.number,
  }

  render() {
    const { isESR, translateX, translateY, textValue, currCountry, country, maxValue, minValue } = this.props
    const isActive = currCountry && currCountry.name === country.name
    return (
      <g transform={'translate(' + translateX + ', ' + translateY + ')'}>
        { isESR && isActive &&
          <g>
            <text y='-20' fontSize='12' fill='#616161' fontWeight='600'>{maxValue} %</text>
            <text y='-8' fontSize='12' fill='#616161' fontWeight='600'>{minValue} %</text>
          </g>
        }
        { !isESR && isActive &&
          <text y='-8' fontSize='12' fill='#25a9e0' fontWeight='600' textAnchor='middle'>{Math.round(textValue * 10) / 10}/10</text>
        }
      </g>
    )
  }
}
