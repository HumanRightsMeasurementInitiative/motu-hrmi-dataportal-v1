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
      top: 30,
      left: 20,
      bottom: 30,
      right: 20,
    }

    const xScale = d3.scaleLinear().domain([0, rightsByRegionCountries.length]).range([0, chartWidth - margin.left - margin.right - 30])
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
                      <line x1='0' y1='0' y2='0' x2={chartWidth - margin.left - margin.right}
                        stroke={item % 2 === 0 ? '#616161' : '#ddd'}
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
                  isESR
                  ? <ESRRects
                    key={i}
                    translateX={xScale(i) + 30}
                    translateY={chartHeight - margin.top - margin.bottom}
                    // highPos={yScale(value.maxValue)}
                    // corePos={yScale(value.minValue)}
                      highIncomeValue={yScale(value.highIncome)}
                      coreValue={yScale(value.core)}
                      // highIncomeDisplay={Math.round(value.highIncome).toFixed(0) || 'N/A'}
                      // coreDisplay={Math.round(value.core).toFixed(0) || 'N/A'}
                    currCountry={currCountry}
                    country={country}
                    onItemClick={onItemClick}
                  />
                  : <CPRRects
                    key={i}
                    translateX={xScale(i) + 30}
                    translateY={chartHeight - margin.top - margin.bottom}
                    // valueMean={yScale((value.maxValue + value.minValue) / 2)}
                    // valueDiff={yScale(value.maxValue - value.minValue)}
                      value={yScale(value.mean)}
                      minValue={yScale(value.percentile10)}
                      maxValue={yScale(value.percentile90)}
                      // valueDisplay={value.mean !== null ? `${value.mean}/10` : 'N/A'}
                    country={country}
                    onItemClick={onItemClick}
                  />
                )
              })
            }
            {
              rightsByRegionCountries.map((country, i) => {
                const { esr_hi: esrHi, esr_core: esrCore, cpr } = country.rights
                const currentRightFrom = container => container ? container[currRight] : null
                const value = isESR
                  ? { highIncome: currentRightFrom(esrHi), core: currentRightFrom(esrCore) }
                  : (currentRightFrom(cpr) || { mean: null, percentile10: null, percentile90: null })
              //   const value = item.rights[keyword].filter(item => item.name === currRight)[0]
                return (
                  <ValueTooltips
                    key={i}
                    isESR={isESR}
                    translateX={xScale(i) + 30}
                    translateY={chartHeight - margin.top - margin.bottom}
                    currCountry={currCountry}
                    country={country}
                    // maxValue={value.maxValue}
                    // minValue={value.minValue}
                    // textValue={(value.maxValue + value.minValue) / 2}
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
