import React from 'react'
import PropTypes from 'prop-types'
import RadarChartItem from '../RadarChartItem'

export default class ESRRightBar extends React.Component {
  static propTypes = {
    chartHeight: PropTypes.number.isRequired,
    chartWidth: PropTypes.number.isRequired,
    currRight: PropTypes.string,
    rights: PropTypes.array,
    onRightClick: PropTypes.func,
    country: PropTypes.object,
    currCountry: PropTypes.string,
    onCountryClick: PropTypes.func,
    onCountryHover: PropTypes.func,
  }

  onCountryClick = () => {
    const { country, onCountryClick } = this.props
    onCountryClick(country.code)
  }

  onMouseOver = () => {
    const { country, onCountryHover } = this.props
    if (country) onCountryHover(country.code)
  }

  onMouseOut = () => {
    const { country, onCountryHover } = this.props
    if (country) onCountryHover(null)
  }

  render() {
    const { chartHeight, chartWidth, currRight, rights, country, currCountry, onRightClick } = this.props

    const margin = {
      top: rights ? 60 : 20,
      left: rights ? 100 : 10,
      bottom: rights ? 80 : 30,
      right: rights ? 100 : 10,
    }

    const r = chartHeight - margin.top - margin.bottom < chartWidth - margin.left - margin.right
      ? (chartHeight - margin.top - margin.bottom) / 2
      : (chartWidth - margin.left - margin.right) / 2

    return (
      <svg 
        ref='svg'
        height={chartHeight}
        width={chartWidth}
        opacity={currCountry === null || !country || currCountry === country.code ? 1 : 0.2}>
        <g transform={'translate(' + chartWidth / 2 + ',' + ((chartHeight - margin.top - margin.bottom) / 2 + margin.top) + ')'}>
          <circle r={r > 0 ? r : 0} fill='#eee'></circle>
        </g>
        { rights &&
          rights.map((item, i) => (
            <RadarChartItem
              key={i}
              r={r}
              index={i}
              currRight={currRight}
              rightName={item}
              translateX={chartWidth / 2}
              translateY={(chartHeight - margin.top - margin.bottom) / 2 + margin.top}
              onRightClick={onRightClick}
            ></RadarChartItem>
          ))
        }
        { country &&
          <g
            onClick={this.onCountryClick}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}
            transform={'translate(' + chartWidth / 2 + ',' + (r * 2 + margin.top) + ')'}>
            <text y='22' fontSize='12' textAnchor='middle' style={{ 'textTransform': 'uppercase' }}>{country.name}</text>
          </g>
        }
      </svg>
    )
  }
}
