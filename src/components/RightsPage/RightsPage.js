import React from 'react'
import PropTypes from 'prop-types'
import SubTopNav from '../SubTopNav/'
import RightsItem from './RightsItem'
import RegionSelector from './RegionSelector'
import RightBarchart from '../RightBarchart/'
import ESRTimeline from '../ESRTimeline/'
import QuestionTooltip from '../QuestionTooltip'
import DownloadPopup from '../DownloadPopup'
import { segsToUrl, getRegionName, joinClassName as jcn } from '../utils'
import styles from './style.css'
import rightsDefinitions from 'data/rights-definitions.json'

export default class RightsPage extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    urlSegs: PropTypes.object.isRequired,
    urlPush: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      currCountry: null,
      chartHeight: 0,
      chartWidth: 0,
      currYear: 2015,
    }
  }

  componentDidMount() {
    this.setState({ chartHeight: this.refs.charts.offsetHeight, chartWidth:  this.refs.charts.offsetWidth })
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
    this.props.urlPush(segsToUrl({ ...this.props.urlSegs, exploreBy: 'Geography', country: this.state.currCountry.code, right: 'all' }))
  }

  setCurrCountry = (country) => {
    if (this.state.currCountry === null || country.countryCode !== this.state.currCountry.countryCode) {
      this.setState({ currCountry: country })
    } else {
      this.setState({ currCountry: null })
    }
  }

  setCurrYear = (year) => {
    this.setState({ currYear: year })
  }

  render() {
    const { data: { rightsByRegion }, urlSegs } = this.props

    const rights = Object.entries(rightsDefinitions).map(([code, right]) => ({ code, ...right }))
    const ESRs = rights.filter(right => right.type === 'ESR')
    const CPRs = rights.filter(right => right.type === 'CPR')

    const ESRItems = ESRs.map((right, i) => (
      <RightsItem key={right.code} right={right.code} onItemClick={this.setRight} selected={right.code === urlSegs.right}>
        {right.code}
      </RightsItem>
    ))
    const CPRItems = CPRs.map((right, i) => (
      <RightsItem key={right.code} right={right.code} onItemClick={this.setRight} selected={right.code === urlSegs.right}>
        {right.code}
      </RightsItem>
    ))

    const isESRSelected = ESRs.some(r => r.code === urlSegs.right)
    const isCPRSelected = CPRs.some(r => r.code === urlSegs.right)

    const colorClassName = jcn({
      rightInfo: true,
      esrs: isESRSelected,
      cprs: isCPRSelected,
    }, styles)

    const rightsByRegionCountries = rightsByRegion[urlSegs.region].countries

    return (
      <div className={styles.rightsPage}>
        <SubTopNav />
        <div className='row'>
          <div className='column'>
            <div className={styles.columnLeft}>
              <div className={styles.regionSelectorWrapper}>
                <RegionSelector rightsByRegion={rightsByRegion} urlSegs={urlSegs} onItemClick={this.setRegion} />
              </div>
              <div className={styles.rightsWrapper}>
                <div className={styles.rightList}>
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
            </div>
          </div>
          <div className='column'>
            <div className={styles.chartsHeader}>
              <div className={styles.regionName}>Right to {urlSegs.right} in {getRegionName(urlSegs.region)}</div>
              <div className={styles.sortBy}>Sort by: Name</div>
            </div>
            <div className={styles.chartsContainer} ref='charts'>
              <RightBarchart
                isESR={rightsDefinitions[urlSegs.right].type === 'ESR'}
                currRight={urlSegs.right}
                rightsByRegionCountries={rightsByRegionCountries}
                chartHeight={this.state.chartHeight * 0.7}
                chartWidth={this.state.chartWidth}
                currCountry={this.state.currCountry}
                onItemClick={this.setCurrCountry}>
              </RightBarchart>
              { isESRSelected &&
                <ESRTimeline
                  chartHeight={this.state.chartHeight * 0.3}
                  chartWidth={this.state.chartWidth}
                  currYear={this.state.currYear}
                  onItemClick={this.setCurrYear}
                />
              }
            </div>
            <div className={styles.chartsFooter}>
              <div className={styles.downloadPopupWrapper}><DownloadPopup itemList={ESRs.indexOf(urlSegs.right) > -1 ? ['bar chart', 'line chart'] : ['bar chart']} /></div>
              <div className={styles.text}>Hight Scores indicate greater respect for this human right.</div>
              <div className={styles.source}><small className={styles.small}>SOURCE:</small> 2018 Human Rights Measurement Initiative (HRMI) DATASET, <a className={styles.small} href='https://humanrightsmeasurement.org'>https://humanrightsmeasurement.org</a></div>
            </div>
          </div>
          <div className='column'>
            <div className={styles.infoHeader}>
              <div className={colorClassName}>
                <div className={styles.rightName}>Right to {urlSegs.right}</div>
                <div className={styles.regionName}>in {getRegionName(urlSegs.region)}</div>
              </div>
              <div className='arrowLink'>
                <div className='text'>Expore all rights in:</div>
                <div className='text underline' onClick={this.setExploreBy}>{getRegionName(urlSegs.region)}</div>
                { this.state.currCountry !== null &&
                  <div className='text underline' onClick={this.setCountry}>{this.state.currCountry.countryCode}</div>
                }
              </div>
            </div>
            <div className={styles.infoContent}>
              <div className={styles.textWrapper}>
                { rightsDefinitions[urlSegs.right].definition
                  ? <p className={styles.definition}>{rightsDefinitions[urlSegs.right].definition}</p>
                  : <ul>
                    {rightsDefinitions[urlSegs.right].measure_list.map((item, i) => {
                      return (<li key={i} className={styles.defList}>{item}</li>)
                    })}
                  </ul>
                }
                { rightsDefinitions[urlSegs.right].conclusion_para &&
                  <p className={styles.definition}>{rightsDefinitions[urlSegs.right].conclusion_para}</p>
                }
                { rightsDefinitions[urlSegs.right].core_text &&
                  <div>
                    <p className={styles.measureQues}>How has HRMI measured the Right to {urlSegs.right}?</p>
                    <p>{rightsDefinitions[urlSegs.right].core_text}</p>
                    <ul>
                      {
                        rightsDefinitions[urlSegs.right].core_indicator.map((item, i) => (
                          <li key={i} className={styles.withDot}>{item}</li>
                        ))
                      }
                    </ul>
                  </div>
                }
                { rightsDefinitions[urlSegs.right].high_text &&
                  <div>
                    <p>{rightsDefinitions[urlSegs.right].high_text}</p>
                    <ul>
                      {
                        rightsDefinitions[urlSegs.right].high_indicator.map((item, i) => (
                          <li key={i} className={styles.withDot}>{item}</li>
                        ))
                      }
                    </ul>
                  </div>
                }
                { isESRSelected &&
                  <QuestionTooltip width={238} question={`Why aren't the same indicators used for all countries?`}>
                    <p>This is because the same data are not always collected for all countries in the world. The core assessment standard is mostly used for developing and non-OECD-member countries. The high-income OECD country assessment standard uses indicators that are often available only for high-income OECD countries. However, all countries are evaluated using both sets of indicators to the extent data are available.</p>
                  </QuestionTooltip>
                }
                { urlSegs.right === 'food' &&
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
                { !isESRSelected &&
                  <div>
                    <QuestionTooltip width={293} question={'How should I interpret the uncertainty bands?'}>
                      <p>Our civil and political rights measures methodology produces a range of estimated levels of respect for each human right. The average country score (indicated by the white horizontal line) represents the average estimate in that range. The lower score on the uncertainty band represents the 10th percentile of our estimates; the higher score on the uncertainty band represents the 90th percentile.</p>
                      <p>Narrower uncertainty bands tell us that there was more agreement among expert survey respondents about what that country’s score should be, and/or a larger number of respondents. The greater the overlap between two uncertainty bands, the less certain we can be that the level of respect for human rights represented by those bands are truly different from one another.</p>
                      <p className={styles.tooptipLink}>For more detailed information, please see our <a href='#' target='_blank'>methodology note.[need link]</a></p>
                    </QuestionTooltip>
                    <QuestionTooltip width={294} question={'How has HRMI measured the Right to ' + urlSegs.right + '?'}>
                      <p>Each civil and political right metric has been produced from responses to a survey of in-country human rights experts. Respondents’ answers to questions about the frequency of violations of each civil and political right were combined using a statistical model that ensures the comparability of responses across countries. This results in a distribution of estimated levels of respect for each right in each country, represented by the scores and uncertainty bands shown throughout the data visualisations. Other information about who was identified as at risk for human rights abuse was also collected from our respondents, as shown.</p>
                      <p className={styles.tooptipLink}>For more detailed information, please see our <a href='https://humanrightsmeasurement.org/methodology/methodology-in-depth/' target='_blank'>website here.</a></p>
                    </QuestionTooltip>
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
                { isESRSelected &&
                  <div>
                    <div className={styles.subtitleESR}>Right trend over time</div>
                    <div className={styles.esrChartKey}>This chart shows data using the core country standard.</div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
