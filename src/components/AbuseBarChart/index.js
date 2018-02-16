import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

export default class GeoMiniBarChart extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    height: PropTypes.number.isRequired,
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
    const margin = { top: 10, right: 0, bottom: 10, left: 14 }
    const barX = d3.scaleLinear().domain([0, 4]).range([margin.left + 30, containerWidth - 30])

    // TODO remove
    const abuseKeys = ['suspected criminals', 'non-violent political', 'violent political', 'discriminated groups', 'indiscriminate']
    const abuseData = data.filter(item => abuseKeys.indexOf(item[0].toLowerCase()) !== -1)
    // TODO end

    return (
      <div ref='chartContainer' style={{ margin: '10px 0' }}>
        <svg height={height} width={containerWidth}>
          <g>
            <text y={margin.top - 2} fontSize='10px' fill='#ddd'>100%</text>
            <line x1='0' y1={margin.top} x2={containerWidth} y2={margin.top} stroke='#ddd' />
            <text y={height / 2 - 2} fontSize='10px' fill='#ddd'>50%</text>
            <line x1='0' y1={margin.top + (height - margin.top - margin.bottom) / 2} x2={containerWidth} y2={margin.top + (height - margin.top - margin.bottom) / 2} stroke='#ddd' />
            <text y={height - margin.bottom - 2} fontSize='10px' fill='#ddd'>0%</text>
            <line x1='0' y1={height - margin.bottom} x2={containerWidth} y2={height - margin.bottom} stroke='#bdbdbd'/>
          </g>
          <g transform={'translate(0,' + height + ')'}>
            <text x={barX(0)} fontSize='10px' fill='#aaa'>A</text>
            <text x={barX(1)} fontSize='10px' fill='#aaa'>B</text>
            <text x={barX(2)} fontSize='10px' fill='#aaa'>C</text>
            <text x={barX(3)} fontSize='10px' fill='#aaa'>D</text>
            <text x={barX(4)} fontSize='10px' fill='#aaa'>E</text>
          </g>
          <g>
            { abuseData.length !== 0 &&
              abuseKeys.map((item, i) => {
                const currValue = abuseData.filter(d => d[0].toLowerCase() === item)
                const isExist = currValue.length !== 0
                const barHeight = isExist ? currValue[0][1] * 100 : 0
                return <rect key={i} x={item ? barX(i) : 0} y={height - margin.bottom - barHeight} height={isExist ? barHeight : 0} width={10} fill='#ddd'></rect>
              })
            }
          </g>
        </svg>
      </div>
    )
  }
}
