import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import CountryName from './CountryName'
import ESRRects from './ESRRects'
import CPRRects from './CPRRects'

export default class RightBarchart extends React.Component {
  static propTypes = {
    isESR: PropTypes.bool.isRequired,
    currRight: PropTypes.string.isRequired,
    chartHeight: PropTypes.number.isRequired,
    chartWidth: PropTypes.number.isRequired,
    rightsByRegionCountries: PropTypes.array.isRequired,
    currCountry: PropTypes.object,
    onItemClick: PropTypes.func,
  }

  render() {
    const { isESR, currRight, chartHeight, chartWidth, rightsByRegionCountries, currCountry, onItemClick } = this.props
    const yAxisRange = Array.from(Array(11).keys()).reverse()
    const yAxisRate = isESR ? 10 : 1

    if (chartHeight === 0) return null

    const margin = {
      top: 30,
      left: 20,
      bottom: 30,
      right: 20,
    }

    const xScale = d3.scaleLinear().domain([0, rightsByRegionCountries.length]).range([0, chartWidth - margin.left - margin.right - 30])
    const yScale = d3.scaleLinear().domain([0, 10 * yAxisRate]).range([0, chartHeight - margin.top - margin.bottom])

    return (
      <div ref='chartContainer'>
        <svg ref='svg' height={chartHeight} width={chartWidth}>
          <g transform={'translate(' + margin.left + ',' + margin.top + ')'}>
            <g ref='xAxis' transform={'translate(0,' + (chartHeight - margin.top - margin.bottom + 10) + ')'}>
              {
                rightsByRegionCountries.map((country, i) => {
                  return (
                    <g key={i} transform={'translate(' + (xScale(i) + 30) + ', 0) rotate(-45)'}>
                      <CountryName currCountry={currCountry} country={country} onItemClick={onItemClick}>
                        {country.countryCode}
                      </CountryName>
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
                        <text dy='-2px' fontSize='10px' fill='#bdbdbd'>
                          {isESR ? item * 10 + ' %' : item}
                        </text>
                      }
                      <line x1='0' y1='0' y2='0' x2={chartWidth - margin.left - margin.right}
                        stroke={item % 2 === 0 ? '#bdbdbd' : '#eee'}
                        strokeWidth='1px'
                      />
                    </g>
                  )
                })
              }
            </g>
            {
              rightsByRegionCountries.map((country, i) => {
                const { esr_hi: esrHi, esr_core: esrCore, cpr } = country.rights
                const currentRightFrom = container => container ? container[currRight] : null
                const value = isESR
                  ? { highIncome: currentRightFrom(esrHi), core: currentRightFrom(esrCore) }
                  : (currentRightFrom(cpr) || { mean: null, percentile10: null, percentile90: null })

                return (
                  <g ref='bars' key={i}>
                    { isESR &&
                      <ESRRects
                        translateX={xScale(i) + 30}
                        translateY={chartHeight - margin.top - margin.bottom}
                        highIncomeValue={yScale(value.highIncome)}
                        coreValue={yScale(value.core)}
                        highIncomeDisplay={Math.round(value.highIncome).toFixed(0) || 'N/A'}
                        coreDisplay={Math.round(value.core).toFixed(0) || 'N/A'}
                        currCountry={currCountry}
                        country={country}
                        onItemClick={onItemClick}
                      />
                    }
                    { !isESR &&
                      <CPRRects
                        translateX={xScale(i) + 30}
                        translateY={chartHeight - margin.top - margin.bottom}
                        value={yScale(value.mean)}
                        minValue={yScale(value.percentile10)}
                        maxValue={yScale(value.percentile90)}
                        valueDisplay={value.mean !== null ? `${value.mean}/10` : 'N/A'}
                        currCountry={currCountry}
                        country={country}
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
