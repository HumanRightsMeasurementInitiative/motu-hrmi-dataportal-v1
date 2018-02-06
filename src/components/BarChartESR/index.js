import React from 'react'
import PropTypes from 'prop-types'
import { Viz } from 'react-dataviz'
import rightsDefinitions from 'data/rights-definitions.json'

const RIGHTS_ESR = Object.entries(rightsDefinitions)
  .map(([code, right]) => ({ code, ...right }))
  .filter(right => right.type === 'ESR')

export default class BarChartESR extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  render() {
    const { data } = this.props

    return (
      <Viz margin={{ top: 10, bottom: 10 }} flipY>
        {rescale => [0, 0.5, 1].map((tick, index) => (
          <g key={tick}>
            <text x={rescale.x(0)} y={rescale.y(tick) - 2} fontSize='10px' fill='#616161'>
              {(tick * 100).toFixed(0)}%
            </text>
            <line
              x1={rescale.x(0)}
              y1={rescale.y(tick)}
              x2={rescale.x(1)}
              y2={rescale.y(tick)}
              opacity={tick === 0 ? '1' : '0.25'}
              stroke='#616161'
              shapeRendering='crispEdges' // Only because it's horizontal!
            />
          </g>
        ))}

        {rescale => RIGHTS_ESR.map(({ code: rightName }, index) => {
          if (data[rightName] === null) return null
          const rightValue = data[rightName] / 100
          const barWidth = 0.05 * rescale.w(1)
          const x = rescale.w(1) / (RIGHTS_ESR.length + 0.5) * (index + 1) - barWidth
          return (
            <g className={`-${rightName}`} key={rightName}>
              <rect x={x} y={rescale.y(rightValue)} width={barWidth} height={rescale.h(rightValue)} fill='rgba(0, 0, 0, .1)'/>
              <circle cx={x + barWidth / 2} cy={rescale.y(rightValue)} r={barWidth / 2} fill='#00A551'></circle>
            </g>
          )
        })}
      </Viz>
    )
  }
}
