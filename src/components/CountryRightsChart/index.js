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

const PETALS_COLORS = [
  '#00c852', // health
  '#00d556', // housing
  '#00e25b', // work
  '#51c9f0', // freedom from disap
  '#46b3e0', // freedom from arbitrary
  '#3c9dd1', // freedom from exec
  '#3187c1', // freedom from torture
  '#2e65a1', // participate in gov
  '#2a4482', // assembly and assoc
  '#262262', // opinion and exp
  '#009540', // food
  '#00af49', // edu
]

export default class CountryRightsChart extends React.Component {
  static propTypes = {
    rights: PropTypes.object.isRequired,
    displayLabels: PropTypes.bool.isRequired,
    esrStandard: PropTypes.string.isRequired,
  }

  static defaultProps = {
    displayLabels: false,
    size: 150,
  }

  render() {
    const { rights, size, displayLabels, esrStandard, currRight = null } = this.props
    const { esrHI, esrCore, cpr } = rights

    const currRightIndex = currRight
      ? Object.keys(rightsDefinitions).findIndex(r => r === currRight)
      : null

    const rightsData = RIGHTS_ORDER.map(rightCode => {
      const { type } = rightsDefinitions[rightCode]
      const NO_DATA = null
      if (type === 'ESR' && esrStandard === 'esrHI') {
        if (!esrHI) return NO_DATA
        if (esrHI[rightCode] === null) return NO_DATA
        return esrHI[rightCode] / 100
      } else if (type === 'ESR' && esrStandard === 'esrCore') {
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
      <div style={{ position: 'relative' }}>
        <PetalChart
          size={size}
          margin={displayLabels ? size / 4 : 0}
          data={rightsData}
          domain={[0, 1]}
          colors={PETALS_COLORS}
          debug={false}
          enableBlur={true}
          highlightedSector={currRightIndex}
        />
        {displayLabels &&
          <PetalLabels
            size={size}
            data={rightsData}
            colors={PETALS_COLORS}
          />
        }
      </div>
    )
  }
}

function PetalLabels({ size, data, colors }) {
  const displayPercent = n => data[n] !== null ? (data[n] * 100).toFixed(0) + '%' : 'N/A'
  const displayTenth = n => data[n] !== null ? (data[n] * 10).toFixed(1) + '/10' : 'N/A'

  return (
    <div style={{ fontSize: 14, color: '#606163' }}>
      <LabelRadial surfaceSize={size} r={size / 4 + 30} a={360 / 12 * 0} correction={[-50, -20]} style={{ textAlign: 'center' }}>
        Health
        <br/>
        <strong style={{ color: colors[0] }}>{displayPercent(0)}</strong>
      </LabelRadial>
      <LabelRadial surfaceSize={size} r={size / 4 + 30} a={360 / 12 * 1} correction={[0, -20]} style={{ textAlign: 'left' }}>
        Housing
        <br/>
        <strong style={{ color: colors[1] }}>{displayPercent(1)}</strong>
      </LabelRadial>
      <LabelRadial surfaceSize={size} r={size / 4 + 30} a={360 / 12 * 2} correction={[0, -15]} style={{ textAlign: 'left' }}>
        Work
        <br/>
        <strong style={{ color: colors[2] }}>{displayPercent(2)}</strong>
      </LabelRadial>
      <LabelRadial surfaceSize={size} r={size / 4 + 30} a={360 / 12 * 3} correction={[-10, -20]} style={{ textAlign: 'left' }}>
        Freedom from disappearance
        <br/>
        <strong style={{ color: colors[3] }}>{displayTenth(3)}</strong>
      </LabelRadial>
      <LabelRadial surfaceSize={size} r={size / 4 + 30} a={360 / 12 * 4} correction={[-10, -10]} style={{ textAlign: 'left' }}>
        Freedom from arbitrary arrest
        <br/>
        <strong style={{ color: colors[4] }}>{displayTenth(4)}</strong>
      </LabelRadial>
      <LabelRadial surfaceSize={size} r={size / 4 + 30} a={360 / 12 * 5} correction={[0, -15]} style={{ textAlign: 'left' }}>
        Freedom from execution
        <br/>
        <strong style={{ color: colors[5] }}>{displayTenth(5)}</strong>
      </LabelRadial>
      <LabelRadial surfaceSize={size} r={size / 4 + 30} a={360 / 12 * 6} correction={[-52, -20]} style={{ textAlign: 'center' }}>
        Freedom from torture
        <br/>
        <strong style={{ color: colors[6] }}>{displayTenth(6)}</strong>
      </LabelRadial>

      <LabelRadial surfaceSize={size} r={size / 4 + 30} a={360 / 12 * 7} correction={[-105, -15]} style={{ textAlign: 'right' }}>
        Participate in government
        <br/>
        <strong style={{ color: colors[7] }}>{displayTenth(7)}</strong>
      </LabelRadial>
      <LabelRadial surfaceSize={size} r={size / 4 + 30} a={360 / 12 * 8} correction={[-100, -10]} style={{ textAlign: 'right' }}>
        Assembly and association
        <br/>
        <strong style={{ color: colors[8] }}>{displayTenth(8)}</strong>
      </LabelRadial>
      <LabelRadial surfaceSize={size} r={size / 4 + 30} a={360 / 12 * 9} correction={[-95, -20]} style={{ textAlign: 'right' }}>
        Opinion and expression
        <br/>
        <strong style={{ color: colors[9] }}>{displayTenth(9)}</strong>
      </LabelRadial>
      <LabelRadial surfaceSize={size} r={size / 4 + 30} a={360 / 12 * 10} correction={[-105, -15]} style={{ textAlign: 'right' }}>
        Food
        <br/>
        <strong style={{ color: colors[10] }}>{displayPercent(10)}</strong>
      </LabelRadial>
      <LabelRadial surfaceSize={size} r={size / 4 + 30} a={360 / 12 * 11} correction={[-110, -20]} style={{ textAlign: 'right' }}>
        Education
        <br/>
        <strong style={{ color: colors[11] }}>{displayPercent(11)}</strong>
      </LabelRadial>
    </div>
  )
}

function Label({ x, y, children, ...props }) {
  return (
    <div { ...props } style={{ ...(props.style || {}), position: 'absolute', top: y, left: x, width: 100 }}>
      {children}
    </div>
  )
}

function LabelRadial({ r, a, surfaceSize, correction: [cx, cy] = [0, 0], children, ...props }) {
  const radA = a / 360 * 2 * Math.PI
  const o = surfaceSize / 2
  return (
    <Label x={o + cx + Math.sin(radA) * r} y={o + cy - Math.cos(radA) * r} {...props}>
      {children}
    </Label>
  )
}
