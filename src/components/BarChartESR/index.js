import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

export default class BarChartESR extends React.Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
  }

  constructor() {
    super()
    this.state = { containerWidth: 0 }
  }

  componentDidMount() {
    this.fitContainer()
    window.addEventListener('resize', this.fitContainer)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.fitContainer)
  }

  fitContainer = () => {
    const currentWidth = this.refs.chartContainer.offsetWidth
    const shouldResize = this.state.containerWidth !== currentWidth
    if (shouldResize) {
      this.setState({ containerWidth: currentWidth })
    }
  }

  render() {
    const { height, data } = this.props
    const { containerWidth } = this.state
    const axis = [
      { height: 0.2 * height, text: '100%' },
      { height: 0.6 * height, text: '50%' },
      { height: height, text: '0%' },
    ]
    const bars = data.map((right, index) => {
      const x = containerWidth / 5 * (index + 1) - 0.05 * containerWidth
      const rectHeight = d3.scaleLinear().range([0, 0.8 * height]).domain([0, 100])
      return <rect key={index} x={x} y={height - rectHeight(right.value)} width={0.05 * containerWidth} height={rectHeight(right.value)} fill="#2E65A1"/>
    })
    return (
      <div ref='chartContainer'>
        <svg width={containerWidth} height={height}>
          {axis.map((line, index) => {
            if (index < 2) {
              return (
                <g key={index}>
                  <text x="0" y={line.height - 2}>{line.text}</text>
                  <line x1="0" y1={line.height} x2={containerWidth} y2={line.height} stroke="#2E65A1" opacity="0.25"></line>
                </g>
              )
            } else {
              return (
                <g key={index}>
                  <text x="0" y={line.height - 2}>{line.text}</text>
                  <line key={index} x1="0" y1={line.height} x2={containerWidth} y2={line.height} stroke="#2E65A1"></line>
                </g>
              )
            }
          })}
          {bars}
        </svg>
      </div>
    )
  }
}