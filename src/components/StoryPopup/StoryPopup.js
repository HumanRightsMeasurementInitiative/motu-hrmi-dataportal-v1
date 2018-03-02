import React from 'react'
import PropTypes from 'prop-types'
import styles from './style.css'
import LangSelector from '../LangSelector'
import SectionSelector from '../SectionSelector'
import RightBarchart from '../RightBarchart/'
import CountryRightsChart from 'components/CountryRightsChart'
import lineChart from '../../img/line-chart.png'
import { segsToUrl } from '../utils'
import rightsByCountry from 'data/rights-by-country.json'

import storyImage from '../../img/story_mex.png'

const AMERICAS = 'americas'
const PILOT = 'cpr-pilot'
const MEXICO = rightsByCountry.MEX

function makeHTMLParagraph(text, i) {
  const cleanedText = text
    .replace(`<a `, `<a target="_blank" rel="noopener noreferrer"`)
  return <p key={i} className={styles.normalText} dangerouslySetInnerHTML={{ __html: cleanedText }} />
}

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

            <div className={styles.columnLeft} ref='columnLeft'>
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
              <div>
                <div className={styles.linkWrapper}>
                  <div className='arrowLink'>
                    <div className='text'>{arrowLink.title.all}</div>
                    <CountryLink in={story.in} region={AMERICAS} code='MEX' onItemClick={this.setCountry}>{story.country_code}</CountryLink>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.columnRight} ref='columnRight'>
              <section>
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

              <section>
                <div className={styles.cprCaption}>{story.sections.chart_1.title}</div>
                <div className={styles.cprSubTitle}>{story.sections.chart_1.subtitle}</div>
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

              <section>
                <div className={styles.cprCaption}>{story.sections.chart_2.title}</div>
                <div className={styles.cprSubTitle}>{story.sections.chart_2.subtitle}</div>
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

              <section>
                {story.sections.paragraph_4.map(makeHTMLParagraph)}
              </section>

              <section>
                <div className={styles.esrCaption}>{story.sections.subtitle_1}</div>
              </section>

              <section>
                {story.sections.paragraph_5.map(makeHTMLParagraph)}
              </section>

              <section>
                <div className={styles.esrSubTitle}>{story.sections.timeline_1.title}</div>
                <div className={styles.lineChart}><img src={lineChart} alt="lineChart" style={{ width: '100%' }} /></div>
              </section>
              <section>
                <div className={styles.esrSubTitle}>{story.sections.timeline_2.title}</div>
                <div className={styles.lineChart}><img src={lineChart} alt="lineChart" style={{ width: '100%' }} /></div>
              </section>

              <section>
                {story.sections.paragraph_6.map(makeHTMLParagraph)}
              </section>

              <section>
                <div className={styles.esrCaption}>{story.sections.subtitle_2}</div>

                <div className={styles.radarWrapper}>
                  <div className={styles.radarCol}>
                    <CountryRightsChart size={250} rights={MEXICO.rights} esrStandard="esrCore" currRight="education" />
                    <div className={styles.radarCountryName}>{story.sections.radar_1.title}</div>
                  </div>
                  <div className={styles.radarCol}>
                    <CountryRightsChart size={250} rights={MEXICO.rights} esrStandard="esrHI" currRight="education" />
                    <div className={styles.radarCountryName}>{story.sections.radar_2.title}</div>
                  </div>
                </div>
              </section>

              <section>
                {story.sections.paragraph_7.map(makeHTMLParagraph)}
              </section>

              <section>
                <div className={styles.esrCaption}>{story.sections.chart_3.title}</div>
                <div className={styles.esrSubTitle}>{story.sections.chart_3.subtitle}</div>
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

              <section className={styles.sectionSelector}>
                <h5 className={styles.title}>{story.sections.ending_text}</h5>

                <h5 className={styles.subtitle}>{content.section.title}</h5>
                <SectionSelector isStoryMode={true} />
              </section>
            </div>
          </div>
          <div className={styles.closeBtn} onClick={this.closeStoryMode}>Skip the story</div>
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
