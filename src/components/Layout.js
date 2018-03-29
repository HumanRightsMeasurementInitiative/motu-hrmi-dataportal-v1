import React from 'react'
import PropTypes from 'prop-types'
import TopMenu from './TopMenu/'
import Landing from './Landing'
import CountryPage from './CountryPage'
import GeoPage from './GeoPage'
import RightsPage from './RightsPage'
import SmallScreenAlert from './SmallScreenAlert'
import styles from './common.css'

export default class Layout extends React.Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
  }

  state = {
    isAlertShow: false,
  }

  componentDidMount() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  onResize = () => {
    const isSmall = window.matchMedia('(max-width: 1000px)').matches
    this.setState({ isAlertShow: isSmall })
  }

  render() {
    const { router } = this.props
    const { urlSegs } = router

    return (
      <div className={styles.layout}>
        { !this.state.isAlertShow &&
          <TopMenu />
        }
        <Page urlSegs={urlSegs} isAlertShow={this.state.isAlertShow} />
      </div>
    )
  }
}

class Page extends React.Component {
  static propTypes = {
    urlSegs: PropTypes.object.isRequired,
    isAlertShow: PropTypes.bool.isRequired,
  }

  render() {
    const { urlSegs, isAlertShow } = this.props
    if (isAlertShow) {
      return <SmallScreenAlert />
    } else if (!urlSegs.exploreBy) {
      return <Landing />
    } else if (urlSegs.exploreBy === 'Rights') {
      return <RightsPage />
    } else if (urlSegs.exploreBy === 'Geography') {
      return urlSegs.country ? <CountryPage /> : <GeoPage />
    } else {
      return <div>404 - Page not found</div>
    }
  }
}
