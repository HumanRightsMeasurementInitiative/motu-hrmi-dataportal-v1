import React from 'react'
import PropTypes from 'prop-types'
import SubTopNav from '../SubTopNav/'
import CountryItem from './CountryItem'
import BarChartESR from '../BarChartESR/'
import BarChartCPR from '../BarChartCPR/'
import CountryRightsChart from 'components/CountryRightsChart'
import DownloadIcon from '../DownloadIcon'
import { segsToUrl, getRegionName } from '../utils'
import styles from './style.css'
import rightsDefinitions from '../../data/rights-definitions.json'

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
    }
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
    const { data: { rightsByRegion }, urlSegs } = this.props

    const countries = rightsByRegion[urlSegs.region].countries
    const currCountry = countries.find(country => country.countryCode === urlSegs.country)

    const ESRs = ['Food', 'Education', 'Work', 'Housing', 'Health']
    const CPRs = ['Opinion and Expression', 'Assembly and Association', 'Freedom from Execution', 'Freedom from Torture', 'Participate in Government', 'Freedom from Arbitrary Arrest', 'Freedom from Disappearance']

    return (
      <div className={styles.countryPage}>
        <SubTopNav />
        <div className='row'>
          <div className='column'>
            <div className={styles.backBtn}>
              <div className={styles.hintText}>BACK TO</div>
              <div className={styles.backLink} onClick={this.resetCountry}>
                {getRegionName(urlSegs.region)}
              </div>
            </div>
            <div className={styles.countriesListWrapper}>
              <ul className={styles.countriesList}>
                {countries.map((country) => (
                  <CountryItem key={country.countryCode} code={country.countryCode} onItemClick={this.setCountry} selected={country.countryCode === urlSegs.country}>
                    {country.countryCode}
                  </CountryItem>
                ))}
              </ul>
            </div>
          </div>

          <div className='column'>
            <div className={styles.countryHeader}>
              <div>Compare with</div>
              <div>Change assessment standard: Core</div>
            </div>
            <div className={styles.countryChart}>
              <CountryRightsChart rights={currCountry.rights} size={500} />
            </div>
            <div className={styles.countryFooter}>
              <div className={styles.downloadIcon}><DownloadIcon /></div>
              <div className={styles.text}>Each axis represents a right. The further the score is along each axis, the better the country’s performance on that right.</div>
              <div className={styles.source}><small className={styles.small}>SOURCE:</small> 2018 Human Rights Measurement Initiative (HRMI) DATASET, <a className={styles.small} href="https://humanrightsmeasurement.org">https://humanrightsmeasurement.org</a></div>
            </div>
          </div>

          <div className='column'>
            <div className={styles.columnRight}>
              <div className={styles.countryInfo}>
                <div className={styles.detailCountry}>{currCountry.name}</div>
                <div className={styles.smallTitle}>POPULATION (2016)</div>
                <div className={styles.smallText2}>{currCountry.population} million</div>
                <div className={styles.smallTitle}>GDP/CAPITA (2016)</div>
                <div className={styles.smallText2}>${Math.round(currCountry.GDP2016)} (current PPP dollars)</div>
              </div>
              <div className={styles.rightInfoWrapper}>
                <div className={styles.rightInfo}>
                  { CPRs.indexOf(this.state.currRight) === -1 &&
                    <div>
                      <div className={styles.subtitleESR}>Economic and Social Rights</div>
                      <div className={styles.esrChartSubtitle}>most recent data (2015 or earlier)</div>
                      <div className={styles.barChartWrapper}>
                        <BarChartESR data={currCountry.rights.ESR} height={80} />
                      </div>
                      { this.state.currRight !== 'all' &&
                        <div>
                          <div className={styles.esrRegionValue}>Right to {getRegionName(urlSegs.region)} 22%</div>
                          <ul className={styles.esrValueList}>
                            <li className={styles.withDot}>Primary school completion rate 11%</li>
                            <li className={styles.withDot}>Gross combined school entolment rate 33%</li>
                          </ul>
                        </div>
                      }
                    </div>
                  }
                  { ESRs.indexOf(this.state.currRight) === -1 &&
                    <div>
                      <div className={styles.subtitleCPR}>Civil and Political Rights</div>
                      <div className={styles.cprChartSubtitle}>data is for period january - june 2017</div>
                      <div className={styles.barChartWrapper}><BarChartCPR data={currCountry.rights.CPR} height={80} /></div>
                      <div className={styles.legend}><div className={styles.uncertaintyIcon}></div> 95% UNCERTAINTY BAND</div>
                      { this.state.currRight !== 'all' &&
                        <div>
                          <div className={styles.cprRegionValue}>Right to {getRegionName(urlSegs.region)} 22%</div>
                          <ul className={styles.esrValueList}>
                            <li className={styles.withDot}>Primary school completion rate 11%</li>
                            <li className={styles.withDot}>Gross combined school entolment rate 33%</li>
                          </ul>
                        </div>
                      }
                    </div>
                  }
                  {
                    this.state.currRight === 'all'
                    ? <div>
                      <a className={styles.link} href="">Why are the two types of metrics not on the same scale?</a>
                      <a className={styles.link} href="">Why are the two sets of metrics not for the same year?</a>
                      <a className={styles.link} href="">What is the difference between the core and the high income OECD country scale?</a>
                    </div>
                    : <div className={styles.rightDefinition}>
                      <div className='arrowLink' style={{ marginLeft: '-24px' }}>
                        <div className='text'>Explore this rights in:</div>
                        <div className='text underline' onClick={this.setExploreBy}>{getRegionName(urlSegs.region)}</div>
                      </div>
                      { rightsDefinitions[this.state.currRight].definition
                        ? <p className={styles.definition}>{rightsDefinitions[this.state.currRight].definition}</p>
                        : <ul>
                          {rightsDefinitions[this.state.currRight].measure_list.map((item, i) => {
                            return (<li key={i} className={styles.defList}>{item}</li>)
                          })}
                        </ul>
                      }
                      <p className={styles.measureQues}>How has HRMI measured the Right to {this.state.currRight}?</p>
                      { rightsDefinitions[this.state.currRight].core_text &&
                        <div>
                          <p>{rightsDefinitions[this.state.currRight].core_text}</p>
                          <ul>
                            {
                              rightsDefinitions[this.state.currRight].core_indicator.map((item, i) => (
                                <li key={i} className={styles.withDot}>{item}</li>
                              ))
                            }
                          </ul>
                        </div>
                      }
                      { rightsDefinitions[this.state.currRight].high_text &&
                        <div>
                          <p>{rightsDefinitions[this.state.currRight].high_text}</p>
                          <ul>
                            {
                              rightsDefinitions[this.state.currRight].high_indicator.map((item, i) => (
                                <li key={i} className={styles.withDot}>{item}</li>
                              ))
                            }
                          </ul>
                        </div>
                      }
                      { ESRs.indexOf(this.state.currRight) > -1 &&
                        <div>
                          <div className={styles.indicatorQues}>Why aren't the same indicators used for all countries?</div>
                          <div></div>
                        </div>
                      }
                      { this.state.currRight === 'Food' &&
                        <div>
                          <div className={styles.indicatorQues}>How does the HRMI methodology convert the above indicators into the Right to Food metric?</div>
                          <div></div>
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
