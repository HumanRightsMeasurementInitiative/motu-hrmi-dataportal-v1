import React from 'react'
import PropTypes from 'prop-types'
import CountryRightsChart from 'components/CountryRightsChart'
import SubTopNav from '../SubTopNav/'
import RegionItem from '../RegionItem'
import RightsItem from './RightsItem'
import DownloadIcon from '../DownloadIcon'
import { segsToUrl, getRegionName } from '../utils'
import styles from './style.css'

function rewriteArgs(fn, ...args) {
  return () => fn(...args)
}

export default class GeoPage extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    urlSegs: PropTypes.object.isRequired,
    urlPush: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      currCountry: null,
    }
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

  render() {
    const { data, urlSegs } = this.props

    const countries = data[urlSegs.region]
    const regionCodes = Object.keys(data)

    const rightsESR = ['Food', 'Education', 'Work', 'Housing', 'Health']
    const rightsCPR = ['Opinion and Expression', 'Assembly and Association', 'Freedom from Execution', 'Freedom from Torture', 'Participate in Government', 'Freedom from Arbitrary Arrest', 'Freedom from Disappearance']
    const displayedRightsESR = urlSegs.right === 'all'
      ? rightsESR
      : rightsESR.filter(rightName => rightName === urlSegs.right)
    const displayedRightsCPR = urlSegs.right === 'all'
      ? rightsCPR
      : rightsCPR.filter(rightName => rightName === urlSegs.right)

    return (
      <div className={styles.geoPage}>
        <SubTopNav />
        <div className='row'>
          <div className='column'>
            <div className={styles.columnLeft}>
              <div className={styles.searchInputWrapper}>
                <input className={styles.searchInput} type="text" placeholder='Search Country' />
              </div>
              <ul className={styles.regionList}>
                {regionCodes.map((regionCode, i) => (
                  <RegionItem key={regionCode} index={i} code={regionCode} onItemClick={this.setRegion} selected={regionCode === urlSegs.region}>
                    {getRegionName(regionCode)}
                  </RegionItem>
                ))}
              </ul>
            </div>
          </div>
          <div className='column'>
            <div className={styles.columnMiddle}>
              <div className={styles.chartsHeader}>Sort by: Name Change standard: Core</div>
              <div className={styles.countriesList}>
                {countries.map((country, i) => (
                  <div
                    key={country.code}
                    className={styles.countryCard}
                    onClick={rewriteArgs(this.setCountry, country.code)}
                  >
                    <CountryRightsChart rights={country.rights} size={165} />
                    <span>{country.name.toUpperCase()}</span>
                  </div>
                ))}
              </div>
              <div className={styles.chartsFooter}>
                <div className={styles.downloadIcon}><DownloadIcon /></div>
                <div className={styles.text}>Each axis represents a right. The further the score is along each axis, the better the country’s performance on that right.</div>
                <div className={styles.source}><small className={styles.small}>SOURCE:</small> 2018 Human Rights Measurement Initiative (HRMI) DATASET, <a className={styles.small} href="https://humanrightsmeasurement.org">https://humanrightsmeasurement.org</a></div>
              </div>
            </div>
          </div>
          <div className='column'>
            <div className={styles.columnRight}>
              { urlSegs.right === 'all'
                ? (
                  <div>
                    <div className={styles.esrTitle}>Economic and Social Rights</div>
                    <ul className={styles.esrList}>
                      {displayedRightsESR.map((item, i) => (
                        <RightsItem key={i} right={item} onItemClick={this.setRight}>{item}</RightsItem>
                      ))}
                    </ul>
                    <div className={styles.cprTitle}>Civil and Political Rights</div>
                    <ul className={styles.cprList}>
                      {displayedRightsCPR.map((item, i) => (
                        <RightsItem key={i} right={item} onItemClick={this.setRight}>{item}</RightsItem>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className={styles.specRightInfo}>
                    <div className={styles.specRightHeader} onClick={this.setRightToAll} rightcolor={urlSegs.right}>
                      <div className={styles.rightName}>Right to {urlSegs.right}</div>
                      <div className={styles.rightCate}>
                        {displayedRightsESR.length === 0 ? 'Civil and Political Rights' : 'Ecomonic and Social Rights'}
                      </div>
                    </div>
                    <div className='arrowLink'>
                      <div className='text'>Explore this rights in:</div>
                      <div className='text underline' onClick={this.setExploreBy}>
                        {getRegionName(urlSegs.region)}
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
