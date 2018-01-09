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

  constructor() {
    super()
    this.state = { currRight: 'all' }
  }

  componentDidMount() {
    this.refs.content.style.height = this.refs.page.offsetHeight - 110 + 'px'
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

    // TODO modify
    const ESRList = ESRs.map((item, i) => {
      return <RightsItem key={i} right={item} onItemClick={this.setCurrRight}>Right to {item}</RightsItem>
    })
    const CPRList = CPRs.map((item, i) => {
      return <RightsItem key={i} right={item} onItemClick={this.setCurrRight}>Right to {item}</RightsItem>
    })
    // TODO end

    return (
      <div className={styles.countryPage} ref='page'>
        <SubTopNav />
        <div className='row' ref='content'>
          <div className='column'>
            <div className={styles.columnLeft}>
              <div className={styles.backBtn}>
                <div className={styles.hintText}>BACK TO</div>
                <div className={styles.backLink} onClick={this.resetCountry}>{getRegionName(urlSegs.region)}</div>
              </div>
              <ul className={styles.countriesList}>
                {countryItem}
              </ul>
            </div>
          </div>
          <div className='column'>
            <ul>
              {ESRList}
              {CPRList}
            </ul>
          </div>
          <div className='column'>
            <div className={styles.columnRight}>
              <div>
                <div className={styles.detailCountry}>{currCountry.name}</div>
                <div className={styles.smallTitle}>POPULATION (2016)</div>
                <div className={styles.smallText2}>{currCountry.population} million</div>
                <div className={styles.smallTitle}>GDP/CAPITA (2016)</div>
                <div className={styles.smallText2}>${Math.round(currCountry.GDP2016)} (current PPP dollars)</div>
              </div>
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
    )
  }
}

// TODO delete
class RightsItem extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    right: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
  }

  onClick = () => {
    const { right, onItemClick } = this.props
    onItemClick(right)
  }

  render() {
    const { children } = this.props
    return (
      <li onClick={this.onClick}>{children}</li>
    )
  }
}
// TODO end