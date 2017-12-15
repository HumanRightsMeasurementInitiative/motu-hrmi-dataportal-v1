import React from 'react'
import PropTypes from 'prop-types'
import TopMenu from './TopMenu/'
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
        <TopMenu />
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
