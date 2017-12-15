import React from 'react'
import PropTypes from 'prop-types'
import TopNav from './TopNav/'
import Landing from './Landing'
import GeoPage from './GeoPage'
import RightsPage from './RightsPage'

export default class Layout extends React.Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
  }

  render() {
    const { router } = this.props
    const { urlSegs } = router

    return (
      <div>
        <TopNav />
        { !urlSegs.exploreBy && !urlSegs.exploreBy &&
          <Landing />
        }
        { urlSegs.exploreBy === 'Rights' &&
          <RightsPage />
        }
        { urlSegs.exploreBy === 'Geography' &&
          <GeoPage />
        }
      </div>
    )
  }
}
