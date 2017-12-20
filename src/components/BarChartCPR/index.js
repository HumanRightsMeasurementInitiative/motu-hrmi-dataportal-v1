import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

export default class BarChartCPR extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
  }

  render() {
    const { width, height, data } = this.props
    const axis = [
      { height: 0.2 * height, text: '10' },
      { height: 0.5 * height, text: '5' },
      { height: 0.8 * height, text: '0' },
    ]
    const bars = data.map((right, index) => {
      const x = width / 7 * (index + 1) - 0.05 * width
      const rectHeight = d3.scaleLinear().range([0, 0.6 * height]).domain([0, 10])
      return (
        <g key={index}>
          <rect x={x} y={0.8 * height - rectHeight(right.value)} width={0.05 * width} height={rectHeight(right.value)} fill="#00A551"/>
          <line x1={x} y1={0.8 * height - rectHeight(right.maxValue)} x2={x + 0.05 * width} y2={0.8 * height - rectHeight(right.maxValue)} stroke="red" strokeWidth="2" opacity="0.4"/>
          <line x1={x} y1={0.8 * height - rectHeight(right.minValue)} x2={x + 0.05 * width} y2={0.8 * height - rectHeight(right.minValue)} stroke="red" strokeWidth="2" opacity="0.4"/>
          <line x1={x + 0.025 * width} y1={0.8 * height - rectHeight(right.maxValue)} x2={x + 0.025 * width} y2={0.8 * height - rectHeight(right.minValue)} stroke="red" strokeWidth="2" opacity="0.4"/>
        </g>
      )
    })
    return (
      <svg width={width} height={height}>
        {axis.map((line, index) => {
          if (index < 2) {
            return (
              <g key={index}>
                <text x="0" y={line.height - 2}>{line.text}</text>
                <line x1="0" y1={line.height} x2={width} y2={line.height} stroke="#00A551" opacity="0.25" />
              </g>
            )
          } else {
            return (
              <g key={index}>
                <text x="0" y={line.height - 2}>{line.text}</text>
                <line x1="0" y1={line.height} x2={width} y2={line.height} stroke="#00A551" />
              </g>
            )
          }
        })}
        {bars}
      </svg>
    )
  }
}
