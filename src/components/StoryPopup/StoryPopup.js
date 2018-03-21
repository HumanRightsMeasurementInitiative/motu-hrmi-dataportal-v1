import React from 'react'
import PropTypes from 'prop-types'
import styles from './style.css'
import LangSelector from '../LangSelector'
import RightBarchart from '../RightBarchart/'
import CountryRightsChart from 'components/CountryRightsChart'
import { segsToUrl } from '../utils'
import rightsByCountry from 'data/rights-by-country.json'
import ESRTimeline from '../ESRTimeline'
import storyImage from '../../img/story_mex.png'
import QuestionTooltip from '../QuestionTooltip'
import makeHTMLParagraph from 'lib/make-html-paragraph'
import Bar1 from './Bar1'
import Bar2 from './Bar2'
import Bar3 from './Bar3'

const AMERICAS = 'americas'
const PILOT = 'cpr-pilot'
const MEXICO = rightsByCountry.MEX

export default class StoryPopup extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired,
    closeStoryMode: PropTypes.func.isRequired,
    urlSegs: PropTypes.object.isRequired,
    urlPush: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      barchartWidth: 0,
      currYear: 2015,
    }
  }

  componentDidMount() {
    const { storyPopup, columnLeft, columnRight } = this.refs
    columnRight.style.width = storyPopup.offsetWidth - columnLeft.offsetWidth - 6 + 'px'
    this.setState({ barchartWidth: columnRight.offsetWidth - 50 })
  }

  closeStoryMode = () => {
    if (this.timer) return
    this.refs.storyWrapper.style.opacity = 0
    this.refs.storyPopup.style.top = '100%'
    this.timer = setTimeout(() => {
      this.props.closeStoryMode()
    }, 200)
  }

  setCountry = (region, countryCode) => {
    this.props.closeStoryMode()
    this.props.urlPush(segsToUrl({ ...this.props.urlSegs, exploreBy: 'Geography', 'region': region, country: countryCode, right: 'all' }))
  }

  setRegion = (region, right) => {
    this.props.closeStoryMode()
    this.props.urlPush(segsToUrl({ ...this.props.urlSegs, exploreBy: 'Rights', 'region': region, right: right }))
  }

  setCurrYear = (year) => {
    this.setState({ currYear: year })
  }

  render() {
    const { data, content } = this.props
    const story = content.story_mexico
    const arrowLink = content.arrow_link
    function ArrowLink({ region, right, content, setRegion }) {
      return (
        <div className={styles.links}>
          <div className="arrowLink">
            <div className="text">{arrowLink.title.this}</div>
            <RegionLink region={region} right={right} onItemClick={setRegion}>
              {content.region_name[region]}
            </RegionLink>
          </div>
        </div>
      )
    }

    return (
      <div className={styles.storyWrapper} ref='storyWrapper'>

        <div className={styles.storyPopup} ref='storyPopup'>

          <div className={styles.popupBody}>

            <div className={styles.header}>
              <div className={styles.lang}>
                <LangSelector />
              </div>
              <div className={styles.close} onClick={this.closeStoryMode}>
                 &#10005;
              </div>
            </div>

            <div className={styles.columnLeft} ref='columnLeft'>
              <div className={styles.mobileTitle}>
                <h1 className={styles.articleTitle}>Respect for human rights in Mexico is far worse than it should be</h1>
              </div>
              <div className={styles.langSelector}>
                <LangSelector />
              </div>
              <div className={styles.chartTitle}>{content.story_mexico.chart_title}</div>
              <div className={styles.graph} style={{ lineHeight: '0.9rem' }}>
                <CountryRightsChart
                  rights={MEXICO.rights}
                  esrStandard="esrCore"
                  size={500}
                  content={content}
                  displayLabels
                />
              </div>
              <div className={styles.linkWrapper}>
                <div className='arrowLink'>
                  <div className='text'>{arrowLink.title.all}</div>
                  <CountryLink in={story.in} region={AMERICAS} code='MEX' onItemClick={this.setCountry}>{story.country_code}</CountryLink>
                </div>
              </div>
            </div>

            <div className={styles.columnRight} ref='columnRight'>
              <section className={styles.hideTitle}>
                <h1 className={styles.articleTitle}>{story.title}</h1>
              </section>
              <section>
                {story.sections.paragraph_1.map(makeHTMLParagraph)}
              </section>
              <section>
                <div className={styles.imageWrapper}>
                  <img src={storyImage} alt="article image"/>
                  <div className={styles.imageLegend}>
                    {story.sections.image_1.legend}
                  </div>
                  <div className={styles.imageSource}>
                    {story.sections.image_1.source}
                  </div>
                </div>
              </section>
              <section>
                {story.sections.paragraph_2.map(makeHTMLParagraph)}
              </section>

              <section className={styles.rightBarchartWrapper}>
                <div className={styles.headerWrapper}>
                  <div className={styles.titles}>
                    <div className={styles.cprCaption}>{story.sections.chart_1.title}</div>
                    <div className={styles.cprSubTitle}>{story.sections.chart_1.subtitle}</div>
                  </div>

                  <div className={styles.cprLegend}>
                    <div className={styles.meanText}>{content.legend.cpr_barchart[0]}</div>
                    <div className={styles.bar}></div>
                    <div className={styles.textContainer}>
                      <div className={styles.maxText}>90<sup>th</sup> {content.legend.cpr_barchart[1]}</div>
                      <div className={styles.minText}>10<sup>th</sup> {content.legend.cpr_barchart[1]}</div>
                    </div>

                    <div className={styles.questionTooltip}>
                      <QuestionTooltip width={238} question={''}>
                        <p>
                          {content.question_tooltips[2].tooltip.paragraphs[0]}
                        </p>
                        <div style={{ display: 'flex', flexFlow: 'column' }}>
                          <Bar1 legend={content.question_tooltips[2].tooltip.legend[0]} />
                          <Bar2 legend={content.question_tooltips[2].tooltip.legend[1]}/>
                          <Bar3 legend={content.question_tooltips[2].tooltip.legend[2]}/>
                        </div>
                        <p>
                          {content.question_tooltips[2].tooltip.paragraphs[1]}{' '}
                          <a href="https://humanrightsmeasurement.org/wp-content/uploads/2018/03/HRMI-Methodology-Note-2018.pdf" target="_blank">
                            {content.question_tooltips[2].tooltip.linkText}
                          </a>.
                        </p>
                      </QuestionTooltip>
                    </div>

                  </div>

                </div>
                { this.state.barchartWidth &&
                  <RightBarchart
                    currYear={2015}
                    isESR={false}
                    currRight={'freedom-from-disappearance'}
                    rightsByRegionCountries={data.rightsByRegion[PILOT].countries}
                    chartHeight={338}
                    chartWidth={this.state.barchartWidth}
                    currCountry={MEXICO}
                    score={content.score}>
                  </RightBarchart>
                }
                <div className={styles.footnote}>{content.footer_text.rights_page_cpr}</div>
                <ArrowLink region="cpr-pilot" right="freedom-from-disappearance" content={content} setRegion={this.setRegion} />
              </section>
              <section>
                {story.sections.paragraph_3.map(makeHTMLParagraph)}
              </section>

              <section className={styles.rightBarchartWrapper}>
                <div className={styles.headerWrapper}>
                  <div className={styles.titles}>
                    <div className={styles.cprCaption}>{story.sections.chart_2.title}</div>
                    <div className={styles.cprSubTitle}>{story.sections.chart_2.subtitle}</div>
                  </div>

                  <div className={styles.cprLegend}>
                    <div className={styles.meanText}>{content.legend.cpr_barchart[0]}</div>
                    <div className={styles.bar}></div>
                    <div className={styles.textContainer}>
                      <div className={styles.maxText}>90<sup>th</sup> {content.legend.cpr_barchart[1]}</div>
                      <div className={styles.minText}>10<sup>th</sup> {content.legend.cpr_barchart[1]}</div>
                    </div>
                  </div>

                  <div className={styles.questionTooltip}>
                    <QuestionTooltip width={238} question={''}>
                      <p>{content.question_tooltips[2].tooltip.paragraphs[0]}</p>
                      <p>{content.question_tooltips[2].tooltip.paragraphs[1]} <a href='#' target='_blank'>{content.question_tooltips[2].tooltip.linkText}</a>.</p>
                    </QuestionTooltip>
                  </div>

                </div>
                { this.state.barchartWidth &&
                  <RightBarchart
                    currYear={2015}
                    isESR={false}
                    currRight={'participate-in-government'}
                    rightsByRegionCountries={data.rightsByRegion[PILOT].countries}
                    chartHeight={338}
                    chartWidth={this.state.barchartWidth}
                    currCountry={MEXICO}
                    score={content.score}
                  />
                }
                <div className={styles.footnote}>{content.footer_text.rights_page_cpr}</div>
                <ArrowLink region="cpr-pilot" right="participate-in-government" content={content} setRegion={this.setRegion} />
              </section>

              <section className={styles.radarWrapper}>
                <div className={styles.esrCaption}>{story.sections.subtitle_1}</div>
                <CountryRightsChart
                  size={500}
                  rights={MEXICO.rights}
                  esrStandard="esrHI"
                  displayLabels
                  content={content}
                />
              </section>
              <section>
                {story.sections.paragraph_5.map(makeHTMLParagraph)}
              </section>

              <section className={styles.rightBarchartWrapper}>
                <ESRTimeline
                  data={data.rightsByRegion[PILOT].countries}
                  chartHeight={338}
                  chartWidth={this.state.barchartWidth}
                  currYear={this.state.currYear}
                  currRight={'education'}
                  currCountry={MEXICO}
                  hoveredCountry={'MEX'}
                  onItemClick={this.setCurrYear}
                  content={content}
                />
              </section>
              <section>
                {story.sections.paragraph_6.map(makeHTMLParagraph)}
              </section>
              <section className={styles.rightBarchartWrapper}>
                <div style={{ justifyContent: 'center', justifyItems: 'center', padding: '10px' }}>
                  <img src="Mexico_education_sub_indicator_scores.JPG" />
                </div>
              </section>
              <section>
                {story.sections.paragraph_7.map(makeHTMLParagraph)}
              </section>

              <section className={styles.rightBarchartWrapper}>
                <div className={styles.headerWrapper}>
                  <div className={styles.titles}>
                    <div className={styles.esrCaption}>{story.sections.chart_3.title}</div>
                    <div className={styles.esrSubTitle}>{story.sections.chart_3.subtitle}</div>
                  </div>

                  <div>
                    <div className={styles.esrLegend}>
                      <div className={styles.text}>{content.legend.esr_barchart[0]}</div>
                      <div className={styles.text}>{content.legend.esr_barchart[1]}</div>
                    </div>
                  </div>
                </div>
                { this.state.barchartWidth &&
                  <RightBarchart
                    currYear={2015}
                    isESR={true}
                    currRight={'education'}
                    rightsByRegionCountries={data.rightsByRegion[AMERICAS].countries}
                    chartHeight={338}
                    chartWidth={this.state.barchartWidth}
                    currCountry={MEXICO}
                    score={content.score}
                 />
                }
                <div className={styles.footnote}>{content.footer_text.rights_page_esr}</div>
                <ArrowLink region="americas" right="education" content={content} setRegion={this.setRegion} />
              </section>
              <section>
                {story.sections.paragraph_8.map(makeHTMLParagraph)}
              </section>
            </div>

          </div>

        </div>
      </div>
    )
  }
}

class CountryLink extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    region: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
  }

  onItemClick = () => {
    this.props.onItemClick(this.props.region, this.props.code)
  }

  render() {
    return (
      <div className='text underline' onClick={this.onItemClick} style={{ fontSize: '.9em' }}>{this.props.children}</div>
    )
  }
}

class RegionLink extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    region: PropTypes.string.isRequired,
    right: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
  }

  onItemClick = () => {
    this.props.onItemClick(this.props.region, this.props.right)
  }

  render() {
    return (
      <div className='text underline' onClick={this.onItemClick} style={{ fontSize: '.9em' }}>{this.props.children}</div>
    )
  }
}
