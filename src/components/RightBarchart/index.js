import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import CountryName from './CountryName'
import ESRRects from './ESRRects'
import CPRRects from './CPRRects'

export default class ESRRightBar extends React.Component {
  static propTypes = {
    isESR: PropTypes.bool.isRequired,
    currRight: PropTypes.string.isRequired,
    chartHeight: PropTypes.number.isRequired,
    chartWidth: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    currCountry: PropTypes.object,
    onItemClick: PropTypes.func.isRequired,
  }

  render() {
    const { isESR, currRight, chartHeight, chartWidth, data, currCountry, onItemClick } = this.props
    const yAxisRange = Array.from(Array(11).keys()).reverse()
    const yAxisRate = isESR ? 10 : 1
    const keyword = isESR ? 'ESR' : 'CPR'

    const margin = {
      top: 30,
      left: 20,
      bottom: 70,
      right: 20,
    }
    const xScale = d3.scaleLinear().domain([0, data.length]).range([0, chartWidth - margin.left - margin.right - 30])
    const yScale = d3.scaleLinear().domain([0, 10 * yAxisRate]).range([0, chartHeight - margin.top - margin.bottom])

    data.sort(function (a, b) {
      const A = a.name.toLowerCase()
      const B = b.name.toLowerCase()
      if (A < B) return -1
      if (A > B) return 1
      return 0
    })

    return (
      <div ref='chartContainer'>
        <svg ref='svg' height={chartHeight} width={chartWidth}>
          <g transform={'translate(' + margin.left + ',' + margin.top + ')'}>
            <g ref='xAxis' transform={'translate(0,' + (chartHeight - margin.top - margin.bottom + 10) + ')'}>
              {
                data.map((item, i) => {
                  return (
                    <g key={i} transform={'translate(' + (xScale(i) + 30) + ', 0)rotate(-45)'}>
                      <CountryName currCountry={currCountry} country={item} onItemClick={onItemClick}>{item.name}</CountryName>
                    </g>
                  )
                })
              }
            </g>
            <g ref='yAxis'>
              {
                yAxisRange.map((item, i) => {
                  return (
                    <g key={i} transform={'translate(0,' + yScale(i * yAxisRate) + ')'}>
                      { item % 2 === 0 &&
                        <text dy='-2px' fontSize='10px' fill='#bdbdbd'>{isESR ? item * 10 + ' %' : item}</text>
                      }
                      <line x1='0' y1='0' y2='0' x2={chartWidth - margin.left - margin.right}
                        stroke={item % 2 === 0 ? '#bdbdbd' : '#eee'}
                        strokeWidth='1px'
                      ></line>
                    </g>
                  )
                })
              }
            </g>
            {
              data.map((item, i) => {
                const value = item.rights[keyword].filter(item => item.name === currRight)[0]
                return (
                  <g ref='bars' key={i}>
                    { isESR &&
                      <ESRRects
                        translateX={xScale(i) + 30}
                        translateY={chartHeight - margin.top - margin.bottom - yScale(value.maxValue)}
                        highPos={yScale(value.maxValue)}
                        corePos={yScale(value.minValue)}
                        maxValue={value.maxValue}
                        minValue={value.minValue}
                        currCountry={currCountry}
                        country={item}
                        onItemClick={onItemClick}
                      />
                    }
                    { !isESR &&
                      <CPRRects
                        translateX={xScale(i) + 30}
                        translateY={chartHeight - margin.top - margin.bottom - yScale((value.maxValue + value.minValue) / 2)}
                        meanValue={yScale((value.maxValue + value.minValue) / 2)}
                        diffValue={yScale(value.maxValue - value.minValue)}
                        textValue={(value.maxValue + value.minValue) / 2}
                        currCountry={currCountry}
                        country={item}
                        onItemClick={onItemClick}
                      />
                    }
                  </g>
                )
              })
            }
          </g>
        </svg>
      </div>
    )
  }
}
