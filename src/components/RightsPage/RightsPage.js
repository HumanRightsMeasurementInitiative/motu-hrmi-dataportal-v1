import React from 'react'
import PropTypes from 'prop-types'
import SubTopNav from '../SubTopNav/'
import RightsItem from './RightsItem'
import RegionSelector from './RegionSelector'
import RightBarchart from '../RightBarchart/'
import DownloadIcon from '../DownloadIcon'
import { segsToUrl, getRegionName, joinClassName as jcn } from '../utils'
import styles from './style.css'

export default class RightsPage extends React.Component {
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
    this.refs.rightList.style.height = this.refs.content.offsetHeight - this.refs.regionSelector.offsetHeight + 'px'
    this.refs.charts.style.height = this.refs.content.offsetHeight - this.refs.chartsHeader.offsetHeight - this.refs.chartsFooter.offsetHeight + 'px'
    this.refs.infoContent.style.height = this.refs.content.offsetHeight - this.refs.infoHeader.offsetHeight + 'px'
    this.setState({ chartHeight: this.refs.charts.offsetHeight, chartWidth:  this.refs.charts.offsetWidth })
  }

  setExploreBy = (right) => {
    const { urlSegs } = this.props
    this.props.urlPush(segsToUrl({ ...urlSegs, exploreBy: 'Geography', right: 'all', country: undefined }))
  }

  setRegion = (region) => {
    // need to check if dataset of current right is available in this region
    this.props.urlPush(segsToUrl({ ...this.props.urlSegs, region: region, country: undefined }))
  }

  setRight = (right) => {
    // need to check if dataset of this right is available in current region
    this.props.urlPush(segsToUrl({ ...this.props.urlSegs, right: right }))
  }

  setCountry = () => {
    this.props.urlPush(segsToUrl({ ...this.props.urlSegs, exploreBy: 'Geography', country: this.state.currCountry.code, right: 'all' }))
  }

  setCurrCountry = (country) => {
    if (this.state.currCountry === null || country.name !== this.state.currCountry.name) {
      this.setState({ currCountry: country })
    } else {
      this.setState({ currCountry: null })
    }
  }

  render() {
    const { data, urlSegs } = this.props

    const ESRs = ['Food', 'Education', 'Work', 'Housing', 'Health']
    const CPRs = ['Opinion and Expression', 'Assembly and Association', 'Freedom from Execution', 'Freedom from Torture', 'Participate in Government', 'Freedom from Arbitrary Arrest', 'Freedom from Disappearance']

    const ESRItems = ESRs.map((item, i) => (
      <RightsItem key={i} right={item} onItemClick={this.setRight} selected={item === urlSegs.right}>{item}</RightsItem>
    ))
    const CPRItems = CPRs.map((item, i) => (
      <RightsItem key={i} right={item} onItemClick={this.setRight} selected={item === urlSegs.right}>{item}</RightsItem>
    ))

    const colorClassName = jcn({
      rightInfo: true,
      esrs: ESRs.indexOf(urlSegs.right) > -1,
      cprs: CPRs.indexOf(urlSegs.right) > -1,
    }, styles)

    return (
      <div className={styles.rightsPage} ref='page'>
        <SubTopNav />
        <div className='row' ref='content'>
          <div className='column'>
            <div className={styles.columnLeft}>
              <div ref="regionSelector">
                <RegionSelector data={data} urlSegs={urlSegs} onItemClick={this.setRegion} />
              </div>
              <div className={styles.rightList} ref="rightList">
                <div className={styles.ESRTitle}>Economic and Social Rights</div>
                <ul>
                  {ESRItems}
                </ul>
                <div className={styles.CPRTitle}>Civil and Political Rights</div>
                <ul>
                  {CPRItems}
                </ul>
              </div>
            </div>
          </div>
          <div className='column'>
            <div ref="chartsHeader">{getRegionName(urlSegs.region)} sort by: Name</div>
            <div className={styles.chartsContainer} ref="charts">
              <RightBarchart
                isESR={ESRs.indexOf(urlSegs.right) > -1}
                currRight={urlSegs.right}
                data={data[urlSegs.region]}
                chartHeight={this.state.chartHeight * 0.7}
                chartWidth={this.state.chartWidth}
                currCountry={this.state.currCountry}
                onItemClick={this.setCurrCountry}>
              </RightBarchart>
            </div>
            <div className={styles.chartsFooter} ref='chartsFooter'>
              <div className={styles.downloadIcon}><DownloadIcon /></div>
              <div className={styles.text}>Hight Scores indicate greater respect for this human right.</div>
              <div className={styles.source}><small className={styles.small}>SOURCE:</small> 2018 Human Rights Measurement Initiative (HRMI) DATASET, <a className={styles.small} href="https://humanrightsmeasurement.org">https://humanrightsmeasurement.org</a></div>
            </div>
          </div>
          <div className='column'>
            <div ref="infoHeader">
              <div className={colorClassName}>
                <div className={styles.rightName}>Right to {urlSegs.right}</div>
                <div className={styles.regionName}>in {getRegionName(urlSegs.region)}</div>
              </div>
              <div className='arrowLink'>
                <div className='text'>Expore all rights in:</div>
                <div className='text underline' onClick={this.setExploreBy}>{getRegionName(urlSegs.region)}</div>
                { this.state.currCountry !== null &&
                  <div className='text underline' onClick={this.setCountry}>{this.state.currCountry.name}</div>
                }
              </div>
            </div>
            <div className={styles.infoContent} ref="infoContent">
              <div className={styles.textWrapper}>
                <p className={styles.definition}>According to international law, everyone has the fundamental right to be free from hunger. Everyone has the right to enjoy "the availability of food in a quantity and quality sufficient to satisfy [their] dietary needs … free from adverse substances, and acceptable within a given culture" (ICESCR Art. 11 and CESCR General Comment 12).</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
