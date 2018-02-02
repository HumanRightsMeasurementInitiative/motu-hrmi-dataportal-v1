import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

export default class BarChartESR extends React.Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
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

    const formatedData = Object.keys(data).filter(item => data[item] < 100).map(item => {
      return { value: data[item] }
    })

    const bars = formatedData.map((right, index) => {
      const x = containerWidth / 5 * (index + 1) - 0.05 * containerWidth
      const rectHeight = d3.scaleLinear().range([0, 0.8 * height]).domain([0, 100])
      return (
        <g key={index}>
          <rect x={x} y={height - rectHeight(right.value)} width={0.05 * containerWidth} height={rectHeight(right.value)} fill='rgba(0, 0, 0, .1)'/>
          <circle cx={x + 0.025 * containerWidth} cy={height - rectHeight(right.value)} r={0.025 * containerWidth} fill='#00A551'></circle>
        </g>
      )
    })

    return (
      <div ref='chartContainer'>
        <svg width={containerWidth} height={height}>
          {
            axis.map((line, index) => (
              <g key={index}>
                <text x='0' y={line.height - 2} fontSize='10px' fill='#616161'>{line.text}</text>
                <line x1='0' y1={line.height} x2={containerWidth} y2={line.height} stroke='#616161' opacity={index < 2 ? '0.25' : '1'}></line>
              </g>
            ))
          }
          {bars}
        </svg>
      </div>
    )
  }
}
