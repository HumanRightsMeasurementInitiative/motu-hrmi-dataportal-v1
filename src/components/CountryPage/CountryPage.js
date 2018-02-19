import React from 'react'
import PropTypes from 'prop-types'
import SubTopNav from '../SubTopNav/'
import CountryItem from './CountryItem'
import BarChartESR from '../BarChartESR/'
import BarChartCPR from '../BarChartCPR/'
import CountryRightsChart from 'components/CountryRightsChart'
import QuestionTooltip from '../QuestionTooltip'
import DownloadPopup from '../DownloadPopup'
import ChangeStandard from '../ChangeStandard'
import WordCloudChart from '../WordCloudChart'
import AbuseBarChart from '../AbuseBarChart'
import { segsToUrl, getRegionName } from '../utils'
import styles from './style.css'
import rightsDefinitions from '../../data/rights-definitions.json'

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
      showMore: false,
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

  toggleShowMore = () => {
    this.setState({ showMore: !this.state.showMore })
  }

  render() {
    const { data: { rightsByRegion }, urlSegs, esrStandard, content } = this.props
    const { currRight, showMore } = this.state
    const countries = rightsByRegion[urlSegs.region].countries
    const currCountry = countries.find(country => country.countryCode === urlSegs.country)

    const rights = Object.entries(rightsDefinitions).map(([code, right]) => ({ code, ...right }))
    const ESRs = rights.filter(right => right.type === 'ESR')
    const CPRs = rights.filter(right => right.type === 'CPR')
    const isESRSelected = ESRs.some(r => r.code === currRight)
    const isCPRSelected = CPRs.some(r => r.code === currRight)

    const displayPercent = (data) => data !== null ? data.toFixed(0) + '%' : 'N/A'
    const displayTenth = data => data !== null ? data.toFixed(1) + '/10' : 'N/A'

    const cloudWords = isCPRSelected && currCountry && currRight !== 'all' && currCountry.rights.cprRangeAtRisk
      ? currCountry.rights.cprRangeAtRisk[currRight]
      : ''

    return (
      <div className={styles.countryPage}>
        <SubTopNav content={content} />
        <div className='row'>
          <div className='column'>
            <div className={styles.backBtn} onClick={this.resetCountry}>
              <div className={styles.hintText}>BACK TO</div>
              <div className={styles.backLink}>
                {content.region_name[urlSegs.region]}
              </div>
            </div>
            <div className={styles.countriesListWrapper}>
              <ul className={styles.countriesList}>
                {countries.map((country) => (
                  <CountryItem key={country.countryCode} code={country.countryCode} onItemClick={this.setCountry} selected={country.countryCode === urlSegs.country}>
                    {country.countryName}
                  </CountryItem>
                ))}
              </ul>
            </div>
          </div>

          <div className='column'>
            <div className={styles.countryHeader}>
              <div className={styles.title}>
                <strong>{content.header_text.by_geography} {currCountry.countryName}</strong>
              </div>
              <ChangeStandard />
            </div>
            <div className={styles.countryChart}>
              <CountryRightsChart
                rights={currCountry.rights}
                esrStandard={esrStandard}
                size={740}
                margin={200}
                currRight={currRight}
                onClickRight={this.setCurrRight}
                displayLabels
              />
            </div>
            <div className={styles.countryFooter}>
              <div className={styles.downloadPopupWrapper}><DownloadPopup itemList={['chart']} content={content} /></div>
              <div className={styles.text}>{content.footer_text.by_geography}</div>
              <div className={styles.source}>{content.footer_text.source} <a className={styles.small} href='https://humanrightsmeasurement.org'>https://humanrightsmeasurement.org</a></div>
            </div>
          </div>

          <div className='column' ref='rightPane'>
            <div className={styles.columnRight}>
              <div className={styles.countryInfo}>
                <div className={styles.detailCountry}>{currCountry.countryName}</div>
                <div className={styles.smallTitle}>POPULATION (2015)</div>
                <div className={styles.smallText2}>{currCountry.population} million</div>
                <div className={styles.smallTitle}>GDP/CAPITA (2015)</div>
                <div className={styles.smallText2}>${Math.round(currCountry.rights[`${esrStandard}Historical`][2015].GDP).toLocaleString()} (current PPP dollars)</div>
              </div>
              <div className={styles.rightInfoWrapper}>
                <div className={styles.rightInfo}>
                  { (isESRSelected || currRight === 'all') &&
                    <div>
                      <div className={styles.subtitleESR}>{content.rights_category.esr}</div>
                      <div className={styles.esrChartSubtitle}>most recent data (2015 or earlier)</div>
                      <div className={styles.barChartWrapper} style={{ height: 80 }}>
                        <BarChartESR data={currCountry.rights[esrStandard]} />
                      </div>
                      { currRight !== 'all' &&
                        <div>
                          <div className={styles.esrRegionValue}>
                            {content.rights_name[currRight]}
                            {' '}
                            <span className={styles.floatNum}>
                              {displayPercent(currCountry.rights[esrStandard][currRight])}
                            </span>
                          </div>
                          <ul className={styles.esrValueList}>
                            {
                              Object.keys(currCountry.rights[esrStandard][currRight + '_sub']).map((item, i) => {
                                return <li key={i} className={styles.withDot}>{content.score_name[item]} <span className={styles.floatNum}>{displayPercent(currCountry.rights[esrStandard][currRight + '_sub'][item])}</span></li>
                              })
                            }
                          </ul>
                        </div>
                      }
                    </div>
                  }
                  { (isCPRSelected || currRight === 'all') &&
                    <div>
                      { currCountry.rights.cpr &&
                        <div>
                          <div className={styles.subtitleCPR}>{content.rights_category.cpr}</div>
                          <div className={styles.cprChartSubtitle}>data is for period january - june 2017</div>
                          <div className={styles.barChartWrapper}>
                            <BarChartCPR data={currCountry.rights.cpr} height={80} />
                          </div>
                          <div className={styles.legend}>
                            <div className={styles.meanText}>{content.legend.cpr_barchart[0]}</div>
                            <div className={styles.bar}></div>
                            <div className={styles.textContainer}>
                              <div className={styles.maxText}>90<sup>th</sup> {content.legend.cpr_barchart[1]}</div>
                              <div className={styles.minText}>10<sup>th</sup> {content.legend.cpr_barchart[1]}</div>
                            </div>
                          </div>
                        </div>
                      }
                      { currRight !== 'all' &&
                        <div className={styles.cprRegionValue}>
                          {content.rights_name[currRight]}
                          {' '}
                          <span className={styles.floatNum}>
                            {currCountry.rights.cpr
                              ? displayTenth(currCountry.rights.cpr[currRight].mean)
                              : 'N/A'
                            }
                          </span>
                        </div>
                      }
                    </div>
                  }
                  {
                    currRight === 'all'
                    ? <div className={styles.countryQues}>
                      <QuestionTooltip width={288} question={content.country_tooltips[0].question}>
                        <p>{content.country_tooltips[0].paragraphs} <a href='https://humanrightsmeasurement.org/methodology/methodology-in-depth/' target='_blink'>{content.country_tooltips[0].linkText}</a>.</p>
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
                        <div className='text underline' onClick={this.setExploreBy}>{getRegionName(urlSegs.region)}</div>
                      </div>
                      { rightsDefinitions[currRight].definition
                        ? <p className={styles.definition}>{rightsDefinitions[currRight].definition}</p>
                        : <ul>
                          {rightsDefinitions[currRight].measure_list.map((item, i) => {
                            return (<li key={i} className={styles.defList}>{item}</li>)
                          })}
                        </ul>
                      }
                      { rightsDefinitions[currRight].conclusion_para &&
                        <p className={styles.definition}>{rightsDefinitions[currRight].conclusion_para}</p>
                      }
                      { rightsDefinitions[currRight].core_text &&
                        <div>
                          <p className={styles.measureQues}>{content.question_tooltips[3].question} {content.rights_name[currRight]}?</p>
                          <p>{rightsDefinitions[currRight].core_text}</p>
                          <ul>
                            {
                              rightsDefinitions[currRight].core_indicator.map((item, i) => (
                                <li key={i} className={styles.withDot}>{item}</li>
                              ))
                            }
                          </ul>
                        </div>
                      }
                      { showMore && rightsDefinitions[currRight].high_text &&
                        <div>
                          <p>{rightsDefinitions[currRight].high_text}</p>
                          <ul>
                            {
                              rightsDefinitions[currRight].high_indicator.map((item, i) => (
                                <li key={i} className={styles.withDot}>{item}</li>
                              ))
                            }
                          </ul>
                        </div>
                      }
                      { showMore && isESRSelected &&
                        <div>
                          <QuestionTooltip width={238} question={content.question_tooltips[0].question}>
                            <p>{content.question_tooltips[0].tooltip}</p>
                          </QuestionTooltip>
                          <QuestionTooltip width={360} question={content.question_tooltips[1].question[0] + content.rights_name[currRight] + content.question_tooltips[1].question[1]}>
                            <p>{content.question_tooltips[1].tooltip.paragraphs[0]}</p>
                            <p>{content.question_tooltips[1].tooltip.paragraphs[1]}</p>
                            <ul>
                              <li>{content.question_tooltips[1].tooltip.list[0]}</li>
                              <li>{content.question_tooltips[1].tooltip.list[1]}</li>
                              <li style={{ marginBottom: '10px' }}>{content.question_tooltips[1].tooltip.list[2]} <a href='https://humanrightsmeasurement.org/methodology/measuring-economic-social-rights/' target='_blank'>{content.question_tooltips[1].tooltip.linkText}</a>.</li>
                            </ul>
                          </QuestionTooltip>
                          { currRight === 'housing' &&
                            <QuestionTooltip width={238} question={content.question_tooltips[4].question}>
                              <p>{content.question_tooltips[4].tooltip}</p>
                            </QuestionTooltip>
                          }
                        </div>
                      }
                      { showMore && isCPRSelected &&
                        <div>
                          <QuestionTooltip width={293} question={content.question_tooltips[2].question}>
                            <p>{content.question_tooltips[2].tooltip.paragraphs[0]}</p>
                            <p>{content.question_tooltips[2].tooltip.paragraphs[1]} <a href='#' target='_blank'>{content.question_tooltips[2].tooltip.linkText}</a>.</p>
                          </QuestionTooltip>
                          <QuestionTooltip width={294} question={content.question_tooltips[3].question + ' ' + content.rights_name[currRight] + '?'}>
                            <p>{content.question_tooltips[3].tooltip.paragraphs[0]} <a href='https://humanrightsmeasurement.org/methodology/methodology-in-depth/' target='_blank'>{content.question_tooltips[3].tooltip.linkText}</a>.</p>
                          </QuestionTooltip>
                        </div>
                      }
                      <div className={styles.showMoreBtn} onClick={this.toggleShowMore}>{showMore ? content.show_less : content.show_more}</div>
                      { isESRSelected &&
                        <div>
                          <div className={styles.subtitleESR}>{content.esr_trend.title}</div>
                          <div className={styles.esrChartKey}>{content.esr_trend.subtitle}</div>
                        </div>
                      }
                      { !isESRSelected && cloudWords.length !== 0 &&
                        <div>
                          <QuestionTooltip width={214} question={content.cpr_at_risk.title} isTitle={true}>
                            <p>{content.cpr_at_risk.tooltip} <a href='#' target='_blank'>{content.cpr_at_risk.link}</a>.</p>
                          </QuestionTooltip>
                          <WordCloudChart words={cloudWords} />
                          <QuestionTooltip width={220} question={content.cpr_abuse.title} isTitle={true}>
                            <p>{content.cpr_abuse.tooltip}</p>
                          </QuestionTooltip>
                          <div className={styles.cprChartSubtitle}>{content.cpr_abuse.subtitle}</div>
                          <AbuseBarChart data={cloudWords} height={100} />
                          <div className={styles.chartKeys}>
                            <strong>A:</strong> {content.cpr_abuse.keys[0]}, <strong>B:</strong> {content.cpr_abuse.keys[1]}, <strong>C:</strong> {content.cpr_abuse.keys[2]}, <strong>D:</strong> {content.cpr_abuse.keys[3]}, <strong>E:</strong> {content.cpr_abuse.keys[4]}
                          </div>
                        </div>
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
