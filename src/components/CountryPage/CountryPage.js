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
              <div className={styles.backBtn}>
                <div className={styles.hintText}>BACK TO</div>
                <div className={styles.backLink} onClick={this.resetCountry}>{getRegionName(urlSegs.region)}</div>
              </div>
              <ul className={styles.countriesList}>
                {countryItem}
              </ul>
            </div>
          </div>
          <div className='column'></div>
          <div className='column'>
            <div>
              <div className={styles.detailCountry}>{currCountry.name}</div>
              <div>POPULATION (2016)</div>
              <div>{currCountry.population} million</div>
              <div>GDP/CAPITA (2016)</div>
              <div>${Math.round(currCountry.GDP2016)} (current PPP dollars)</div>
              <div>ESR</div>
              <BarChartESR data={currCountry.rights.ESR} width={280} height={100} />
              <div>CPR</div>
              <BarChartCPR data={currCountry.rights.CPR} width={280} height={100} />
              { urlSegs.right !== 'all' &&
                <div className='arrowLink'>
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
