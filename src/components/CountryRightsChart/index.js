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

function isRightIndexAnESR(i) {
  return [0, 1, 2, 10, 11].includes(i)
}

function displayRightValue(rightData, rightIndex) {
  const val = rightData[rightIndex]
  if (val === null) return 'N/A'

  const isPercent = isRightIndexAnESR(rightIndex)

  if (isPercent) {
    return (val * 100).toFixed(0) + '%'
  } else {
    return (val * 10).toFixed(1) + '/10'
  }
}

function rewriteArgs(fn, ...args) {
  if (fn === null) return null
  return () => fn(...args)
}

function changeOrigin(point, newOrigin) {
  return [point[0] - newOrigin[0], point[1] - newOrigin[1]]
}

function normalizeAngle(a) {
  return a > 0
    ? a % (2 * Math.PI)
    : a % (2 * Math.PI) + (2 * Math.PI)
}

function cartesianToPolar([x, y]) {
  const angle = normalizeAngle(Math.atan2(x, -y))
  const radius = Math.hypot(x, y)
  return [angle, radius]
}

export default class CountryRightsChart extends React.Component {
  static propTypes = {
    rights: PropTypes.object.isRequired,
    displayLabels: PropTypes.bool.isRequired,
    esrStandard: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    content: PropTypes.object,
    currRight: PropTypes.string,
    onClickRight: PropTypes.func,
  }

  static defaultProps = {
    displayLabels: false,
    size: 150,
  }

  state = {
    hoveredRight: null,
  }

  rightFromEvent = (event) => {
    const targetRect = event.currentTarget.getBoundingClientRect()
    const mouse = [
      event.nativeEvent.pageX - targetRect.left,
      event.nativeEvent.pageY - targetRect.top,
    ]

    const center = [targetRect.width / 2, targetRect.height / 2]
    const [angle, radius] = cartesianToPolar(changeOrigin(mouse, center))
    const sectorAngle = 2 * Math.PI / RIGHTS_ORDER.length
    const index = Math.floor(normalizeAngle(angle + sectorAngle / 2) / sectorAngle)
    const right = RIGHTS_ORDER[index]

    return { right, radius, angle }
  }

  clickSector = (event) => {
    const { onClickRight } = this.props
    const { right } = this.rightFromEvent(event)
    onClickRight(right)
  }

  hoverSector = (event) => {
    const { size } = this.props
    const { hoveredRight } = this.state
    const { right, radius } = this.rightFromEvent(event)

    if (hoveredRight === right) return

    if (radius > 10 && radius < size) {
      this.setState({ hoveredRight: right })
    } else {
      this.setState({ hoveredRight: null })
    }
  }

  offHoverSector = () => {
    this.setState({ hoveredRight: null })
  }

  render() {
    const { rights, size, displayLabels, esrStandard, content, currRight } = this.props
    const { hoveredRight } = this.state
    const { esrHI, esrCore, cpr } = rights

    const highlightedRight = (!currRight || currRight === 'all')
      ? hoveredRight
      : currRight

    const highlightedRightIndex = RIGHTS_ORDER.includes(highlightedRight)
      ? RIGHTS_ORDER.indexOf(highlightedRight)
      : null
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

    const areCPRMissing = rightsData.filter((r, i) => !isRightIndexAnESR(i)).every(v => v === null)

    return (
      <div
        style={{ position: 'relative', cursor: 'pointer' }}
        onClick={this.clickSector}
        onMouseMove={this.hoverSector}
        onMouseLeave={this.offHoverSector}
      >
        <PetalChart
          size={size}
          margin={displayLabels ? size / 4 : 5}
          data={rightsData}
          domain={[0, 1]}
          colors={PETALS_COLORS}
          debug={false}
          enableBlur={true}
          highlightedSector={highlightedRightIndex}
        />
        {displayLabels &&
          <PetalLabels
            size={size}
            data={rightsData}
            colors={PETALS_COLORS}
            content={content}
            currRightIndex={currRightIndex}
          />
        }
        {(!displayLabels && highlightedRightIndex !== null) &&
          <span
            style={{
              color: PETALS_COLORS[highlightedRightIndex],
              fontWeight: 'bold',
            }}
          >
            {displayRightValue(rightsData, highlightedRightIndex)}
          </span>
        }
        {displayLabels && areCPRMissing &&
          <div
            style={{
              position: 'absolute',
              top: (size / 1.9),
              left: (size / 2) - (250 / 2),
              width: 250,
              color: '#6a6b6d',
              background: 'rgba(231, 231, 231, 0.5)',
              textAlign: 'center',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Civil and political rights data have not yet been produced for this country.
          </div>
        }
      </div>
    )
  }
}

function PetalLabels({ size, data, colors, content, currRightIndex, onClick = null }) {
  if (!content) throw new Error(`PetalLabels: no translation content passed!`)

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
            fontWeight: currRightIndex === i ? 'bold' : '',
            textAlign: i === 0 || i === 6 ? 'center' : i > 6 ? 'right' : 'left',
            cursor: onClick ? 'pointer' : null,
          }}
          onClick={rewriteArgs(onClick, RIGHTS_ORDER[i])}
        >
          {names[i]}
          <br/>
          <strong style={{ color: colors[i] }}>
            {displayRightValue(data, i)}
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
