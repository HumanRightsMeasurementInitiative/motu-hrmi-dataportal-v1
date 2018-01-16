import React from 'react'
import PropTypes from 'prop-types'
import SubTopNav from '../SubTopNav/'
import RegionItem from './RegionItem'
import RightsItem from './RightsItem'
import RadarChart from '../RadarChart'
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
    this.refs.content.style.height = this.refs.page.offsetHeight - 110 + 'px'
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
      this.props.urlPush(segsToUrl({ ...this.props.urlSegs, right: 'all' }))
    }
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
      <RegionItem key={i} code={item} onItemClick={this.setRegion} selected={item === urlSegs.region}>{getRegionName(item)}</RegionItem>
    ))
    const countryItem = data[urlSegs.region].map((item, i) => (
      <RadarChart
        key={i}
        chartHeight={this.state.chartHeight}
        chartWidth={this.state.chartWidth}
        country={item}
        currCountry={this.state.currCountry}
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
                <input type="text" placeholder='Search Country' />
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
                <div>Higher scores indicate greater respect for this human right.</div>
                <div>Source: 2018 Human Rights Measurement Initiative(HRMI) data-set, https://humanrightsmeasurement.org/</div>
              </div>
            </div>
          </div>
          <div className='column'>
            <div className={styles.columnRight}>
              { ESRItems.length !== 0 && <div>ESR</div> }
              <ul>
                {ESRItems}
              </ul>
              { CPRItems.length !== 0 && <div>CPR</div> }
              <ul>
                {CPRItems}
              </ul>
              { urlSegs.right !== 'all' &&
                <div>
                  <div>
                    { ESRItems.length === 0 ? <div>Civil and Political Rights</div> : <div>Ecomonic and Social Rights</div> }
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
