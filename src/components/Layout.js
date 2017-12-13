import React from 'react'
import PropTypes from 'prop-types'

export default class Layout extends React.Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
  }

  render() {
    const { router } = this.props
    return (
      <div>
        HRMI
      </div>
    )
  }
}
