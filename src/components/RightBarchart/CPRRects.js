import React from 'react'
import PropTypes from 'prop-types'

export default class CountryName extends React.Component {
  static propTypes = {
    translateX: PropTypes.number.isRequired,
    translateY: PropTypes.number.isRequired,
    meanValue: PropTypes.number.isRequired,
    diffValue: PropTypes.number.isRequired,
    country: PropTypes.object.isRequired,
    onItemClick: PropTypes.func.isRequired,
  }

  onClick = () => {
    const { country, onItemClick } = this.props
    onItemClick(country)
  }

  render() {
    const { translateX, translateY, meanValue, diffValue } = this.props

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
      </g>
    )
  }
}
