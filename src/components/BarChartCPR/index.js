import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

export default class BarChartCPR extends React.Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    rightCode: PropTypes.string.isRequired,
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
    const { height, data, rightCode } = this.props
    const { containerWidth: width } = this.state
    const { mean, percentile10, percentile90 } = data[rightCode]
    const w = 8
    const h = 100

    return (
      <div ref='chartContainer'>

        <svg width={width} height={height}>
          <rect
            x={(width - w) / 2}
            y={(height - h) / 2}
            width="10"
            height="100"
            fill="#3378ae"
          />
          <rect
            x={(width - w) / 2}
            y={(height - 2) / 2}
            width="10"
            height="2"
            fill="white"
          />
          <text x={((width - w) / 2) / 2 + 110} y={h} fill='#616161'>90</text>
          <text x={((width - w) / 2) / 2 + 122} y={h - 5} fill='red' fontSize="0.8em">th</text>
          <text x={((width - w) / 2) / 2 + 135} y={h} fill='#616161'>perc.</text>

          <text x={((width - w) / 2) / 2 + 110} y={h + 100} fill='#616161'>10</text>
          <text x={((width - w) / 2) / 2 + 122} y={h + 95} fill='red' fontSize="0.8em">th</text>
          <text x={((width - w) / 2) / 2 + 135} y={h + 100} fill='#616161'>perc.</text>

          <text x={((width - w) / 2) / 2 - 30} y={h + h / 2} fill='#616161'>Avg. score</text>

          <text x={((width - w) / 2) / 2 + 25} y={(h + h / 2)} fill="#3378ae" fontWeight="bold" fontSize="18">{mean.toFixed(2)}</text>
          <text x={((width - w) / 2) / 2 + 75} y={h} fill="#3378ae" fontSize="18">{percentile90.toFixed(2)}</text>
          <text x={((width - w) / 2) / 2 + 75} y={h + 100} fill="#3378ae" fontSize="18">{percentile10.toFixed(2)}</text>
        </svg>
      </div>
    )
  }
}
