import React from 'react'
import PropTypes from 'prop-types'
import SubTopNav from '../SubTopNav/'
import CountryItem from './CountryItem'
import BarChartESR from '../BarChartESR/'
import BarChartCPR from '../BarChartCPR/'
import CountryRightsChart from 'components/CountryRightsChart'
import DownloadIcon from '../DownloadIcon'
import QuestionTooltip from '../QuestionTooltip'
import { segsToUrl, getRegionName } from '../utils'
import styles from './style.css'
import definition from '../../data/right_definition.json'

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
      showMore: false,
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

  toggleShowMore = () => {
    this.setState({ showMore: !this.state.showMore })
  }

  render() {
    const { data, urlSegs } = this.props

    const countries = data[urlSegs.region]
    const currCountry = countries.find(country => country.code === urlSegs.country)

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
                  <CountryItem key={country.code} code={country.code} onItemClick={this.setCountry} selected={country.code === urlSegs.country}>
                    {country.name}
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
                      <div className={styles.barChartWrapper}><BarChartESR data={currCountry.rights.ESR} height={60} /></div>
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
                      <div className={styles.barChartWrapper}><BarChartCPR data={currCountry.rights.CPR} height={60} /></div>
                      <div className={styles.legend}>
                        <div className={styles.meanText}>Mean score</div>
                        <div className={styles.bar}></div>
                        <div className={styles.textContainer}>
                          <div className={styles.maxText}>90<sup>th</sup> percentile</div>
                          <div className={styles.minText}>10<sup>th</sup> percentile</div>
                        </div>
                      </div>
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
                      { definition[this.state.currRight].definition
                        ? <p className={styles.definition}>{definition[this.state.currRight].definition}</p>
                        : <ul>
                          {definition[this.state.currRight].measure_list.map((item, i) => {
                            return (<li key={i} className={styles.defList}>{item}</li>)
                          })}
                        </ul>
                      }
                      { ESRs.indexOf(this.state.currRight) > -1 &&
                        <p className={styles.measureQues}>How has HRMI measured the Right to {this.state.currRight}?</p>
                      }
                      { definition[this.state.currRight].core_text &&
                        <div>
                          <p>{definition[this.state.currRight].core_text}</p>
                          <ul>
                            {
                              definition[this.state.currRight].core_indicator.map((item, i) => (
                                <li key={i} className={styles.withDot}>{item}</li>
                              ))
                            }
                          </ul>
                        </div>
                      }
                      { this.state.showMore && definition[this.state.currRight].high_text &&
                        <div>
                          <p>{definition[this.state.currRight].high_text}</p>
                          <ul>
                            {
                              definition[this.state.currRight].high_indicator.map((item, i) => (
                                <li key={i} className={styles.withDot}>{item}</li>
                              ))
                            }
                          </ul>
                        </div>
                      }
                      { this.state.showMore && ESRs.indexOf(this.state.currRight) > -1 &&
                        <QuestionTooltip question={`Why aren't the same indicators used for all countries?`}>
                          This is because the same data are not always collected for all countries in the world. The core assessment standard is mostly used for developing and non-OECD-member countries. The high-income OECD country assessment standard uses indicators that are often available only for high-income OECD countries. However, all countries are evaluated using both sets of indicators to the extent data are available.
                        </QuestionTooltip>
                      }
                      { this.state.showMore && this.state.currRight === 'Food' &&
                        <QuestionTooltip question='How does the HRMI methodology convert the above indicators into the Right to Food metric?'>
                          All HRMI measures of economic and social rights have been produced using official statistics collected by national governments and harmonised by international organisations. For each indicator, our methodology compares the observed level of enjoyment of that dimension of human rights to the enjoyment level it should be feasible for that country to achieve given its per-capita income level. HRMI economic and social rights metrics thus show how well the State is using its available resources to ensure that all people enjoy these rights. Three things should be kept in mind when interpreting HRMI economic and social rights metrics:
                          <ul>
                            <li>A score of 100% does NOT imply that everyone in the country enjoys the right. Rather, it implies that the country’s right enjoyment level is on par with the historically best-performing countries at the same per-capita income level.</li>
                            <li>A score of 100% does NOT mean there is no room for improvement. Countries with high HRMI scores still need to innovate to extend human rights enjoyment further than has been done in the past.</li>
                            <li>The fact that a high-income country earns a high HRMI score on a right does NOT imply that all population subgroups (e.g. women or indigenous people) in that country enjoy the right equally. For more information on the HRMI ESR methodology click <a href='https://humanrightsmeasurement.org/methodology/measuring-economic-social-rights/' target='_blankhttps://humanrightsmeasurement.org/methodology/measuring-economic-social-rights/'></a>here.</li>
                          </ul>
                        </QuestionTooltip>
                      }
                      { this.state.showMore && CPRs.indexOf(this.state.currRight) > -1 &&
                        <QuestionTooltip question={'How has HRMI measured the Right to ' + this.state.currRight + '?'}>
                          Each civil and political right metric has been produced from responses to a survey of in-country human rights experts. Respondents’ answers to questions about the frequency of violations of each civil and political right were combined using a statistical model that ensures the comparability of responses across countries. This results in a distribution of estimated levels of respect for each right in each country, represented by the scores and uncertainty bands shown throughout the data visualisations. Other information about who was identified as at risk for human rights abuse was also collected from our respondents, as shown. For more detailed information, please see our methodology note <a href='https://humanrightsmeasurement.org/methodology/methodology-in-depth/' target='_blank'>here</a>.
                        </QuestionTooltip>
                      }
                      <div className={styles.showMoreBtn} onClick={this.toggleShowMore}>{this.state.showMore ? 'Show less' : 'Show more'}</div>
                      { ESRs.indexOf(this.state.currRight) > -1 &&
                        <div>
                          <div className={styles.subtitleESR}>Right trend over time</div>
                          <div className={styles.esrChartKey}>This chart shows data using the core country standard.</div>
                        </div>
                      }
                      { CPRs.indexOf(this.state.currRight) > -1 &&
                        <div>
                          <div>
                            <QuestionTooltip question={'Groups most at risk'} isTitle={true}>
                              This word-cloud illustrates the groups considered by survey respondents to be most at risk for violations of this right. Greater prominence is given to the names of groups that were most frequently indicated as being especially vulnerable. For more information about the targeted groups see our summary of qualitative survey responses.
                            </QuestionTooltip>
                            <ul className={styles.groupsList}>
                              <li>nationality</li>
                              <li>other immigrant</li>
                              <li>political indigenous</li>
                              <li>professional disabled journalist</li>
                              <li>low ses refugees cultrue</li>
                            </ul>
                          </div>
                          <div>
                            <QuestionTooltip question={'Distribution of abuse'} isTitle={true}>
                              This chart indicates how violations of this right are distributed across different groups. Bar heights indicate the percentage of survey respondents who selected each group as being especially vulnerable.
                            </QuestionTooltip>
                            <div className={styles.cprChartSubtitle}>Data is for period January - June 2017</div>
                            <div className={styles.chartKeys}>
                              <strong>A:</strong> Suspected criminals, <strong>B:</strong> Non-violent political, <strong>C:</strong> Violent political, <strong>D:</strong> Discriminated groups, <strong>E:</strong> Indiscriminate
                            </div>
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
