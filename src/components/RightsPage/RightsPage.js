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

  componentDidMount() {
    this.refs.content.style.height = this.refs.page.offsetHeight - 90 + 'px'
  }

  setExploreBy = (right) => {
    const { urlSegs } = this.props
    this.props.urlPush(segsToUrl({ ...urlSegs, exploreBy: 'Geography', right: 'all' }))
  }

  setRegion = (region) => {
    this.props.urlPush(segsToUrl({ ...this.props.urlSegs, region: region }))
  }

  setRight = (right) => {
    this.props.urlPush(segsToUrl({ ...this.props.urlSegs, right: right }))
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

    return (
      <div className={styles.rightsPage} ref='page'>
        <SubTopNav />
        <div className='row' ref='content'>
          <div className='column'>
            <div className={styles.columnLeft}>
              <RegionSelector data={data} urlSegs={urlSegs} onItemClick={this.setRegion} />
              <div>Economic and Social Rights</div>
              <ul>
                {ESRItems}
              </ul>
              <div>Civil and Political Rights</div>
              <ul>
                {CPRItems}
              </ul>
            </div>
          </div>
          <div className='column'>
            <div>{getRegionName(urlSegs.region)}</div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
