import React from 'react'
import PropTypes from 'prop-types'
import SubTopNav from '../SubTopNav/'
import CountryItem from './CountryItem'
import BarChartESR from '../BarChartESR/'
import BarChartCPR from '../BarChartCPR/'
import CountryRightsChart from 'components/CountryRightsChart'
import QuestionTooltip from '../QuestionTooltip'
import DownloadPopup from '../DownloadPopup'
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
              <div>Change assessment standard: Core</div>
            </div>
            <div className={styles.countryChart}>
              <CountryRightsChart
                rights={currCountry.rights}
                size={800}
                margin={200}
                displayLabels
              />
            </div>
            <div className={styles.countryFooter}>
              <div className={styles.downloadPopupWrapper}><DownloadPopup itemList={['chart']} /></div>
              <div className={styles.text}>Each axis represents a right. The further the score is along each axis, the better the country’s performance on that right.</div>
              <div className={styles.source}><small className={styles.small}>SOURCE:</small> 2018 Human Rights Measurement Initiative (HRMI) DATASET, <a className={styles.small} href='https://humanrightsmeasurement.org'>https://humanrightsmeasurement.org</a></div>
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
                        <BarChartESR data={ESRs} height={60} /> {/* data need to be change */}
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
                      <div className={styles.barChartWrapper}>
                        <BarChartCPR data={CPRs} height={60} /> {/* data need to be change */}
                      </div>
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
                    ? <div className={styles.countryQues}>
                      <QuestionTooltip width={288} question={`Why are the two types of metrics not on the same scale?`}>
                        <p>HRMI metrics use two different methodologies that have different scales and interpretations. The scores for the civil and political rights metrics are a score out of 10 indicating the extent to which the government in the country respected that right. By contrast, the scores for the economic and social rights metrics are percentage scores. These tell you the percentage level of enjoyment achieved on that right relative to what should be feasible for a country with that income level. This is not the same as the extent to which people in the country enjoy the right. For more information please explore our <a href='https://humanrightsmeasurement.org/methodology/methodology-in-depth/' target='_blink'>methodologies in more detail.</a></p>
                      </QuestionTooltip>
                      <QuestionTooltip width={244} question={`Why are the two sets of metrics not for the same year?`}>
                        <p>All metrics presented are the most recent data available. The civil and political rights metrics are for January to June 2017. The economic and social rights metrics are from the 2017 update of the International Social and Economic Rights Fulfilment Index, which covers the period from 2005 to 2015. The data used for each year are the most recently available data as of that year. HRMI graphs use the most recently available data from the full dataset.</p>
                      </QuestionTooltip>
                      <QuestionTooltip width={286} question={`What is the difference between the core and the high income OECD country scale?`}>
                        <p>For countries assessed using the core assessment standard, our methodology uses statistical indicators that are available for most countries in the world, particularly developing and non-OECD-member countries. By contrast, the high-income OECD country assessment standard uses indicators that are typically available only for the high-income OECD countries, and/or better reflect the human rights challenges of high-income countries. We would also use many of these indicators in the core assessment standard if they had broader country coverage. All countries are evaluated using both assessment standards to the extent data are available.</p>
                      </QuestionTooltip>
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

                      { ESRs.indexOf(this.state.currRight) > -1 &&
                        <p className={styles.measureQues}>How has HRMI measured the Right to {this.state.currRight}?</p>
                      }
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
                      { this.state.showMore && rightsDefinitions[this.state.currRight].high_text &&
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
                      { this.state.showMore && ESRs.indexOf(this.state.currRight) > -1 &&
                        <QuestionTooltip width={238} question={`Why aren't the same indicators used for all countries?`}>
                          <p>This is because the same data are not always collected for all countries in the world. The core assessment standard is mostly used for developing and non-OECD-member countries. The high-income OECD country assessment standard uses indicators that are often available only for high-income OECD countries. However, all countries are evaluated using both sets of indicators to the extent data are available.</p>
                        </QuestionTooltip>
                      }
                      { this.state.showMore && this.state.currRight === 'Food' &&
                        <QuestionTooltip width={360} question='How does the HRMI methodology convert the above indicators into the Right to Food metric?'>
                          <p>All HRMI measures of economic and social rights have been produced using official statistics collected by national governments and harmonised by international organisations. For each indicator, our methodology compares the observed level of enjoyment of that dimension of human rights to the enjoyment level it should be feasible for that country to achieve given its per-capita income level. HRMI economic and social rights metrics thus show how well the State is using its available resources to ensure that all people enjoy these rights.</p>
                          <p>Three things should be kept in mind when interpreting HRMI economic and social rights metrics: </p>
                          <ul>
                            <li>1) A score of 100% does NOT imply that everyone in the country enjoys the right. Rather, it implies that the country’s right enjoyment level is on par with the historically best-performing countries at the same per-capita income level.</li>
                            <li>2) A score of 100% does NOT mean there is no room for improvement. Countries with high HRMI scores still need to innovate to extend human rights enjoyment further than has been done in the past.</li>
                            <li>3) The fact that a high-income country earns a high HRMI score on a right does NOT imply that all population subgroups (e.g. women or indigenous people) in that country enjoy the right equally.</li>
                          </ul>
                          <p className={styles.tooptipLink}>For more information on the HRMI ESR methodology <a href='https://humanrightsmeasurement.org/methodology/measuring-economic-social-rights/' target='_blank'>click here.</a></p>
                        </QuestionTooltip>
                      }
                      { this.state.showMore && CPRs.indexOf(this.state.currRight) > -1 &&
                        <div>
                          <QuestionTooltip width={293} question={'How should I interpret the uncertainty bands?'}>
                            <p>Our civil and political rights measures methodology produces a range of estimated levels of respect for each human right. The average country score (indicated by the white horizontal line) represents the average estimate in that range. The lower score on the uncertainty band represents the 10th percentile of our estimates; the higher score on the uncertainty band represents the 90th percentile.</p>
                            <p>Narrower uncertainty bands tell us that there was more agreement among expert survey respondents about what that country’s score should be, and/or a larger number of respondents. The greater the overlap between two uncertainty bands, the less certain we can be that the level of respect for human rights represented by those bands are truly different from one another.</p>
                            <p className={styles.tooptipLink}>For more detailed information, please see our <a href='#' target='_blank'>methodology note.[need link]</a></p>
                          </QuestionTooltip>
                          <QuestionTooltip width={294} question={'How has HRMI measured the Right to ' + this.state.currRight + '?'}>
                            <p>Each civil and political right metric has been produced from responses to a survey of in-country human rights experts. Respondents’ answers to questions about the frequency of violations of each civil and political right were combined using a statistical model that ensures the comparability of responses across countries. This results in a distribution of estimated levels of respect for each right in each country, represented by the scores and uncertainty bands shown throughout the data visualisations. Other information about who was identified as at risk for human rights abuse was also collected from our respondents, as shown.</p>
                            <p className={styles.tooptipLink}>For more detailed information, please see our <a href='https://humanrightsmeasurement.org/methodology/methodology-in-depth/' target='_blank'>website here.</a></p>
                          </QuestionTooltip>
                        </div>
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
                            <QuestionTooltip width={214} question={'Groups most at risk'} isTitle={true}>
                              <p>This word-cloud illustrates the groups considered by survey respondents to be most at risk for violations of this right. Greater prominence is given to the names of groups that were most frequently indicated as being especially vulnerable. For more information about the targeted groups see our <a href='#' target='_blank'>summary of qualitative survey responses.[need link]</a></p>
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
                            <QuestionTooltip width={220} question={'Distribution of abuse'} isTitle={true}>
                              <p>This chart indicates how violations of this right are distributed across different groups. Bar heights indicate the percentage of survey respondents who selected each group as being especially vulnerable.</p>
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
