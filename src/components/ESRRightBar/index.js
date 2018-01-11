import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import CountryName from './CountryName'

export default class ESRRightBar extends React.Component {
  static propTypes = {
    chartHeight: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    onItemClick: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = { containerWidth: 0 }
  }

  componentDidMount() {
    this.refs.svg.style.width = this.refs.chartContainer.offsetWidth + 'px'
    this.setState({ containerWidth: this.refs.chartContainer.offsetWidth })
  }

  render() {
    const { chartHeight, data, onItemClick } = this.props

    const margin = {
      top: 36,
      left: 20,
      bottom: 70,
      right: 20,
    }
    const xScale = d3.scaleLinear().domain([0, data.length]).range([0, this.state.containerWidth - 30])

    return (
      <div ref='chartContainer'>
        <svg ref='svg' height={chartHeight * 0.7} style={{ 'background': 'rgba(23, 4, 4, .1)' }}>
          <g transform={'translate(' + margin.left + ',' + (chartHeight * 0.68 - margin.bottom) + ')'}>
            <g ref='xAxis'>
              {
                data.map((item, i) => {
                  return (
                    <g key={i} transform={'translate(' + (xScale(i) + 30) + ', 0)rotate(-45)'}>
                      <CountryName country={item.code} onItemClick={onItemClick}>{item.name}</CountryName>
                    </g>
                  )
                })
              }
            </g>
            <g ref='yAxis'>
            </g>
          </g>
        </svg>
      </div>
    )
  }
}
