import React from 'react'
import PropTypes from 'prop-types'
import SubTopNav from '../SubTopNav/'
import RightsItem from './RightsItem'
import RegionSelector from './RegionSelector'
import RightBarchart from '../RightBarchart/'
import DownloadIcon from '../DownloadIcon'
import QuestionTooltip from '../QuestionTooltip'
import { segsToUrl, getRegionName, joinClassName as jcn } from '../utils'
import styles from './style.css'
import definition from '../../data/right_definition.json'

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
    if (this.state.currCountry === null || country.name !== this.state.currCountry.name) {
      this.setState({ currCountry: country })
    } else {
      this.setState({ currCountry: null })
    }
  }

  render() {
    const { data, urlSegs } = this.props

    const ESRs = ['Food', 'Education', 'Work', 'Housing', 'Health']
    const CPRs = ['Opinion and Expression', 'Assembly and Association', 'Participate in Government', 'Freedom from Torture', 'Freedom from Execution', 'Freedom from Arbitrary Arrest', 'Freedom from Disappearance']

    const ESRItems = ESRs.map((item, i) => (
      <RightsItem key={i} right={item} onItemClick={this.setRight} selected={item === urlSegs.right}>{item}</RightsItem>
    ))
    const CPRItems = CPRs.map((item, i) => (
      <RightsItem key={i} right={item} onItemClick={this.setRight} selected={item === urlSegs.right}>{item}</RightsItem>
    ))

    const colorClassName = jcn({
      rightInfo: true,
      esrs: ESRs.indexOf(urlSegs.right) > -1,
      cprs: CPRs.indexOf(urlSegs.right) > -1,
    }, styles)

    return (
      <div className={styles.rightsPage}>
        <SubTopNav />
        <div className='row'>
          <div className='column'>
            <div className={styles.columnLeft}>
              <div className={styles.regionSelectorWrapper}>
                <RegionSelector data={data} urlSegs={urlSegs} onItemClick={this.setRegion} />
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
              <div className={styles.regionName}>{getRegionName(urlSegs.region)}</div>
              <div className={styles.sortBy}>Sort by: Name</div>
            </div>
            <div className={styles.chartsContainer} ref='charts'>
              <RightBarchart
                isESR={ESRs.indexOf(urlSegs.right) > -1}
                currRight={urlSegs.right}
                data={data[urlSegs.region]}
                chartHeight={this.state.chartHeight * 0.7}
                chartWidth={this.state.chartWidth}
                currCountry={this.state.currCountry}
                onItemClick={this.setCurrCountry}>
              </RightBarchart>
            </div>
            <div className={styles.chartsFooter}>
              <div className={styles.downloadIcon}><DownloadIcon /></div>
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
                  <div className='text underline' onClick={this.setCountry}>{this.state.currCountry.name}</div>
                }
              </div>
            </div>
            <div className={styles.infoContent}>
              <div className={styles.textWrapper}>
                { definition[urlSegs.right].definition
                  ? <p className={styles.definition}>{definition[urlSegs.right].definition}</p>
                  : <ul>
                    {definition[urlSegs.right].measure_list.map((item, i) => {
                      return (<li key={i} className={styles.defList}>{item}</li>)
                    })}
                  </ul>
                }
                { definition[urlSegs.right].conclusion_para &&
                  <p className={styles.definition}>{definition[urlSegs.right].conclusion_para}</p>
                }
                { definition[urlSegs.right].core_text &&
                  <div>
                    <p className={styles.measureQues}>How has HRMI measured the Right to {urlSegs.right}?</p>
                    <p>{definition[urlSegs.right].core_text}</p>
                    <ul>
                      {
                        definition[urlSegs.right].core_indicator.map((item, i) => (
                          <li key={i} className={styles.withDot}>{item}</li>
                        ))
                      }
                    </ul>
                  </div>
                }
                { definition[urlSegs.right].high_text &&
                  <div>
                    <p>{definition[urlSegs.right].high_text}</p>
                    <ul>
                      {
                        definition[urlSegs.right].high_indicator.map((item, i) => (
                          <li key={i} className={styles.withDot}>{item}</li>
                        ))
                      }
                    </ul>
                  </div>
                }
                { ESRs.indexOf(urlSegs.right) > -1 &&
                  <QuestionTooltip question={`Why aren't the same indicators used for all countries?`}>
                    This is because the same data are not always collected for all countries in the world. The core assessment standard is mostly used for developing and non-OECD-member countries. The high-income OECD country assessment standard uses indicators that are often available only for high-income OECD countries. However, all countries are evaluated using both sets of indicators to the extent data are available.
                  </QuestionTooltip>
                }
                { urlSegs.right === 'Food' &&
                  <QuestionTooltip question='How does the HRMI methodology convert the above indicators into the Right to Food metric?'>
                    All HRMI measures of economic and social rights have been produced using official statistics collected by national governments and harmonised by international organisations. For each indicator, our methodology compares the observed level of enjoyment of that dimension of human rights to the enjoyment level it should be feasible for that country to achieve given its per-capita income level. HRMI economic and social rights metrics thus show how well the State is using its available resources to ensure that all people enjoy these rights. Three things should be kept in mind when interpreting HRMI economic and social rights metrics:
                    <ul>
                      <li>A score of 100% does NOT imply that everyone in the country enjoys the right. Rather, it implies that the country’s right enjoyment level is on par with the historically best-performing countries at the same per-capita income level.</li>
                      <li>A score of 100% does NOT mean there is no room for improvement. Countries with high HRMI scores still need to innovate to extend human rights enjoyment further than has been done in the past.</li>
                      <li>The fact that a high-income country earns a high HRMI score on a right does NOT imply that all population subgroups (e.g. women or indigenous people) in that country enjoy the right equally. For more information on the HRMI ESR methodology click <a href='https://humanrightsmeasurement.org/methodology/measuring-economic-social-rights/' target='_blankhttps://humanrightsmeasurement.org/methodology/measuring-economic-social-rights/'></a>here.</li>
                    </ul>
                  </QuestionTooltip>
                }
                { CPRs.indexOf(urlSegs.right) > -1 &&
                  <div>
                    <QuestionTooltip question={'How has HRMI measured the Right to ' + urlSegs.right + '?'}>
                      Each civil and political right metric has been produced from responses to a survey of in-country human rights experts. Respondents’ answers to questions about the frequency of violations of each civil and political right were combined using a statistical model that ensures the comparability of responses across countries. This results in a distribution of estimated levels of respect for each right in each country, represented by the scores and uncertainty bands shown throughout the data visualisations. Other information about who was identified as at risk for human rights abuse was also collected from our respondents, as shown. For more detailed information, please see our methodology note <a href='https://humanrightsmeasurement.org/methodology/methodology-in-depth/' target='_blank'>here</a>.
                    </QuestionTooltip>
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
                { ESRs.indexOf(urlSegs.right) > -1 &&
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
