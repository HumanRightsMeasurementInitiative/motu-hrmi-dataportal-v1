import React from 'react'
import PropTypes from 'prop-types'
import { PetalChart } from 'hrmi-charts'
import rightsDefinitions from 'data/rights-definitions.json'

const RIGHTS_ORDER = [
  'health', // ESR
  'housing', // ESR
  'work', // ESR

  'freedom-from-disappearance', // CPR
  'freedom-from-arbitrary-arrest', // CPR
  'freedom-from-execution', // CPR
  'freedom-from-torture', // CPR
  'participate-in-government', // CPR
  'assembly-and-association', // CPR
  'opinion-and-expression', // CPR

  'food', // ESR
  'education', // ESR
]

export default class CountryRightsChart extends React.Component {
  static propTypes = {
    rights: PropTypes.object.isRequired,
  }

  render() {
    const { rights, size = 150 } = this.props
    const { esrHI, esrCore, cpr } = rights
    const esrType = 'HIGH_INCOME' // or 'CORE'

    const rightsData = RIGHTS_ORDER.map(rightCode => {
      const { type } = rightsDefinitions[rightCode]
      const NO_DATA = null
      if (type === 'ESR' && esrType === 'HIGH_INCOME') {
        if (!esrHI) return NO_DATA
        if (esrHI[rightCode] === null) return NO_DATA
        return esrHI[rightCode] / 100
      } else if (type === 'ESR' && esrType === 'CORE') {
        if (!esrCore) return NO_DATA
        if (esrCore[rightCode] === null) return NO_DATA
        return esrCore[rightCode] / 100
      } else if (type === 'CPR') {
        if (!cpr || !cpr[rightCode]) return NO_DATA
        if (cpr[rightCode] === null || cpr[rightCode].mean === null) return NO_DATA
        return cpr[rightCode].mean / 10
      }
      throw new Error(`Right '${rightCode}' with no type! Check rightDefinitions`)
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
