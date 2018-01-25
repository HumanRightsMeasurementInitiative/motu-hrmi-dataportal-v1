import React from 'react'
import PropTypes from 'prop-types'
import SubTopNav from '../SubTopNav/'
import RegionItem from '../RegionItem'
import RightsItem from './RightsItem'
import RadarChart from '../RadarChart'
import DownloadIcon from '../DownloadIcon'
import { segsToUrl, getRegionName } from '../utils'
import styles from './style.css'

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
      chartHeight: 0,
      chartWidth: 0,
    }
  }

  componentDidMount() {
    this.refs.content.style.height = this.refs.page.offsetHeight - 117 + 'px'
    this.refs.regionList.style.height = this.refs.content.offsetHeight - this.refs.searchInput.offsetHeight + 'px'
    this.refs.countries.style.height = this.refs.content.offsetHeight - this.refs.chartsHeader.offsetHeight - this.refs.chartsFooter.offsetHeight + 'px'
    this.setState({ chartHeight: this.refs.countries.offsetHeight / 3, chartWidth: 180 })
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

  render() {
    const { data, urlSegs } = this.props

    const ESRs = ['Food', 'Education', 'Work', 'Housing', 'Health']
    const CPRs = ['Opinion and Expression', 'Assembly and Association', 'Freedom from Execution', 'Freedom from Torture', 'Participate in Government', 'Freedom from Arbitrary Arrest', 'Freedom from Disappearance']

    const regionItems = Object.keys(data).map((item, i) => (
      <RegionItem key={i} index={i} code={item} onItemClick={this.setRegion} selected={item === urlSegs.region}>{getRegionName(item)}</RegionItem>
    ))
    const countryItem = data[urlSegs.region].map((item, i) => (
      <RadarChart
        key={i}
        country={item}
        onCountryClick={this.setCountry}
        onCountryHover={this.setCurrCountry}
      ></RadarChart>
    ))
    const ESRItems = ESRs.filter((item, i) => (
      urlSegs.right === item || urlSegs.right === 'all'
    )).map((item, i) => (
      <RightsItem key={i} right={item} onItemClick={this.setRight}>{item}</RightsItem>
    ))
    const CPRItems = CPRs.filter((item, i) => (
      urlSegs.right === item || urlSegs.right === 'all'
    )).map((item, i) => (
      <RightsItem key={i} right={item} onItemClick={this.setRight}>{item}</RightsItem>
    ))

    return (
      <div className={styles.geoPage} ref='page'>
        <SubTopNav />
        <div className='row' ref='content'>
          <div className='column'>
            <div className={styles.columnLeft}>
              <div ref="searchInput">
                <input className={styles.searchInput} type="text" placeholder='Search Country' />
              </div>
              <ul className={styles.regionList} ref="regionList">
                {regionItems}
              </ul>
            </div>
          </div>
          <div className='column'>
            <div className={styles.columnMiddle}>
              <div ref="chartsHeader">Sort by: Name Change standard: Core</div>
              <div className={styles.countriesList} ref="countries">
                {countryItem}
              </div>
              <div className={styles.chartsFooter} ref='chartsFooter'>
                <div className={styles.downloadIcon}><DownloadIcon /></div>
                <div className={styles.text}>Each axis represents a right. The further the score is along each axis, the better the country’s performance on that right.</div>
                <div className={styles.source}><small className={styles.small}>SOURCE:</small> 2018 Human Rights Measurement Initiative (HRMI) DATASET, <a className={styles.small} href="https://humanrightsmeasurement.org">https://humanrightsmeasurement.org</a></div>
              </div>
            </div>
          </div>
          <div className='column'>
            <div className={styles.columnRight}>
              { urlSegs.right === 'all' &&
                <div>
                  <div className={styles.esrTitle}>Economic and Social Rights</div>
                  <ul className={styles.esrList}>
                    {ESRItems}
                  </ul>
                  <div className={styles.cprTitle}>Civil and Political Rights</div>
                  <ul className={styles.cprList}>
                    {CPRItems}
                  </ul>
                </div>
              }
              { urlSegs.right !== 'all' &&
                <div className={styles.specRightInfo}>
                  <div className={styles.specRightHeader} onClick={this.setRightToAll} rightcolor={urlSegs.right}>
                    <div className={styles.rightName}>Right to {urlSegs.right}</div>
                    <div className={styles.rightCate}>{ESRItems.length === 0 ? 'Civil and Political Rights' : 'Ecomonic and Social Rights'}</div>
                  </div>
                  <div className='arrowLink'>
                    <div className='text'>Explore this rights in:</div>
                    <div className='text underline' onClick={this.setExploreBy}>{getRegionName(urlSegs.region)}</div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
