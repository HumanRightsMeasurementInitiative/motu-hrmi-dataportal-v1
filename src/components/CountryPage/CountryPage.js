import React from 'react'
import PropTypes from 'prop-types'
import SubTopNav from '../SubTopNav/'
import CountryItem from './CountryItem'
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
    this.props.urlPush(segsToUrl({ ...urlSegs, exploreBy: 'Rights' }))
  }

  setCountry = (country) => {
    if (country) {
      this.props.urlPush(segsToUrl({ ...this.props.urlSegs, country: country }))
    } else {
      this.props.urlPush(segsToUrl({ ...this.props.urlSegs, country: undefined }))
    }
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
              <div>
                <div className={styles.backLink} onClick={this.setCountry}>{getRegionName(urlSegs.region)}</div>
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
              <div>population</div>
              <div>43.9(2016)</div>
              <div>GDP/Capita(2016)</div>
              <div>$$$</div>
              <div>ESR</div>
              <div>CPR</div>
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
