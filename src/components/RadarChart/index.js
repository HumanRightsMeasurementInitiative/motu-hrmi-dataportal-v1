import React from 'react'
import PropTypes from 'prop-types'
import { PetalChart } from 'hrmi-charts'
import { keyBy } from 'lodash'

export default class RadarChart extends React.Component {
  static propTypes = {
    country: PropTypes.object,
    onCountryClick: PropTypes.func,
    onCountryHover: PropTypes.func,
  }

  onCountryClick = () => {
    const { country, onCountryClick } = this.props
    onCountryClick && onCountryClick(country.code)
  }

  onMouseOver = () => {
    const { country, onCountryHover } = this.props
    if (country && onCountryHover) onCountryHover(country.code)
  }

  onMouseOut = () => {
    const { country, onCountryHover } = this.props
    if (country && onCountryHover) onCountryHover(null)
  }

  render() {
    const { country, size = 150 } = this.props

    const rights = keyBy([].concat(
      country.rights.CPR.map(({ name, value }) => ({ name, value: value / 10 })),
      country.rights.ESR.map(({ name, value }) => ({ name, value: value / 100 })),
    ), 'name')

    const rightsData = [
      'Health', // ESR
      'Housing', // ESR
      'Work', // ESR

      'Freedom from Disappearance', // CPR
      'Freedom from Arbitrary Arrest', // CPR
      'Freedom from Execution', // CPR
      'Freedom from Torture', // CPR
      'Participate in Government', // CPR
      'Assembly and Association', // CPR
      'Opinion and Expression', // CPR

      'Food', // ESR
      'Education', // ESR
    ].map(nameOfRight => rights[nameOfRight].value)

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: 24,
        }}
        onClick={this.onCountryClick}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        <div style={{ margin: '0 auto' }}>
          <PetalChart
            size={size}
            data={rightsData}
            domain={[0, 1]}
            debug={false}
            enableBlur={false}
          />
        </div>
        <div style={{ fontSize: 12, textAlign: 'center' }}>
          { country && country.name.toUpperCase() }
        </div>
      </div>
    )
  }
}
