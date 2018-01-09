import React from 'react'
import PropTypes from 'prop-types'
import SubTopNav from '../SubTopNav/'
import RightsItem from './RightsItem'
import RegionSelector from './RegionSelector'
import { segsToUrl, getRegionName } from '../utils'
import styles from './style.css'

export default class RightsPage extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    urlSegs: PropTypes.object.isRequired,
    urlPush: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = { currCountry: null }
  }

  componentDidMount() {
    this.refs.content.style.height = this.refs.page.offsetHeight - 110 + 'px'
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
    this.props.urlPush(segsToUrl({ ...this.props.urlSegs, exploreBy: 'Geography', country: this.state.currCountry, right: 'all' }))
  }

  setCurrCountry = (country) => {
    if (country !== this.state.currCountry) {
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

    // TODO update
    const countryItem = data[urlSegs.region].map((item, i) => (
      <CountryItem key={i} country={item.code} onItemClick={this.setCurrCountry}>{item.name}</CountryItem>
    ))
    // TODO end

    return (
      <div className={styles.rightsPage} ref='page'>
        <SubTopNav />
        <div className='row' ref='content'>
          <div className='column'>
            <div className={styles.columnLeft}>
              <RegionSelector data={data} urlSegs={urlSegs} onItemClick={this.setRegion} />
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
          <div className='column'>
            <div>{getRegionName(urlSegs.region)}</div>
            <div>{countryItem}</div>
          </div>
          <div className='column'>
            <div>
              <div>
                <div>Right to {urlSegs.right}</div>
                <div>in {getRegionName(urlSegs.region)}</div>
              </div>
              <div className='arrowLink'>
                <div className='text'>Expore all rights in:</div>
                <div className='text underline' onClick={this.setExploreBy}>{getRegionName(urlSegs.region)}</div>
                { this.state.currCountry &&
                  <div className='text underline' onClick={this.setCountry}>{this.state.currCountry}</div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// TODO delete
class CountryItem extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    country: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
  }

  onClick = () => {
    const { country, onItemClick } = this.props
    onItemClick(country)
  }

  render() {
    const { children } = this.props
    return (
      <li onClick={this.onClick}>{children}</li>
    )
  }
}
// TODO end
