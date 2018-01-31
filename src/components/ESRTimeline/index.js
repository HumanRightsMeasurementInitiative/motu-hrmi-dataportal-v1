import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

export default class ESRRightBar extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    chartHeight: PropTypes.number.isRequired,
    chartWidth: PropTypes.number.isRequired,
    currYear: PropTypes.number.isRequired,
    onItemClick: PropTypes.func.isRequired,
  }

  render() {
    const { data, chartHeight, chartWidth, currYear, onItemClick } = this.props
    const yAxisRate = 20
    const margin = {
      top: 40,
      left: 20,
      bottom: 20,
      right: 20,
    }
    const time = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015]
    const yAxisRange = Array.from(Array(6).keys())

    const xScale = d3.scaleLinear().domain([time[0], time[time.length - 1]]).range([60, chartWidth - margin.left - margin.right - 20])
    const yScale = d3.scaleLinear().domain([100, 0]).range([0, chartHeight - margin.top - margin.bottom])
    var line = d3.line().x(function (d) { return xScale(d.year) }).y(function (d) { return yScale(d.value) })

    const lineData = [{ year: '2005', value: 0 }, { year: '2006', value: 20 }, { year: '2007', value: 40 }, { year: '2008', value: 20 }, { year: '2009', value: 70 }, { year: '2010', value: 75 }, { year: '2011', value: 88 }, { year: '2012', value: 30 }, { year: '2013', value: 60 }, { year: '2014', value: 70 }, { year: '2015', value: 20 }]

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
          <g transform={'translate(' + margin.left + ',' + margin.top + ')'}>
            <path d={line(lineData)} stroke='#00b95f' strokeWidth='2px' fill='none' opacity='.8'></path>
          </g>
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
