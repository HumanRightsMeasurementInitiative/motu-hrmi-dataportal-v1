import React from 'react'
import PropTypes from 'prop-types'
import TopMenu from './TopMenu/'
import Landing from './Landing'
import CountryPage from './CountryPage'
import GeoPage from './GeoPage'
import RightsPage from './RightsPage'
import styles from './common.css'

export default class Layout extends React.Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
  }

  render() {
    const { router } = this.props
    const { urlSegs } = router

    return (
      <div className={styles.layout}>
        <TopMenu />
        <Page urlSegs={urlSegs} />
      </div>
    )
  }
}

class Page extends React.Component {
  static propTypes = {
    urlSegs: PropTypes.object.isRequired,
  }

  render() {
    const { urlSegs } = this.props
    if (!urlSegs.exploreBy) {
      return <Landing />
    } else if (urlSegs.exploreBy === 'Rights') {
      return <RightsPage />
    } else if (urlSegs.exploreBy === 'Geography') {
      return urlSegs.country ? <CountryPage /> : <GeoPage />
    }
  }
}
