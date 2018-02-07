import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import { get } from 'lodash'

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
    const margin = {
      top: 60,
      left: 20,
      bottom: 40,
      right: 20,
    }

    const years = d3.range(2005, 2015 + 1)
    const yAxisTicks = [0, 25, 50, 75, 100]

    const xScale = d3.scaleLinear()
      .domain([years[0], years[years.length - 1]])
      .range([60, chartWidth - margin.left - margin.right - 20])
    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([chartHeight - margin.top - margin.bottom, 0])
    const buildLine = d3.line()
      .defined(d => d.value !== null)
      .x(d => xScale(d.year))
      .y(d => yScale(d.value))

    const buildLineWithStandard = (esrStandard) => (country, i) => {
      const lineData = years.map(year => ({
        year,
        value: get(country, `rights.${esrStandard}Historical.${year}.rights.${currRight}`, null),
      }))
      return {
        esrStandard,
        path: buildLine(lineData),
      }
    }
    const lines = [].concat(
      data.map(buildLineWithStandard('esrCore')),
      data.map(buildLineWithStandard('esrHI')),
    )

    return (
      <div>
        <svg height={chartHeight} width={chartWidth}>
          <g transform={'translate(' + margin.left + ',' + margin.top / 2 + ')'}>
            <text x='14' fontSize='12px' textAnchor='middle' textDecoration='underline'>Year:</text>
            {
              years.map((item, i) => (
                <YearItem key={i} isActive={item === currYear} posX={xScale(item)} onItemClick={onItemClick}>{item}</YearItem>
              ))
            }
          </g>
          <g transform={'translate(' + margin.left + ',' + margin.top + ')'}>
            {
              yAxisTicks.map((tick, i) => (
                <g key={i} transform={'translate(0,' + yScale(tick) + ')'}>
                  {tick % 2 === 0 &&
                    <text dy='-2px' fontSize='10px' fill='#616161'>{tick + ' %'}</text>
                  }
                  <line
                    x1='0'
                    y1='0'
                    y2='0'
                    x2={chartWidth - margin.left - margin.right}
                    stroke='black'
                    strokeWidth='1'
                    strokeOpacity={tick % 2 === 0 ? '0.2' : '0.1'}
                    shapeRendering='crispEdges' // Only because it's horizontal!
                  />
                </g>
              ))
            }
          </g>
          {lines.map(({ path, esrStandard }, i) => (
            <g key={i} transform={'translate(' + margin.left + ',' + margin.top + ')'}>
              <path d={path} stroke='#00b95f' strokeWidth='3' opacity='0.1' fill='none' />
            </g>
          ))}
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
