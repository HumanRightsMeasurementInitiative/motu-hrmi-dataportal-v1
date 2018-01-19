import React from 'react'
import PropTypes from 'prop-types'

export default class CountryName extends React.Component {
  static propTypes = {
    translateX: PropTypes.number.isRequired,
    translateY: PropTypes.number.isRequired,
    meanValue: PropTypes.number.isRequired,
    diffValue: PropTypes.number.isRequired,
    textValue: PropTypes.number.isRequired,
    currCountry: PropTypes.object,
    country: PropTypes.object.isRequired,
    onItemClick: PropTypes.func,
  }

  onClick = () => {
    const { country, onItemClick } = this.props
    onItemClick(country)
  }

  render() {
    const { translateX, translateY, meanValue, diffValue, textValue, currCountry, country } = this.props
    const isActive = currCountry && currCountry.name === country.name
    return (
      <g transform={'translate(' + translateX + ', ' + translateY + ')'} onClick={this.onClick}>
        { meanValue > 0 &&
          <rect height={meanValue} width='6' x='-3' fill='#eee'></rect>
        }
        { diffValue > 0 &&
          <g>
            <rect height={diffValue} width='6' x='-3' y={-diffValue / 2} fill='#3378ae'></rect>
            <rect height='2' width='6' x='-3' y='-1' fill='#fff'></rect>
          </g>
        }
        { isActive &&
          <text y={-diffValue / 2 - 4} fontSize='12' fill='#3378ae' fontWeight='600' textAnchor='middle'>{Math.round(textValue * 10) / 10}/10</text>
        }
      </g>
    )
  }
}
