import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

export default class ESRRightBar extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    chartHeight: PropTypes.number.isRequired,
    chartWidth: PropTypes.number.isRequired,
    currYear: PropTypes.number.isRequired,
    currRight: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
  }

  render() {
    const { data, chartHeight, chartWidth, currYear, currRight, onItemClick } = this.props
    const yAxisRate = 20
    const margin = {
      top: 60,
      left: 20,
      bottom: 40,
      right: 20,
    }

    const time = Object.keys(data[0].rights.esrCoreHistorical).map(year => parseInt(year))
    const yAxisRange = Array.from(Array(6).keys())

    const xScale = d3.scaleLinear().domain([time[0], time[time.length - 1]]).range([60, chartWidth - margin.left - margin.right - 20])
    const yScale = d3.scaleLinear().domain([100, 0]).range([0, chartHeight - margin.top - margin.bottom])
    const line = d3.line().defined(function (d) { return d.value >= 0 }).x(function (d) { return xScale(d.year) }).y(function (d) { return yScale(d.value) })

    return (
      <div>
        <svg height={chartHeight} width={chartWidth}>
          <g transform={'translate(' + margin.left + ',' + margin.top / 2 + ')'}>
            <text x='14' fontSize='12px' textAnchor='middle' textDecoration='underline'>Year:</text>
            {
              time.map((item, i) => (
                <YearItem key={i} isActive={item === currYear} posX={xScale(item)} onItemClick={onItemClick}>{item}</YearItem>
              ))
            }
          </g>
          <g transform={'translate(' + margin.left + ',' + margin.top + ')'}>
            {
              yAxisRange.map((item, i) => (
                <g key={i} transform={'translate(0,' + yScale(i * yAxisRate) + ')'}>
                  { (item === 1 || item === 3 || item === 5) &&
                    <text dy='-2px' fontSize='10px' fill='#616161'>{item * yAxisRate + ' %'}</text>
                  }
                  <line x1='0' y1='0' y2='0' x2={chartWidth - margin.left - margin.right} stroke='#ddd' strokeWidth='1px'></line>
                </g>
              ))
            }
          </g>
          {
            data.map((country, i) => {
              const years = Object.keys(country.rights.esrCoreHistorical)
              const acceptedValues = data => data.value || data.year === 2005 || data.year === 2015
              const lineData = years.map(year => ({ year: parseInt(year), value: country.rights.esrCoreHistorical[year].rights[currRight] }))
              const missingLine = lineData.filter(acceptedValues).map(data => data.value === null ? { ...data, value: 0 } : data)

              return (
                <g key={i} transform={'translate(' + margin.left + ',' + margin.top + ')'}>
                  <path d={line(missingLine)} stroke='#00b95f' strokeWidth='1px' fill='none' strokeDasharray="5, 5" opacity="0.8"></path>
                  <path d={line(lineData)} stroke='#00b95f' strokeWidth='1px' fill='none'></path>
                </g>
              )
            })
          }
        </svg>
      </div>
    )
  }
}

class YearItem extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isActive: PropTypes.bool.isRequired,
    posX: PropTypes.number.isRequired,
    onItemClick: PropTypes.func.isRequired,
  }

  onItemClick = () => {
    const { children, onItemClick } = this.props
    onItemClick(children)
  }

  render() {
    const { children, isActive, posX } = this.props
    return (
      <g onClick={this.onItemClick} cursor='pointer'>
        <text x={posX} fontSize='12px' textAnchor='middle'>{children}</text>
        { isActive &&
          <rect height='3' width='24' y='1' x={posX - 12} fill='#616161'></rect>
        }
      </g>
    )
  }
}
