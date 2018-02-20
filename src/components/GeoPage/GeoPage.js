import React from 'react'
import PropTypes from 'prop-types'
import CountryRightsChart from 'components/CountryRightsChart'
import SubTopNav from '../SubTopNav/'
import RegionItem from '../RegionItem'
import RightsItem from './RightsItem'
import DownloadPopup from '../DownloadPopup'
import ChangeStandard from '../ChangeStandard'
import MiniBarChart from '../GeoMiniBarChart'
import RightDefinition from '../RightDefinition'
import { segsToUrl } from '../utils'
import rightsDefinitions from 'data/rights-definitions.json'
import styles from './style.css'

function rewriteArgs(fn, ...args) {
  return () => fn(...args)
}

export default class GeoPage extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    urlSegs: PropTypes.object.isRequired,
    urlPush: PropTypes.func.isRequired,
    esrStandard: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.state = { currCountry: null, hoverCountry: null }
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
      this.setRightToAll()
    }
  }

  setRightToAll = () => {
    this.props.urlPush(segsToUrl({ ...this.props.urlSegs, right: 'all' }))
  }

  setExploreBy = (right) => {
    const { urlSegs } = this.props
    this.props.urlPush(segsToUrl({ ...urlSegs, exploreBy: 'Rights' }))
  }

  setCurrCountry = (country) => {
    this.setState({ currCountry: country })
  }

  unsetCurrCountry = (country) => {
    this.setState({ currCountry: null })
  }

  setHoverCountry = (country) => {
    this.setState({ hoverCountry: country })
  }

  unsetHoverCountry = (country) => {
    this.setState({ hoverCountry: null })
  }

  render() {
    const { data: { rightsByRegion }, urlSegs, esrStandard, content } = this.props
    const tooltips = content.question_tooltips
    const countries = rightsByRegion[urlSegs.region].countries
    const regionCodes = Object.keys(rightsByRegion)

    const rights = Object.entries(rightsDefinitions).map(([code, right]) => ({ code, ...right }))
    const rightsESR = rights.filter(right => right.type === 'ESR')
    const rightsCPR = rights.filter(right => right.type === 'CPR')
    const displayedRightsESR = urlSegs.right === 'all'
      ? rightsESR
      : rightsESR.filter(right => right.code === urlSegs.right)
    const displayedRightsCPR = urlSegs.right === 'all'
      ? rightsCPR
      : rightsCPR.filter(right => right.code === urlSegs.right)

    return (
      <div className={styles.geoPage}>
        <SubTopNav content={content} />
        <div className='row'>
          <div className='column'>
            <div className={styles.columnLeft}>
              <div className={styles.searchInputWrapper}>
                <input className={styles.searchInput} type='text' placeholder={content.search_country} />
              </div>
              <ul className={styles.regionList}>
                {regionCodes.map((regionCode, i) => (
                  <RegionItem key={regionCode} code={regionCode} onItemClick={this.setRegion} selected={regionCode === urlSegs.region}>
                    {content.region_name[regionCode]}
                  </RegionItem>
                ))}
              </ul>
            </div>
          </div>
          <div className='column'>
            <div className={styles.columnMiddle}>
              <div className={styles.chartsHeader}>
                <div className={styles.title}>
                  <strong>{content.header_text.by_geography} {content.region_name[urlSegs.region]}</strong>
                </div>
                <div className={styles.standard}>
                  <ChangeStandard />
                </div>
              </div>
              <div className={styles.countriesList}>
                <div className={styles.countriesContainer}>
                  {countries.map((country, i) => (
                    <div
                      key={country.countryCode}
                      className={styles.countryCard}
                      onClick={rewriteArgs(this.setCountry, country.countryCode)}
                    >
                      <CountryRightsChart
                        rights={country.rights}
                        currRight={urlSegs.right === 'all' ? null : urlSegs.right}
                        esrStandard={esrStandard}
                        size={165}
                      />
                      <span>{country.countryCode} {this.state.hoverCountry === country.countryCode}</span>
                      <div
                        className={styles.cardCover}
                        onMouseOver={rewriteArgs(this.setHoverCountry, country.countryCode)}
                        onMouseOut={this.unsetHoverCountry}
                        style={{ opacity: this.state.hoverCountry === null || this.state.hoverCountry === country.countryCode ? 0 : 1 }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.chartsFooter}>
                <div className={styles.downloadPopupWrapper}><DownloadPopup itemList={['chart']} content={content} /></div>
                <div className={styles.text}>{content.footer_text.by_geography}</div>
                <div className={styles.source}>{content.footer_text.source} <a className={styles.small} href='https://humanrightsmeasurement.org'>https://humanrightsmeasurement.org</a></div>
              </div>
            </div>
          </div>
          <div className='column'>
            <div className={styles.columnRight}>
              { urlSegs.right === 'all'
                ? (
                  <div>
                    <div className={styles.esrTitle}>{content.rights_category.esr}</div>
                    <ul className={styles.esrList}>
                      {displayedRightsESR.map((right, i) => (
                        <RightsItem
                          key={i}
                          right={right.code}
                          isESR={true}
                          data={rightsByRegion[urlSegs.region]}
                          esrStandard={esrStandard}
                          onItemClick={this.setRight}
                          hoverCountry={this.state.hoverCountry}>
                          {content.rights_name[right.code]}
                        </RightsItem>
                      ))}
                    </ul>
                    <div className={styles.cprTitle}>{content.rights_category.cpr}</div>
                    <ul className={styles.cprList}>
                      {displayedRightsCPR.map((right, i) => (
                        <RightsItem
                          key={i}
                          right={right.code}
                          isESR={false}
                          data={rightsByRegion[urlSegs.region]}
                          onItemClick={this.setRight}
                          hoverCountry={this.state.hoverCountry}>
                          {content.rights_name[right.code]}
                        </RightsItem>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className={styles.specRightInfo}>
                    <div className={styles.specRightHeader} onClick={this.setRightToAll} rightcolor={urlSegs.right}>
                      <div className={styles.rightName}>{content.rights_name[urlSegs.right]}</div>
                      <div className={styles.rightCate}>
                        {displayedRightsESR.length === 0 ? content.rights_category.cpr : content.rights_category.esr}
                      </div>
                      { displayedRightsESR.length
                        ? <MiniBarChart height={60} data={rightsByRegion[urlSegs.region]} isESR={true} right={urlSegs.right} hoverCountry={this.state.hoverCountry} esrStandard={esrStandard} />
                        : <MiniBarChart height={60} data={rightsByRegion[urlSegs.region]} isESR={false} right={urlSegs.right} hoverCountry={this.state.hoverCountry} />
                      }
                      <div className={styles.linkWrapper}>
                        <div className='arrowLink'>
                          <div className='text'>{content.explore_this_rights_in}:</div>
                          <div className='text underline' onClick={this.setExploreBy}>
                            {content.region_name[urlSegs.region]}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.definitionWrapper}>
                      <div className={styles.rightInfo}>
                        <RightDefinition right={urlSegs.right} isESRSelected={displayedRightsESR.length !== 0} tooltips={tooltips} content={content} />
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
