import React from 'react'

export default class SearchIcon extends React.Component {
  render() {
    return (
      <svg height='30' width='30'>
        <g>
          <circle r="8" cx='15' cy='15' fill='none' stroke='#3bc4e9' strokeWidth='2' />
          <line x1='20' y1='20' x2='25' y2='25' stroke='#3bc4e9' strokeWidth='4' />
        </g>
      </svg>
    )
  }
}
