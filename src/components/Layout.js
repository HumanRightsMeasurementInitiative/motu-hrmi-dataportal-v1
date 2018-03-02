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

  constructor() {
    super()
    this.state = { isAlertShow: false }
  }

  componentDidMount() {
    if (window.innerWidth < 1399) this.setState({ isAlertShow: true })
    else if (window.innerWidth >= 1399) this.setState({ isAlertShow: false })
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  resize = () => {
    if (!this.state.isAlertShow && window.innerWidth < 1399) this.setState({ isAlertShow: true })
    else if (this.state.isAlertShow && window.innerWidth >= 1399) this.setState({ isAlertShow: false })
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
    }
  }
}
