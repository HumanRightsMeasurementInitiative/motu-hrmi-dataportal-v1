import React from 'react'
import PropTypes from 'prop-types'
import TopMenu from './TopMenu/'
import Landing from './Landing'

export default class Layout extends React.Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
  }

  render() {
    const { router } = this.props
    return (
      <div>
        <TopMenu />
        <Landing />
      </div>
    )
  }
}
