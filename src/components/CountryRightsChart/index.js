import React from 'react'
import PropTypes from 'prop-types'
import { PetalChart } from 'hrmi-charts'
import { keyBy } from 'lodash'

export default class CountryRightsChart extends React.Component {
  static propTypes = {
    rights: PropTypes.object.isRequired,
  }

  render() {
    const { rights, size = 150 } = this.props

    const rightsNames = keyBy([].concat(
      rights.CPR.map(({ name, value }) => ({ name, value: value / 10 })),
      rights.ESR.map(({ name, value }) => ({ name, value: value / 100 })),
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
    ].map(nameOfRight => rightsNames[nameOfRight].value)

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
