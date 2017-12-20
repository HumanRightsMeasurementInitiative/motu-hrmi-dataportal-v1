import React from 'react'
import PropTypes from 'prop-types'

export default class CloseIcon extends React.Component {
  static propTypes = {
    color: PropTypes.string,
  }

  render() {
    const { color } = this.props
    return (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 17.12 17.12'>
        <g>
          <polygon points='17.12 1.41 15.71 0 8.56 7.15 1.41 0 0 1.41 7.15 8.56 0 15.71 1.41 17.12 8.56 9.97 15.71 17.12 17.12 15.71 9.97 8.56 17.12 1.41' fill={color || '#333'}/>
        </g>
      </svg>
    )
  }
}
