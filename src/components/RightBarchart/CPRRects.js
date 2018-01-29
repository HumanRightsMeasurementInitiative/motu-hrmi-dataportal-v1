import React from 'react'
import PropTypes from 'prop-types'
import { joinClassName as jcn } from '../utils'
import styles from './style.css'

export default class CountryName extends React.Component {
  static propTypes = {
    translateX: PropTypes.number.isRequired,
    translateY: PropTypes.number.isRequired,
    valueMean: PropTypes.number.isRequired,
    valueDiff: PropTypes.number.isRequired,
    country: PropTypes.object.isRequired,
    onItemClick: PropTypes.func,
  }

  onClick = () => {
    const { country, onItemClick } = this.props
    if (onItemClick !== undefined) onItemClick(country)
  }

  render() {
    const { translateX, translateY, valueMean, valueDiff, onItemClick } = this.props
    return (
      <g transform={'translate(' + translateX + ', ' + translateY + ')'} onClick={this.onClick} className={jcn({ clickable: onItemClick !== undefined }, styles)}>
        { valueMean > 0 &&
          <rect height={valueMean} width='6' x='-3' fill='rgba(0, 0, 0, .1)'></rect>
        }
        { valueDiff > 0 &&
          <g>
            <rect height={valueDiff} width='6' x='-3' y={-valueDiff / 2} fill='#3378ae'></rect>
            <rect height='2' width='6' x='-3' y='-1' fill='#fff'></rect>
          </g>
        }
      </g>
    )
  }
}
