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

function rewriteArgs(fn, ...args) {
  if (fn === null) return null
  return () => fn(...args)
}

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
    const { rights, size, displayLabels, esrStandard, content, currRight = null, onClickRight = null } = this.props
    const { esrHI, esrCore, cpr } = rights

    const currRightIndex = RIGHTS_ORDER.includes(currRight)
      ? RIGHTS_ORDER.indexOf(currRight)
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
          margin={displayLabels ? size / 4 : 5}
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
            onClick={onClickRight}
            content={content}
          />
        }
      </div>
    )
  }
}

function PetalLabels({ size, data, colors, content, onClick }) {
  if (!content) throw new Error(`PetalLabels: no translation content passed!`)
  const displayPercent = n => data[n] !== null ? (data[n] * 100).toFixed(0) + '%' : 'N/A'
  const displayTenth = n => data[n] !== null ? (data[n] * 10).toFixed(1) + '/10' : 'N/A'

  const names = RIGHTS_ORDER.map(k => content.rights_name_short[k])
  const corrections = [
    [-50, -20],
    [0, -20],
    [0, -15],
    [-10, -20],
    [-10, -10],
    [0, -15],
    [-52, -20],
    [-105, -15],
    [-100, -10],
    [-95, -20],
    [-105, -15],
    [-110, -20],
  ]

  const isESR = i => i < 3 || i > 9

  return (
    <div style={{ fontSize: 14, color: '#606163' }}>
      {data.map((d, i) => (
        <LabelRadial
          key={i}
          surfaceSize={size}
          r={size / 4 + 30}
          a={360 / 12 * i}
          correction={corrections[i]}
          style={{
            textAlign: i === 0 || i === 6 ? 'center' : i > 6 ? 'right' : 'left',
            cursor: onClick ? 'pointer' : null,
          }}
          onClick={rewriteArgs(onClick, RIGHTS_ORDER[i])}
        >
          {names[i]}
          <br/>
          <strong style={{ color: colors[i] }}>
            {isESR(i) ? displayPercent(i) : displayTenth(i)}
          </strong>
        </LabelRadial>
      ))}
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
