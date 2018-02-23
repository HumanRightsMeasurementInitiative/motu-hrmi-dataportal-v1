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
const PERU = rightsByCountry.PER
const BOLIVIA = rightsByCountry.BOL

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
                <h1 className={styles.articleTitle}>{story.article_title}</h1>
              </section>
              <section>
                <p className={styles.boldText}>{story.paragraphs[0]} <a href="https://www.amnesty.org/en/countries/americas/mexico/report-mexico/" target='_blank'>{story.paragraphs[1]}</a>{story.paragraphs[2]}</p>
                <p className={styles.boldText}>{story.paragraphs[3]} <a href="" target='_blank'>{story.paragraphs[4]}</a> {story.paragraphs[5]} <a href="" target='_blank'>{story.paragraphs[6]}</a> {story.paragraphs[7]}</p>
              </section>
              <section>
                <div className={styles.imageWrapper}>
                  <img src={storyImage} alt="article image"/>
                  <div className={styles.imageLegend}>{story.image.legend}</div>
                  <div className={styles.imageSource}>{story.image.source}</div>
                </div>
              </section>
              <section>
                <p className={styles.normalText}>{story.paragraphs[8]}</p>
              </section>
              <section>
                <p className={styles.normalText}>{story.paragraphs[9]}</p>
                <p className={styles.normalText}>{story.paragraphs[10]}</p>
              </section>
              <section>
                <div className={styles.cprCaption}>{story.chart[0].title}</div>
                <div className={styles.cprSubTitle}>{story.chart[0].subtitle}</div>
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
              </section>
              <section className={styles.topLink}>
                <div>
                  <p className={styles.normalText}>{story.paragraphs[11]} <a href="" target='_blank'>{story.paragraphs[12]}</a> {story.paragraphs[13]} <a href="" target='_blank'>{story.paragraphs[14]}</a> {story.paragraphs[15]}</p>
                  <p className={styles.normalText}>{story.paragraphs[16]}</p>
                  <p className={styles.normalText}>{story.paragraphs[17]}</p>
                </div>
                <div className={styles.links}>
                  <div className='arrowLink'>
                    <div className='text'>{arrowLink.title.this}</div>
                    <RegionLink region={'cpr-pilot'} right='freedom-from-disappearance' onItemClick={this.setRegion}>{content.region_name['cpr-pilot']}</RegionLink>
                  </div>
                </div>
              </section>
              <section>
                <div className={styles.cprCaption}>{story.chart[1].title}</div>
                <div className={styles.cprSubTitle}>{story.chart[1].subtitle}</div>
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
              </section>
              <section className={styles.bottomLink}>
                <div>
                  <p className={styles.normalText}>{story.paragraphs[18]}</p>
                  <p className={styles.normalText}>{story.paragraphs[19]}</p>
                  <p className={styles.normalText}>{story.paragraphs[20]}</p>
                  <p className={styles.normalText}>{story.paragraphs[21]}</p>
                </div>
                <div className={styles.links}>
                  <div className='arrowLink'>
                    <div className='text'>{arrowLink.title.this}</div>
                    <RegionLink region={'cpr-pilot'} right='participate-in-government' onItemClick={this.setRegion}>{content.region_name['cpr-pilot']}</RegionLink>
                  </div>
                </div>
              </section>
              <section>
                <div className={styles.esrCaption}>{story.article_subtitle[0]}</div>
              </section>
              <section>
                <p className={styles.normalText}>{story.paragraphs[22]}</p>
                <p className={styles.normalText}>{story.paragraphs[23]}</p>
              </section>
              <section>
                <p className={styles.normalText}>{story.paragraphs[24]}</p>
              </section>
              <section>
                <div className={styles.lineChart}><img src={lineChart} alt="lineChart" style={{ width: '100%' }} /></div>
              </section>
              <section>
                <p className={styles.normalText}>{story.paragraphs[25]}</p>
              </section>
              <section>
                <div className={styles.lineChart}><img src={lineChart} alt="lineChart" style={{ width: '100%' }} /></div>
              </section>
              <section>
                <p className={styles.normalText}>{story.paragraphs[26]}</p>
                <p className={styles.normalText}>{story.paragraphs[27]}</p>
                <p className={styles.normalText}>{story.paragraphs[28]} <a href="" target='_blank'>{story.paragraphs[29]}</a> {story.paragraphs[30]}</p>
                <p className={styles.normalText}>{story.paragraphs[31]}</p>
              </section>
              <section>
                <div className={styles.esrCaption}>{story.article_subtitle[1]}</div>
                <div className={styles.radarWrapper}>
                  <div className={styles.radarCol}>
                    <div className={styles.fakeRadar}></div>
                    <div className={styles.radarCountryName}>{story.standard_name.core}</div>
                  </div>
                  <div className={styles.radarCol}>
                    <div className={styles.fakeRadar}></div>
                    <div className={styles.radarCountryName}>{story.standard_name.high}</div>
                  </div>
                </div>
              </section>
              <section>
                <p className={styles.normalText}>{story.paragraphs[32]}</p>
              </section>
              <section>
                <div className={styles.esrCaption}>{story.chart[2].title}</div>
                <div className={styles.esrSubTitle}>{story.chart[2].subtitle}</div>
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
              </section>
              <section className={styles.topLink}>
                <div>
                  <p className={styles.normalText}>{story.paragraphs[33]}</p>
                  <p className={styles.normalText}>{story.paragraphs[34]}</p>
                  <p className={styles.normalText}>{story.paragraphs[35]}</p>
                  <p className={styles.normalText}>{story.paragraphs[36]}</p>
                </div>
                <div className={styles.links}>
                  <div className='arrowLink'>
                    <div className='text'>{arrowLink.title.this}</div>
                    <RegionLink region={'americas'} right='education' onItemClick={this.setRegion}>{content.region_name['americas']}</RegionLink>
                  </div>
                </div>
              </section>

              {/*
              <section className={styles.bottomLink}>
                <div>
                  <p className={styles.normalText}>{story.paragraphs[20]}</p>
                  <p className={styles.normalText}>{story.paragraphs[21]}</p>
                  <p className={styles.normalText}>{story.paragraphs[22]}</p>
                  <p className={styles.normalText}>{story.paragraphs[23]}</p>
                </div>
                <div className={styles.links}>
                  <div className='arrowLink'>
                    <div className='text'>{arrowLink.title.all}</div>
                    <CountryLink in={story.in} region={AMERICAS} code='BOL' onItemClick={this.setCountry}>{'BOL'}</CountryLink>
                  </div>
                  <div className='arrowLink'>
                    <div className='text'>{arrowLink.title.all}</div>
                    <CountryLink in={story.in} region={AMERICAS} code='PER' onItemClick={this.setCountry}>{'PER'}</CountryLink>
                  </div>
                </div>
              </section>
              <section>
                <div className={styles.radarWrapper}>
                  <div className={styles.radarCol}>
                    <CountryRightsChart rights={PERU.rights} esrStandard="esrCore" size={250} />
                    <div className={styles.radarCountryName}>{'PER'}</div>
                  </div>
                  <div className={styles.radarCol}>
                    <CountryRightsChart rights={BOLIVIA.rights} esrStandard="esrCore" size={250} />
                    <div className={styles.radarCountryName}>{'BOL'}</div>
                  </div>
                </div>
              </section>
              */}

              <section className={styles.sectionSelector}>
                <h5 className={styles.title}>{story.ending_text}</h5>
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
