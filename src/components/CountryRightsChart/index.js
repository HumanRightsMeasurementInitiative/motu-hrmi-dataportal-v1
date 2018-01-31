import React from 'react'
import PropTypes from 'prop-types'
import { PetalChart } from 'hrmi-charts'
import rightsDefinitions from 'data/rights-definitions.json'

export default class CountryRightsChart extends React.Component {
  static propTypes = {
    rights: PropTypes.object.isRequired,
  }

  render() {
    const { rights, size = 150 } = this.props
    const { esr_hi: esrHi, esr_core: esrCore, cpr } = rights
    const esrType = 'HIGH_INCOME' // or 'CORE'

    const rightsData = Object.entries(rightsDefinitions)
      .map(([code, { type }]) => {
        const NO_DATA = null
        if (type === 'ESR' && esrType === 'HIGH_INCOME') {
          if (!esrHi) return NO_DATA
          if (esrHi[code] === null) return NO_DATA
          return esrHi[code] / 100
        } else if (type === 'ESR' && esrType === 'CORE') {
          if (!esrCore) return NO_DATA
          if (esrCore[code] === null) return NO_DATA
          return esrCore[code] / 100
        } else if (type === 'CPR') {
          if (!cpr || !cpr[code]) return NO_DATA
          if (cpr[code] === null || cpr[code].mean === null) return NO_DATA
          return cpr[code].mean / 10
        }
        throw new Error('Right with no type! Check rightDefinitions')
      })

    return (
      <div>
        <PetalChart
          size={size}
          data={rightsData}
          domain={[0, 1]}
          debug={false}
          enableBlur={false}
        />
      </div>
    )
  }
}
