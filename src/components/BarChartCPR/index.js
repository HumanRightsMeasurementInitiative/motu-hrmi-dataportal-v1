import React from 'react'
import PropTypes from 'prop-types'

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
    const h = 50

    const cx = width / 2
    const cy = height / 2

    return (
      <div ref='chartContainer'>
        <svg width={width} height={height}>
          <rect
            x={cx - w / 2}
            y={cy - h / 2}
            width={w}
            height={h}
            fill="#3378ae"
          />
          <rect
            x={cx - w / 2}
            y={cy - 1}
            width={w}
            height="2"
            fill="white"
          />
          <Text anchor="cl" x={(cx + w / 2) + 5} y={(cy - h / 2)} fill="#3378ae" fontSize="18">{percentile90.toFixed(1)}</Text>
          <Text anchor="cl" x={(cx + w / 2) + 45} y={(cy - h / 2)} fill="#616161" fontSize="0.6em">90th perc.</Text>

          <Text anchor="cl" x={(cx + w / 2) + 5} y={(cy + h / 2)} fill="#3378ae" fontSize="18">{percentile10.toFixed(1)}</Text>
          <Text anchor="cl" x={(cx + w / 2) + 45} y={(cy + h / 2)} fill="#616161" fontSize="0.6em">10th perc.</Text>

          <Text anchor="cr" x={(cx - w / 2) - 45} y={(cy + 2)} fill="#616161" fontSize="0.6em">
            Avg. score
          </Text>
          <Text anchor="cr" x={(cx - w / 2) - 5} y={(cy)} fill="#3378ae" fontWeight="bold" fontSize="18">
            {mean.toFixed(1)}
          </Text>
        </svg>
      </div>
    )
  }
}

function Text({ x = 0, y = 0, anchor = 'tl', ...props }) {
  const [vert, horiz] = anchor.split('')
  const baseline = { t: 'hanging', c: 'central', b: 'baseline' }[vert]
  const textAnchor = { l: 'start', c: 'middle', r: 'end' }[horiz]

  return (
    <text
      fontFamily="sans-serif"
      {...props}
      x={x}
      y={y}
      textAnchor={textAnchor}
      alignmentBaseline={baseline}
      dominantBaseline={baseline}
    />
  )
}
