import React from 'react'
import PropTypes from 'prop-types'

export default class RadarChartItem extends React.Component {
  static propTypes = {
    r: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    currRight: PropTypes.string.isRequired,
    rightName: PropTypes.string.isRequired,
    translateX: PropTypes.number.isRequired,
    translateY: PropTypes.number.isRequired,
    onRightClick: PropTypes.func,
  }

  onClick = () => {
    const { rightName, onRightClick } = this.props
    onRightClick(rightName)
  }

  render() {
    const { r, index, currRight, rightName, translateX, translateY } = this.props
    const angleSlice = Math.PI / 6

    return (
      <g transform={'translate(' + translateX + ',' + translateY + ')'} onClick={this.onClick}>
        <text
          x={r * Math.cos(angleSlice * index)}
          y={r * Math.sin(angleSlice * index)}
          dy='5'
          fontSize='10'
          textAnchor={ index > 2 && index < 10 ? (index !== 3 && index !== 9 ? 'end' : 'middle') : 'start' }
          opacity={ currRight === 'all' || currRight === rightName ? 1 : 0.2 }
        >{rightName}</text>
      </g>
    )
  }
}
