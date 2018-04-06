import React from 'react'
import PropTypes from 'prop-types'
import { PetalChart } from 'hrmi-charts'
import styles from './style.css'
import { CORRECTIONS, RIGHTS_ORDER, PETALS_COLORS } from 'lib/constants'
import { isRightIndexAnESR, displayRightValue } from 'components/utils'

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
    rightsData: PropTypes.array.isRequired,
    displayLabels: PropTypes.bool.isRequired,
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
    hoveredRightIndex: null,
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

    return { right, index, radius, angle }
  }

  clickSector = (event) => {
    const { size, onClickRight } = this.props
    if (!onClickRight) return
    const { right, radius } = this.rightFromEvent(event)
    if (radius > 5 && radius < size / 4) {
      onClickRight(right)
    } else {
      if (!this.onLabel) {
        // Shitty trick
        onClickRight('all')
      }
    }
  }

  clickLabel = (right) => {
    const { onClickRight } = this.props
    if (!onClickRight) return
    onClickRight(right)
  }

  hoverSector = (event) => {
    const { size, onClickRight } = this.props
    if (!onClickRight) return

    const { index, radius } = this.rightFromEvent(event)

    if (radius > 5 && radius < size / 4) {
      event.currentTarget.style.cursor = 'pointer'
      this.setState({ hoveredRightIndex: index })
    } else {
      event.currentTarget.style.cursor = ''
      if (!this.onLabel) {
        // Shitty trick
        this.setState({ hoveredRightIndex: null })
      }
    }
  }

  offHoverSector = (event) => {
    const { onClickRight } = this.props
    if (!onClickRight) return
    event.currentTarget.style.cursor = ''
    this.setState({ hoveredRightIndex: null })
  }

  hoverLabel = (right) => {
    const { onClickRight } = this.props
    if (!onClickRight) return

    const index = RIGHTS_ORDER.indexOf(right)
    if (index === -1) return

    this.onLabel = true
    this.setState({ hoveredRightIndex: index })
  }

  offHoverLabel = () => {
    const { onClickRight } = this.props
    if (!onClickRight) return

    this.onLabel = false
    this.setState({ hoveredRightIndex: null })
  }

  render() {
    const { rightsData, size, displayLabels, content, currRight } = this.props
    const { hoveredRightIndex } = this.state

    const highlightedRight = (currRight && currRight !== 'all') ? currRight : null
    const highlightedRightIndex = RIGHTS_ORDER.includes(highlightedRight)
      ? RIGHTS_ORDER.indexOf(highlightedRight)
      : null
    const currRightIndex = RIGHTS_ORDER.includes(currRight)
      ? RIGHTS_ORDER.indexOf(currRight)
      : null

    const areCPRMissing = rightsData.filter((r, i) => !isRightIndexAnESR(i)).every(v => v === null)

    return (
      <div
        style={{ position: 'relative' }}
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
            highlightedRightIndexes={[hoveredRightIndex, currRightIndex]}
            onClick={this.clickLabel}
            onMouseEnter={this.hoverLabel}
            onMouseLeave={this.offHoverLabel}
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

function PetalLabels({ size, data, colors, content, highlightedRightIndexes, onClick = null, onMouseEnter = null, onMouseLeave = null }) {
  if (!content) throw new Error(`PetalLabels: no translation content passed!`)

  const names = RIGHTS_ORDER.map(k => content.rights_name_short[k])

  return (
    <div className={styles.labelText} >
      {data.map((d, i) => (
        <LabelRadial
          key={i}
          surfaceSize={size}
          r={size / 4 + 30}
          a={360 / 12 * i}
          correction={CORRECTIONS[i]}
          style={{
            fontWeight: highlightedRightIndexes.includes(i) ? 'bold' : '',
            textAlign: i === 0 || i === 6 ? 'center' : i > 6 ? 'right' : 'left',
            cursor: onClick ? 'pointer' : null,
          }}
          onClick={rewriteArgs(onClick, RIGHTS_ORDER[i])}
          onMouseEnter={rewriteArgs(onMouseEnter, RIGHTS_ORDER[i])}
          onMouseLeave={rewriteArgs(onMouseLeave, RIGHTS_ORDER[i])}
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
