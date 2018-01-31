import React from 'react'
import PropTypes from 'prop-types'

export default class CountryName extends React.Component {
  static propTypes = {
    translateX: PropTypes.number.isRequired,
    translateY: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    minValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    valueDisplay: PropTypes.string.isRequired,
    currCountry: PropTypes.object,
    country: PropTypes.object.isRequired,
    onItemClick: PropTypes.func,
  }

  onClick = () => {
    const { country, onItemClick } = this.props
    onItemClick(country)
  }

  render() {
    const { translateX, translateY, value, maxValue, minValue, valueDisplay, currCountry, country } = this.props
    const isActive = currCountry && currCountry === country
    return (
      <g transform={'translate(' + translateX + ', ' + translateY + ')'} onClick={this.onClick} cursor='pointer'>
        <rect className="-bar-background" y={-value} height={value} width='6' x='-3' fill='#eee'></rect>
        <rect className="-bar-min-max" y={-maxValue} height={maxValue - minValue} width='6' x='-3' fill='#3378ae'></rect>
        <rect className="-bar-center" y={-value - 1} height='2' width='6' x='-3' fill='#fff'></rect>
        { isActive &&
          <text y={-maxValue - 4} fontSize='12' fill='#3378ae' fontWeight='600' textAnchor='middle'>
            {valueDisplay}
          </text>
        }
      </g>
    )
  }
}
