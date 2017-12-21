import React from 'react'
import PropTypes from 'prop-types'
import SubTopNav from '../SubTopNav/'
import CountryItem from './CountryItem'
import BarChartESR from '../BarChartESR/'
import BarChartCPR from '../BarChartCPR/'
import { segsToUrl, getRegionName } from '../utils'
import styles from './style.css'

export default class CountryPage extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    urlSegs: PropTypes.object.isRequired,
    urlPush: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.refs.content.style.height = this.refs.page.offsetHeight - 90 + 'px'
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

  render() {
    const { data, urlSegs } = this.props

    const contries = data[urlSegs.region]

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
              <div className={styles.hintText}>Back to:</div>
              <div className={styles.backLink} onClick={this.resetCountry}>{getRegionName(urlSegs.region)}</div>
              <ul className={styles.countriesList}>
                {countryItem}
              </ul>
            </div>
          </div>
          <div className='column'></div>
          <div className='column'>
            <div className={styles.columnRight}>
              <div className={styles.detailCountry}>{currCountry.name}</div>
              <div className={styles.smallTitle}>POPULATION (2016)</div>
              <div className={styles.smallText}>{currCountry.population} million</div>
              <div className={styles.smallTitle}>GDP/CAPITA (2016)</div>
              <div className={styles.smallText}>${Math.round(currCountry.GDP2016)} (current PPP dollars)</div>
              <div className={styles.subtitleESR}>ESR</div>
              <div className={styles.smallText}>most recent data (2015 or earlier)</div>
              <div className={styles.barChartWrapper}><BarChartESR data={currCountry.rights.ESR} height={80} /></div>
              <div className={styles.subtitleCPR}>CPR</div>
              <div className={styles.smallText}>data is for period january - june 2017</div>
              <div className={styles.barChartWrapper}><BarChartCPR data={currCountry.rights.CPR} height={80} /></div>
              <div className={styles.legend}><div className={styles.uncertaintyIcon}></div> 95% UNCERTAINTY BAND</div>
              {
                urlSegs.right === 'all'
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
    )
  }
}
