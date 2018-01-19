import React from 'react'
import PropTypes from 'prop-types'
import SubTopNav from '../SubTopNav/'
import CountryItem from './CountryItem'
import BarChartESR from '../BarChartESR/'
import BarChartCPR from '../BarChartCPR/'
import RadarChart from '../RadarChart'
import DownloadIcon from '../DownloadIcon'
import { segsToUrl, getRegionName } from '../utils'
import styles from './style.css'

export default class CountryPage extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    urlSegs: PropTypes.object.isRequired,
    urlPush: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      currRight: 'all',
      chartHeight: 0,
      chartWidth: 0,
    }
  }

  componentDidMount() {
    this.props.closeStoryMode()
    this.refs.content.style.height = this.refs.page.offsetHeight - 110 + 'px'
    this.refs.countriesList.style.height = this.refs.content.offsetHeight - this.refs.backBtn.offsetHeight + 'px'
    this.refs.countryChart.style.height = this.refs.content.offsetHeight - this.refs.countryHeader.offsetHeight - this.refs.countryFooter.offsetHeight + 'px'
    this.refs.rightInfo.style.height = this.refs.content.offsetHeight - this.refs.countryInfo.offsetHeight + 'px'
    this.setState({ chartHeight: this.refs.countryChart.offsetHeight, chartWidth: this.refs.countryChart.offsetWidth })
  }

  setExploreBy = (right) => {
    const { urlSegs } = this.props
    this.props.urlPush(segsToUrl({ ...urlSegs, exploreBy: 'Rights', country: undefined }))
  }

  setCountry = (country) => {
    this.props.urlPush(segsToUrl({ ...this.props.urlSegs, country: country }))
  }

  resetCountry = () => {
    this.props.urlPush(segsToUrl({ ...this.props.urlSegs, country: undefined, right: 'all' }))
  }

  setCurrRight = (right) => {
    if (right !== this.state.currRight) {
      this.setState({ currRight: right })
    } else {
      this.setState({ currRight: 'all' })
    }
  }

  render() {
    const { data, urlSegs } = this.props

    const contries = data[urlSegs.region]
    const ESRs = ['Food', 'Education', 'Work', 'Housing', 'Health']
    const CPRs = ['Opinion and Expression', 'Assembly and Association', 'Freedom from Execution', 'Freedom from Torture', 'Participate in Government', 'Freedom from Arbitrary Arrest', 'Freedom from Disappearance']

    let currCountry
    const countryItem = contries.map((item, i) => {
      if (item.code === urlSegs.country) currCountry = item
      return <CountryItem key={i} code={item.code} onItemClick={this.setCountry} selected={item.code === urlSegs.country}>{item.name}</CountryItem>
    })

    return (
      <div className={styles.countryPage} ref='page'>
        <SubTopNav />
        <div className='row' ref='content'>
          <div className='column'>
            <div className={styles.columnLeft}>
              <div className={styles.backBtn} ref="backBtn">
                <div className={styles.hintText}>BACK TO</div>
                <div className={styles.backLink} onClick={this.resetCountry}>{getRegionName(urlSegs.region)}</div>
              </div>
              <ul className={styles.countriesList} ref="countriesList">
                {countryItem}
              </ul>
            </div>
          </div>
          <div className='column'>
            <div ref="countryHeader">Compare with Change assessment standard: Core</div>
            <ul ref="countryChart">
              <RadarChart
                chartHeight={this.state.chartHeight}
                chartWidth={this.state.chartWidth}
                currRight={this.state.currRight}
                rights={ESRs.concat(CPRs)}
                onRightClick={this.setCurrRight}
              ></RadarChart>
            </ul>
            <div className={styles.countryFooter} ref='countryFooter'>
              <div className={styles.downloadIcon}><DownloadIcon /></div>
              <div className={styles.text}>Each axis represents a right. The further the score is along each axis, the better the country’s performance on that right.</div>
              <div className={styles.source}><small className={styles.small}>SOURCE:</small> 2018 Human Rights Measurement Initiative (HRMI) DATASET, <a className={styles.small} href="https://humanrightsmeasurement.org">https://humanrightsmeasurement.org</a></div>
            </div>
          </div>
          <div className='column'>
            <div className={styles.columnRight} ref="columnRight">
              <div ref="countryInfo">
                <div className={styles.detailCountry}>{currCountry.name}</div>
                <div className={styles.smallTitle}>POPULATION (2016)</div>
                <div className={styles.smallText2}>{currCountry.population} million</div>
                <div className={styles.smallTitle}>GDP/CAPITA (2016)</div>
                <div className={styles.smallText2}>${Math.round(currCountry.GDP2016)} (current PPP dollars)</div>
              </div>
              <div className={styles.rightInfo} ref="rightInfo">
                { CPRs.indexOf(this.state.currRight) === -1 &&
                  <div>
                    <div className={styles.subtitleESR}>ESR</div>
                    <div className={styles.smallText2}>most recent data (2015 or earlier)</div>
                    <div className={styles.barChartWrapper}><BarChartESR data={currCountry.rights.ESR} height={80} /></div>
                  </div>
                }
                { ESRs.indexOf(this.state.currRight) === -1 &&
                  <div>
                    <div className={styles.subtitleCPR}>CPR</div>
                    <div className={styles.smallText2}>data is for period january - june 2017</div>
                    <div className={styles.barChartWrapper}><BarChartCPR data={currCountry.rights.CPR} height={80} /></div>
                    <div className={styles.legend}><div className={styles.uncertaintyIcon}></div> 95% UNCERTAINTY BAND</div>
                  </div>
                }
                {
                  this.state.currRight === 'all'
                  ? <div>
                    <a className={styles.link} href="">Why are the two types of metrics not on the same scale?</a>
                    <a className={styles.link} href="">Why are the two sets of metrics not for the same year?</a>
                    <a className={styles.link} href="">What is the difference between the core and the high income OECD country scale?</a>
                  </div>
                  : <div className='arrowLink'>
                    <div className='text'>Explore this rights in:</div>
                    <div className='text underline' onClick={this.setExploreBy}>{getRegionName(urlSegs.region)}</div>
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
