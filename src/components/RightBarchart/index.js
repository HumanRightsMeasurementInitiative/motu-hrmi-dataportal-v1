import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import CountryName from './CountryName'
import ESRRects from './ESRRects'
import CPRRects from './CPRRects'
import ValueTooltips from './ValueTooltips'

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
      top: 40,
      left: 20,
      bottom: 30,
      right: 20,
    }

    const xScale = d3.scaleLinear().domain([0, rightsByRegionCountries.length]).range([20, chartWidth - margin.left - margin.right])
    const yScale = d3.scaleLinear().domain([0, 10 * yAxisRate]).range([0, chartHeight - margin.top - margin.bottom])

    return (
      <div>
        <svg height={chartHeight} width={chartWidth}>
          <g transform={'translate(' + margin.left + ',' + margin.top + ')'}>
            <g transform={'translate(0,' + (chartHeight - margin.top - margin.bottom + 10) + ')'}>
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
            <g>
              {
                yAxisRange.map((item, i) => {
                  return (
                    <g key={i} transform={'translate(0,' + yScale(i * yAxisRate) + ')'}>
                      { item % 2 === 0 &&
                        <text dy='-2px' fontSize='10px' fill='#616161'>
                          {isESR ? item * 10 + ' %' : item}
                        </text>
                      }
                      <line
                        x1='0'
                        y1='0'
                        y2='0'
                        x2={chartWidth - margin.left - margin.right}
                        stroke='black'
                        strokeWidth='1'
                        strokeOpacity={item % 2 === 0 ? '0.2' : '0.1'}
                        shapeRendering='crispEdges' // Only because it's horizontal!
                      />
                    </g>
                  )
                })
              }
            </g>
            {
              rightsByRegionCountries.map((country, i) => {
                const { esrHI, esrCore, cpr } = country.rights
                const currentRightFrom = container => container ? container[currRight] : null
                const value = isESR
                  ? { highIncome: currentRightFrom(esrHI), core: currentRightFrom(esrCore) }
                  : (currentRightFrom(cpr) || { mean: null, percentile10: null, percentile90: null })

                return (
                  isESR
                  ? <ESRRects
                    key={i}
                    translateX={xScale(i) + 30}
                    translateY={chartHeight - margin.top - margin.bottom}
                    highIncomeValue={yScale(value.highIncome)}
                    coreValue={yScale(value.core)}
                    currCountry={currCountry}
                    country={country}
                    onItemClick={onItemClick}
                  />
                  : <CPRRects
                    key={i}
                    translateX={xScale(i) + 30}
                    translateY={chartHeight - margin.top - margin.bottom}
                    value={yScale(value.mean)}
                    minValue={yScale(value.percentile10)}
                    maxValue={yScale(value.percentile90)}
                    currCountry={currCountry}
                    country={country}
                    onItemClick={onItemClick}
                  />
                )
              })
            }
            {
              rightsByRegionCountries.map((country, i) => {
                const { esrHI, esrCore, cpr } = country.rights
                const currentRightFrom = container => container ? container[currRight] : null
                const value = isESR
                  ? { highIncome: currentRightFrom(esrHI), core: currentRightFrom(esrCore) }
                  : (currentRightFrom(cpr) || { mean: null, percentile10: null, percentile90: null })
                return (
                  <ValueTooltips
                    key={i}
                    isESR={isESR}
                    translateX={xScale(i) + 30}
                    translateY={chartHeight - margin.top - margin.bottom}
                    currCountry={currCountry}
                    country={country}
                    highIncomeDisplay={Math.round(value.highIncome).toFixed(0).toString() || 'N/A'}
                    coreDisplay={Math.round(value.core).toFixed(0).toString() || 'N/A'}
                    valueDisplay={value.mean !== null ? `${Math.round(value.mean).toFixed(0)}/10` : 'N/A'}
                    highIncomeValue={yScale(value.highIncome)}
                    coreValue={yScale(value.core)}
                    maxValue={yScale(value.percentile90)}
                  />
                )
              })
            }
          </g>
        </svg>
      </div>
    )
  }
}
