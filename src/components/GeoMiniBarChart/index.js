import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

export default class GeoMiniBarChart extends React.Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    right: PropTypes.string.isRequired,
    esrStandard: PropTypes.string,
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
    const { height, data, right, esrStandard } = this.props
    const { containerWidth } = this.state
    const margin = { top: 4, right: 0, bottom: 4, left: 14 }
    const barX = d3.scaleLinear().domain([0, data.countries.length - 1]).range([margin.left + 20, containerWidth - 20])
    const cprHeight = d3.scaleLinear().domain([0, 10]).range([0, height - margin.top - margin.bottom])
    const esrHeight = d3.scaleLinear().domain([0, 100]).range([0, height - margin.top - margin.bottom])

    const barWidth = containerWidth ? (containerWidth - margin.left) / data.countries.length * 0.6 : 0

    data.countries.sort(function (a, b) {
      if (esrStandard && a.rights[esrStandard] && b.rights[esrStandard]) {
        return a.rights[esrStandard][right] - b.rights[esrStandard][right]
      } else if (!esrStandard && a.rights.cpr && b.rights.cpr) {
        return a.rights.cpr[right].mean - b.rights.cpr[right].mean
      }
    })

    return (
      <div ref='chartContainer'>
        <svg height={height} width={containerWidth}>
          <g>
            <text x='0' y={8} fontSize='10px' fill='#ddd'>{esrStandard ? '100%' : '10'}</text>
            <line x1={esrStandard ? margin.left + 5 : margin.left} y1={margin.top} x2={containerWidth} y2={margin.top} stroke='#ddd' />
            <text x='4' y={height - 2} fontSize='10px' fill='#ddd'>{esrStandard ? '0%' : '0'}</text>
            <line x1={esrStandard ? margin.left + 5 : margin.left} y1={height - margin.bottom} x2={containerWidth} y2={height - margin.bottom} stroke='#bdbdbd'/>
          </g>
          {data.countries.map((country, i) => {
            const esrValue = esrStandard && country.rights[esrStandard] ? country.rights[esrStandard][right] : 0
            const cprValue = !esrStandard && country.rights.cpr ? country.rights.cpr[right].mean : 0
            const value = esrStandard ? esrHeight(esrValue) : cprHeight(cprValue)
            const x = value ? barX(i) : 0
            return (<g key={i}>
              <rect x={x} y={height - value - margin.top} height={Math.round(value)} width={barWidth} fill='#ddd'></rect>
            </g>)
          })}
        </svg>
      </div>
    )
  }
}
