import React from 'react'
import PropTypes from 'prop-types'
import SubTopNav from '../SubTopNav/'
import { segsToUrl } from '../utils'
import rightsDefinitions from 'data/rights-definitions.json'
import RightColumn from './RightColumn'
import LeftColumn from './LeftColumn'
import CountryGrid from './CountryGrid'
import styles from './style.css'

export default class GeoPage extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    urlSegs: PropTypes.object.isRequired,
    urlPush: PropTypes.func.isRequired,
    esrStandard: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
  }

  state = {
    currCountry: null,
    hoverCountry: null,
  }

  setRegion = (region) => {
    this.props.urlPush(segsToUrl({ ...this.props.urlSegs, region: region }))
  }

  setCountry = (country) => {
    this.props.urlPush(segsToUrl({ ...this.props.urlSegs, country: country, right: 'all' }))
  }

  setRight = (right) => {
    if (right !== this.props.urlSegs.right) {
      this.props.urlPush(segsToUrl({ ...this.props.urlSegs, right: right }))
    } else {
      this.setRightToAll()
    }
  }

  setRightToAll = () => {
    this.props.urlPush(segsToUrl({ ...this.props.urlSegs, right: 'all' }))
  }

  setExploreBy = (right) => {
    const { urlSegs } = this.props
    this.props.urlPush(segsToUrl({ ...urlSegs, exploreBy: 'Rights' }))
  }

  setCurrCountry = (country) => {
    this.setState({ currCountry: country })
  }

  unsetCurrCountry = (country) => {
    this.setState({ currCountry: null })
  }

  setHoverCountry = (country) => {
    this.setState({ hoverCountry: country })
  }

  unsetHoverCountry = (country) => {
    this.setState({ hoverCountry: null })
  }

  render() {
    const { data: { rightsByRegion }, urlSegs, esrStandard, content } = this.props
    const { hoverCountry } = this.state
    const { region: currRegion, right: currRight } = urlSegs
    const regionRights = rightsByRegion[currRegion]
    const countries = regionRights.countries

    // FIXME: Dirty! This mutates the object
    countries.forEach(country => {
      country.isHI = rightsByRegion['high-income-oecd'].countries
        .some(c => c.countryCode === country.countryCode)
    })

    const rights = Object.entries(rightsDefinitions).map(([code, right]) => ({ code, ...right }))
    const rightsESR = rights.filter(right => right.type === 'ESR')
    const rightsCPR = rights.filter(right => right.type === 'CPR')
    const displayedRightsESR = currRight === 'all'
      ? rightsESR
      : rightsESR.filter(right => right.code === currRight)
    const displayedRightsCPR = currRight === 'all'
      ? rightsCPR
      : rightsCPR.filter(right => right.code === currRight)

    return (
      <div className={styles.geoPage}>
        <SubTopNav content={content} />
        <div className='row'>
          <LeftColumn
            rightsByRegion={rightsByRegion}
            currRegion={currRegion}
            content={content}
            setRegion={this.setRegion}
          />
          <CountryGrid
            currRegion={currRegion}
            currRight={currRight}
            countries={countries}
            esrStandard={esrStandard}
            content={content}
            hoverCountry={hoverCountry}
            setCountry={this.setCountry}
            setHoverCountry={this.setHoverCountry}
            unsetHoverCountry={this.unsetHoverCountry}
          />
          <RightColumn
            regionRights={regionRights}
            esrStandard={esrStandard}
            displayedRightsESR={displayedRightsESR}
            displayedRightsCPR={displayedRightsCPR}
            currRegion={currRegion}
            currRight={currRight}
            hoverCountry={hoverCountry}
            content={content}
            setRight={this.setRight}
            setRightToAll={this.setRightToAll}
            setExploreBy={this.setExploreBy}
          />
        </div>
      </div>
    )
  }
}
