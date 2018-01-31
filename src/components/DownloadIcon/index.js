import React from 'react'
import PropTypes from 'prop-types'

export default class DownloadIcon extends React.Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
  }

  render() {
    const { color } = this.props
    return (
      <svg viewBox="0 0 425 389" >
        <polygon fill={color} points="320.5,164 231.8,252.7 231.8,21.3 202.1,21.3 202.1,252.7 113.4,164 92.4,185.1 216.9,309.6 341.4,185.1 "/>
        <rect x="30" y="340" fill={color} width="376" height="29.8"/>
        <rect x="30" y="280" fill={color} width="29.8" height="60"/>
        <rect x="376" y="280" fill={color} width="29.8" height="60"/>
      </svg>
    )
  }
}
