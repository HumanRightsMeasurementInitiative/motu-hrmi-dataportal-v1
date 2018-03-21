import React from 'react'
import PropTypes from 'prop-types'
import SubTopNav from '../SubTopNav/'
import CountryItem from './CountryItem'
import CountryRightsChart from 'components/CountryRightsChart'
import BarChartCPR from '../BarChartCPR'
import QuestionTooltip from '../QuestionTooltip'
import DownloadPopup from '../DownloadPopup'
import ChangeStandard from '../ChangeStandard'
import RightDefinition from '../RightDefinition'
import DefinitionFooter from '../DefinitionFooter'
import { segsToUrl } from '../utils'
import styles from './style.css'

function formatPopulation(n) {
  if (!n) return `N/A`
  if (n < 1e6) return Math.round(n).toLocaleString(undefined, { maximumFractionDigits: 0 })
  const millions = (n / 1e6).toLocaleString(undefined, { maximumFractionDigits: 2 })
  return `${millions} m`
}

function formatGDP(n) {
  if (!n) return `N/A`
  return `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })} (current PPP dollars)`
}

export default class CountryPage extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    urlSegs: PropTypes.object.isRequired,
    urlPush: PropTypes.func.isRequired,
    esrStandard: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.state = {
      currRight: 'all',
      rightPaneWidth: 0,
    }
  }

  componentDidMount() {
    const { rightPane } = this.refs
    this.setState({ rightPaneWidth: rightPane.offsetWidth })
  }

  setExploreBy = (right) => {
    const { urlSegs } = this.props
    this.props.urlPush(segsToUrl({ ...urlSegs, exploreBy: 'Rights', right: this.state.currRight, country: undefined }))
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
    const { data: { rightsByRegion }, urlSegs, esrStandard, content } = this.props
    const { currRight } = this.state
    const countries = rightsByRegion[urlSegs.region].countries
    const currCountry = countries.find(country => country.countryCode === urlSegs.country)

    const isHI = rightsByRegion['high-income-oecd'].countries
      .some(c => c.countryCode === currCountry.countryCode)

    const rights = Object.entries(content.rights_definitions).map(([code, right]) => ({ code, ...right }))
    const ESRs = rights.filter(right => right.type === 'ESR')
    const CPRs = rights.filter(right => right.type === 'CPR')
    const isESRSelected = ESRs.some(r => r.code === currRight)
    const isCPRSelected = CPRs.some(r => r.code === currRight)

    const displayPercent = (data) => data !== null ? data.toFixed(0) + '%' : 'N/A'
    const displayTenth = data => data !== null ? data.toFixed(1) + '/10' : 'N/A'

    return (
      <div className={styles.countryPage}>
        <SubTopNav content={content} />
        <div className='row'>
          <div className='column'>
            <div className={styles.backBtn} onClick={this.resetCountry}>
              <div className={styles.hintText}>{content.backto}</div>
              <div className={styles.backLink}>
                {content.region_name[urlSegs.region]}
              </div>
            </div>
            <div className={styles.countriesListWrapper}>
              <ul className={styles.countriesList}>
                {countries.map((country) => (
                  <CountryItem key={country.countryCode} code={country.countryCode} onItemClick={this.setCountry} selected={country.countryCode === urlSegs.country}>
                    {content.countries[country.countryCode]}
                  </CountryItem>
                ))}
              </ul>
            </div>
          </div>

          <div className='column'>
            <div className={styles.countryHeader}>
              <div className={styles.title}>
                <strong>
                  {content.header_text.by_geography}:
                  {' '}
                  <span style={{ color: 'black' }}>{content.countries[currCountry.countryCode]}</span>
                  {' '}
                  {isHI &&
                    <b style={{ color: 'black' }}>*</b>
                  }
                </strong>
              </div>
              <ChangeStandard />
            </div>
            <div className={styles.countryChart}>
              <CountryRightsChart
                rights={currCountry.rights}
                esrStandard={esrStandard}
                size={window.innerHeight - 290}
                margin={200}
                currRight={currRight}
                onClickRight={this.setCurrRight}
                content={content}
                displayLabels
              />
            </div>
            <div className={styles.countryFooter}>
              <div className={styles.downloadPopupWrapper}><DownloadPopup itemList={['radar chart']} content={content} /></div>
              <div className={styles.text} style={{ marginBottom: 4 }}>
                <b style={{ fontSize: 14, color: 'black' }}>*</b>
                {' '}
                {content.high_income_footnote}
              </div>
              <div className={styles.text}>{content.footer_text.by_geography}</div>
              <div className={styles.source}>{content.footer_text.source} <a className={styles.small} href='https://humanrightsmeasurement.org'>https://humanrightsmeasurement.org</a></div>
            </div>
          </div>

          <div className='column' ref='rightPane'>
            <div className={styles.columnRight}>
              <div className={styles.countryInfo}>
                <div className={styles.detailCountry}>{content.countries[currCountry.countryCode]}</div>
                <div className={styles.smallTitle}>{content.population[0].toUpperCase()} (2015)</div>
                <div className={styles.smallText2}>{formatPopulation(currCountry.population)}</div>
                <div className={styles.smallTitle}>{content.population[1].toUpperCase()} (2015)</div>
                <div className={styles.smallText2}>{formatGDP(currCountry.rights[`${esrStandard}Historical`][2015].GDP)}</div>
              </div>
              <div className={styles.rightInfoWrapper}>
                <div className={styles.rightInfo}>
                  { (isESRSelected || currRight === 'all') &&
                    <div>
                      { currRight !== 'all' &&
                        <div>
                          <div className={styles.esrRegionValue}>
                            <span className={styles.text}>{content.rights_name[currRight]}</span>
                            <span className={styles.floatNum}>
                              {displayPercent(currCountry.rights[esrStandard][currRight])}
                            </span>
                          </div>
                          <ul className={styles.esrValueList}>
                            {Object.keys(currCountry.rights[esrStandard][currRight + '_sub']).map((item, i) => (
                              <li key={i} className={styles.withDot}>
                                <span className={styles.text}>{content.score_name[item]}</span>
                                <span className={styles.floatNum}>
                                  {displayPercent(currCountry.rights[esrStandard][currRight + '_sub'][item])}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      }
                    </div>
                  }
                  { (isCPRSelected && currRight !== 'all') &&
                    <div>
                      <div className={styles.cprRegionValue}>
                        <span className={styles.text}>{content.rights_name[currRight]}</span>
                        <span className={styles.floatNum}>
                          {currCountry.rights.cpr
                            ? displayTenth(currCountry.rights.cpr[currRight].mean)
                            : 'N/A'
                          }
                        </span>
                      </div>
                      <div style={{ margin: `25px 0` }}>
                        {currCountry.rights.cpr &&
                          <BarChartCPR data={currCountry.rights.cpr} rightCode={currRight} height={120} />
                        }
                      </div>
                    </div>
                  }

                  {currRight === 'all'
                    ? <div className={styles.countryQues}>
                      <QuestionTooltip width={288} question={content.country_tooltips[0].question}>
                        <p>{content.country_tooltips[0].paragraphs} <a href='https://humanrightsmeasurement.org/wp-content/uploads/2018/03/HRMI-Methodology-Note-2018.pdf' target='_blank'>{content.country_tooltips[0].linkText}</a>.</p>
                      </QuestionTooltip>
                      <QuestionTooltip width={244} question={content.country_tooltips[1].question}>
                        <p>{content.country_tooltips[1].paragraphs}</p>
                      </QuestionTooltip>
                      <QuestionTooltip width={286} question={content.country_tooltips[2].question}>
                        <p>{content.country_tooltips[2].paragraphs}</p>
                      </QuestionTooltip>
                    </div>
                    : <div className={styles.rightDefinition}>
                      <div className='arrowLink' style={{ marginLeft: '-24px' }}>
                        <div className='text'>{content.explore_this_rights_in}:</div>
                        <div className='text underline' onClick={this.setExploreBy}>{content.region_name[urlSegs.region]}</div>
                      </div>
                      <RightDefinition isESRSelected={isESRSelected} right={currRight} content={content} />

                      { currRight &&
                        <DefinitionFooter
                          isESRSelected={isESRSelected}
                          isCPRSelected={isCPRSelected}
                          currCountry={currCountry}
                          currRight={currRight}
                          content={content}
                        />
                      }
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
