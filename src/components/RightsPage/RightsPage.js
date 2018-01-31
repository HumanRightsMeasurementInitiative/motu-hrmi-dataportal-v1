import React from 'react'
import PropTypes from 'prop-types'
import SubTopNav from '../SubTopNav/'
import RightsItem from './RightsItem'
import RegionSelector from './RegionSelector'
import RightBarchart from '../RightBarchart/'
import DownloadIcon from '../DownloadIcon'
import { segsToUrl, getRegionName, joinClassName as jcn } from '../utils'
import styles from './style.css'
import rightsDefinitions from 'data/rights-definitions.json'

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
    const { data: { rightsByRegion }, urlSegs } = this.props

    const rights = Object.entries(rightsDefinitions).map(([code, right]) => ({ code, ...right }))
    const ESRs = rights.filter(right => right.type === 'ESR')
    const CPRs = rights.filter(right => right.type === 'CPR')

    const ESRItems = ESRs.map((right, i) => (
      <RightsItem key={right.code} right={right.code} onItemClick={this.setRight} selected={right.code === urlSegs.right}>
        {right.code}
      </RightsItem>
    ))
    const CPRItems = CPRs.map((right, i) => (
      <RightsItem key={right.code} right={right.code} onItemClick={this.setRight} selected={right.code === urlSegs.right}>
        {right.code}
      </RightsItem>
    ))

    const isESRSelected = ESRs.some(r => r.code === urlSegs.right)
    const isCPRSelected = CPRs.some(r => r.code === urlSegs.right)

    const colorClassName = jcn({
      rightInfo: true,
      esrs: isESRSelected,
      cprs: isCPRSelected,
    }, styles)

    const rightsByRegionCountries = rightsByRegion[urlSegs.region].countries

    return (
      <div className={styles.rightsPage}>
        <SubTopNav />
        <div className='row'>
          <div className='column'>
            <div className={styles.columnLeft}>
              <div className={styles.regionSelectorWrapper}>
                <RegionSelector rightsByRegion={rightsByRegion} urlSegs={urlSegs} onItemClick={this.setRegion} />
              </div>
              <div className={styles.rightsWrapper}>
                <div className={styles.rightList}>
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
          </div>
          <div className='column'>
            <div className={styles.chartsHeader}>
              <div className={styles.regionName}>{getRegionName(urlSegs.region)}</div>
              <div className={styles.sortBy}>Sort by: Name</div>
            </div>
            <div className={styles.chartsContainer} ref="charts">
              <RightBarchart
                isESR={rightsDefinitions[urlSegs.right].type === 'ESR'}
                currRight={urlSegs.right}
                rightsByRegionCountries={rightsByRegionCountries}
                chartHeight={this.state.chartHeight * 0.7}
                chartWidth={this.state.chartWidth}
                currCountry={this.state.currCountry}
                onItemClick={this.setCurrCountry}>
              </RightBarchart>
            </div>
            <div className={styles.chartsFooter}>
              <div className={styles.downloadIcon}><DownloadIcon /></div>
              <div className={styles.text}>Hight Scores indicate greater respect for this human right.</div>
              <div className={styles.source}><small className={styles.small}>SOURCE:</small> 2018 Human Rights Measurement Initiative (HRMI) DATASET, <a className={styles.small} href="https://humanrightsmeasurement.org">https://humanrightsmeasurement.org</a></div>
            </div>
          </div>
          <div className='column'>
            <div className={styles.infoHeader}>
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
            <div className={styles.infoContent}>
              <div className={styles.textWrapper}>
                { rightsDefinitions[urlSegs.right].definition
                  ? <p className={styles.definition}>{rightsDefinitions[urlSegs.right].definition}</p>
                  : <ul>
                    {rightsDefinitions[urlSegs.right].measure_list.map((item, i) => {
                      return (<li key={i} className={styles.defList}>{item}</li>)
                    })}
                  </ul>
                }
                { rightsDefinitions[urlSegs.right].conclusion_para &&
                  <p className={styles.definition}>{rightsDefinitions[urlSegs.right].conclusion_para}</p>
                }
                <p className={styles.measureQues}>How has HRMI measured the Right to {urlSegs.right}?</p>
                { rightsDefinitions[urlSegs.right].core_text &&
                  <div>
                    <p>{rightsDefinitions[urlSegs.right].core_text}</p>
                    <ul>
                      {
                        rightsDefinitions[urlSegs.right].core_indicator.map((item, i) => (
                          <li key={i} className={styles.withDot}>{item}</li>
                        ))
                      }
                    </ul>
                  </div>
                }
                { rightsDefinitions[urlSegs.right].high_text &&
                  <div>
                    <p>{rightsDefinitions[urlSegs.right].high_text}</p>
                    <ul>
                      {
                        rightsDefinitions[urlSegs.right].high_indicator.map((item, i) => (
                          <li key={i} className={styles.withDot}>{item}</li>
                        ))
                      }
                    </ul>
                  </div>
                }
                { isESRSelected &&
                  <div>
                    <div className={styles.indicatorQues}>Why aren't the same indicators used for all countries?</div>
                    <div></div>
                  </div>
                }
                { urlSegs.right === 'Food' &&
                  <div>
                    <div className={styles.indicatorQues}>How does the HRMI methodology convert the above indicators into the Right to Food metric?</div>
                    <div></div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
