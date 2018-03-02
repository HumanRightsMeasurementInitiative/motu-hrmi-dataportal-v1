import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import CountryName from './CountryName'
import ESRRects from './ESRRects'
import CPRRects from './CPRRects'
import ValueTooltips from './ValueTooltips'
import { round } from 'lodash'

export default class RightBarchart extends React.Component {
  static propTypes = {
    isESR: PropTypes.bool.isRequired,
    currYear: PropTypes.number.isRequired,
    currRight: PropTypes.string.isRequired,
    chartHeight: PropTypes.number.isRequired,
    chartWidth: PropTypes.number.isRequired,
    rightsByRegionCountries: PropTypes.array.isRequired,
    score: PropTypes.string.isRequired,
    currCountry: PropTypes.object,
    onItemClick: PropTypes.func,
    resetCurrCountry: PropTypes.func,
    hoveredCountry: PropTypes.string,
    onItemHover: PropTypes.func,
    resetHoveredCountry: PropTypes.func,
    subrights: PropTypes.string,
  }

  onBackgroundClick = () => {
    const { resetCurrCountry } = this.props
    if (resetCurrCountry) resetCurrCountry()
  }

  render() {
    const {
      isESR,
      currYear,
      currRight,
      chartHeight,
      chartWidth,
      rightsByRegionCountries,
      currCountry,
      onItemClick,
      hoveredCountry,
      onItemHover,
      resetHoveredCountry,
      score,
      subrights,
    } = this.props
    const yAxisRange = Array.from(Array(11).keys()).reverse()
    const yAxisRate = isESR ? 10 : 1

    if (chartHeight === 0) return null

    const margin = {
      top: 40,
      left: 30,
      bottom: 30,
      right: 30,
    }

    const xScale = d3.scaleLinear().domain([0, rightsByRegionCountries.length - 1]).range([40, chartWidth - margin.left - margin.right - 20])
    const yScale = d3.scaleLinear().domain([0, 10 * yAxisRate]).range([0, chartHeight - margin.top - margin.bottom])

    return (
      <div>
        <svg height={chartHeight} width={chartWidth}>
          <g transform={'translate(' + margin.left + ',' + margin.top + ')'}>
            { !isESR &&
              <g transform='rotate(-90)'><text dx={ (margin.left - chartHeight) / 2} dy='-14' fill='#616161' textAnchor='center'fontSize="12px">{score}</text></g>
            }
            <g onClick={this.onBackgroundClick}>
              <rect height={chartHeight} width={chartWidth - margin.left - margin.right} y={-margin.top} opacity='0'></rect>
            </g>
            <g transform={'translate(0,' + (chartHeight - margin.top - margin.bottom) + ')'}>
              {
                rightsByRegionCountries.map((country, i) => {
                  return (
                    <g key={i} transform={'translate(' + xScale(i) + ', 10)rotate(-45)'}>
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
                const { esrHIHistorical, esrCoreHistorical, cpr } = country.rights
                const esrHI = esrHIHistorical[currYear] ? esrHIHistorical[currYear].rights : {}
                const esrCore = esrCoreHistorical[currYear] ? esrCoreHistorical[currYear].rights : {}
                const currentRightFrom = container => container ? (container[`${currRight}-sub`] && subrights ? container[`${currRight}-sub`][subrights] : container[currRight]) : null
                const value = isESR
                  ? { highIncome: currentRightFrom(esrHI), core: currentRightFrom(esrCore) }
                  : (currentRightFrom(cpr) || { mean: null, percentile10: null, percentile90: null })

                return (
                  isESR
                  ? <ESRRects
                    key={i}
                    translateX={xScale(i)}
                    translateY={chartHeight - margin.top - margin.bottom}
                    highIncomeValue={yScale(value.highIncome)}
                    coreValue={yScale(value.core)}
                    currCountry={currCountry}
                    country={country}
                    onItemClick={onItemClick}
                    hoveredCountry={hoveredCountry}
                    onItemHover={onItemHover}
                    resetHoveredCountry={resetHoveredCountry}
                  />
                  : <CPRRects
                    key={i}
                    translateX={xScale(i)}
                    translateY={chartHeight - margin.top - margin.bottom}
                    value={yScale(value.mean)}
                    minValue={yScale(value.percentile10)}
                    maxValue={yScale(value.percentile90)}
                    currCountry={currCountry}
                    country={country}
                    onItemClick={onItemClick}
                    hoveredCountry={hoveredCountry}
                    onItemHover={onItemHover}
                    resetHoveredCountry={resetHoveredCountry}
                  />
                )
              })
            }
            {
              rightsByRegionCountries.map((country, i) => {
                const { esrHIHistorical, esrCoreHistorical, cpr } = country.rights
                const esrHI = esrHIHistorical[currYear] ? esrHIHistorical[currYear].rights : {}
                const esrCore = esrCoreHistorical[currYear] ? esrCoreHistorical[currYear].rights : {}
                const currentRightFrom = container => container ? (container[`${currRight}-sub`] && subrights ? container[`${currRight}-sub`][subrights] : container[currRight]) : null
                const value = isESR
                  ? { highIncome: currentRightFrom(esrHI), core: currentRightFrom(esrCore) }
                  : (currentRightFrom(cpr) || { mean: null, percentile10: null, percentile90: null })
                return (
                  <ValueTooltips
                    key={i}
                    isESR={isESR}
                    translateX={xScale(i)}
                    translateY={chartHeight - margin.top - margin.bottom}
                    currCountry={currCountry}
                    country={country}
                    highIncomeDisplay={round(value.highIncome).toFixed(0).toString() || 'N/A'}
                    coreDisplay={round(value.core).toFixed(0).toString() || 'N/A'}
                    highIncomeValue={yScale(value.highIncome)}
                    coreValue={yScale(value.core)}
                    maxDisplay={value.mean !== null ? `${round(value.percentile90, 1).toFixed(1)}` : 'N/A'}
                    minDisplay={value.mean !== null ? `${round(value.percentile10, 1).toFixed(1)}` : 'N/A'}
                    meanDisplay={value.mean !== null ? `${round(value.mean, 1).toFixed(1)}` : 'N/A'}
                    maxValue={yScale(value.percentile90)}
                    minValue={yScale(value.percentile10)}
                    meanValue={yScale(value.mean)}
                    hoveredCountry={hoveredCountry}
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
