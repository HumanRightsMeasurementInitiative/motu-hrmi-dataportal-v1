import React from 'react'
import PropTypes from 'prop-types'

export default class CountryName extends React.Component {
  static propTypes = {
    translateX: PropTypes.number.isRequired,
    translateY: PropTypes.number.isRequired,
    highPos: PropTypes.number.isRequired,
    corePos: PropTypes.number.isRequired,
    country: PropTypes.object.isRequired,
    onItemClick: PropTypes.func.isRequired,
  }

  onClick = () => {
    const { country, onItemClick } = this.props
    onItemClick(country)
  }

  render() {
    const { translateX, translateY, highPos, corePos } = this.props

    return (
      <g transform={'translate(' + translateX + ', ' + translateY + ')'} onClick={this.onClick}>
        { highPos > 0 &&
          <rect height={highPos} width='6' x='-3' fill='#eee'></rect>
        }
        { highPos > 0 &&
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
