import React from 'react'
import PropTypes from 'prop-types'
import styles from './style.css'
import LangSelector from '../LangSelector'
import SectionSelector from '../SectionSelector'
import RightBarchart from '../RightBarchart/'
import CountryRightsChart from 'components/CountryRightsChart'
import lineChart from '../../img/line-chart.png'
import { segsToUrl } from '../utils'
import dataOECD from 'data/data_OECD.json'
import dataLAC from 'data/data_LAC.json'

const mexico = dataOECD.find(country => country.code === 'MEX')
const peru = dataLAC.find(country => country.code === 'PER')
const bolivia = dataLAC.find(country => country.code === 'BOL')

export default class StoryPopup extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    closeStoryMode: PropTypes.func.isRequired,
    urlSegs: PropTypes.object.isRequired,
    urlPush: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      radarHeight: 0,
      radarWidth: 0,
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
    const { data } = this.props

    return (
      <div className={styles.storyWrapper} ref='storyWrapper'>
        <div className={styles.storyPopup} ref='storyPopup'>
          <div className={styles.popupBody}>

            <div className={styles.columnLeft} ref='columnLeft'>
              <div className={styles.langSelector}>
                <LangSelector />
              </div>
              <div className={styles.graph} style={{ padding: '0 150px' /* temporary */ }}>
                <CountryRightsChart rights={mexico.rights} size={500} />
              </div>
              <div>
                <h4 className={styles.countryName}>MEXICO</h4>
                <div className={styles.linkWrapper}>
                  <div className='arrowLink'>
                    <div className='text'>Explore all rights:</div>
                    <CountryLink region='OECD' code='MEX' onItemClick={this.setCountry}>MEXICO</CountryLink>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.columnRight} ref='columnRight'>
              <section>
                <h1 className={styles.articleTitle}>Respect for Human Rights in Mexico is far worse than it should be</h1>
              </section>
              <section>
                <p className={styles.boldText}>Media stories of disappearances, unjustified arrests and extrajudicial killings are now so commonplace in Mexico that the population has begun to think they are normal.</p>
                <p className={styles.boldText}>But HRMI’s new data measuring respect for civil and political rights in Mexico highlights that this situation is not normal at all.</p>
              </section>
              <section>
                <div className={styles.imageWrapper}>
                  <img src="https://erconsult.com.au/wp-content/uploads/2015/04/placeholder-600x400.png" alt="article image"/>
                  <div className={styles.imageLegend}>[include some human interest story somewhere quite high up in the story – even to start with – e.g. a story about a particular journalist who was killed / disappeared]</div>
                  <div className={styles.imageSource}>PHOTO SOURCE / CREDITS</div>
                </div>
              </section>
              <section>
                <p className={styles.normalText}>The chart on the left summarises Mexico’s performance across 12 human rights. In this chart, each axis represents a right. The further from the origin the country’s score is, the better the performance of the country on that right. Scores for the seven civil and political rights are shown around the bottom half of the chart (in green) and scores for the five economic and social rights are shown around the top part of the chart (in blue). The unbalanced shape of the chart tells us that Mexico is performing much better in the area of economic and social rights than it is on civil and political rights.</p>
              </section>
              <section>
                <p className={styles.normalText}>Let’s dig into this in more detail – starting with the area of comparative worse performance – civil and political rights. Since there are no objective statistics on most of these Rights, we calculate these scores on the basis of responses provided by human rights experts in each country.</p>
                <p className={styles.normalText}>Mexico’s worst score is a score of 2.7 out of 10 on the Right to Freedom from Disappearance. The chart below compares Mexico’s performance on this Right with that of the 12 other countries in our pilot sample for measuring civil and political rights. Normally, we would not compare 13 such different countries, and in future iterations, we hope to only present scores for Mexico in comparison with other Latin American countries, as well as Mexico’s past scores. But for the pilot, we only have these scores for 13 countries, and as such, we can only focus on them. You can see that Mexico’s Disappearance score is not only worse than in Brazil (the only other Latin American country in the sample) but also on par with, and possibly lower than,  Saudi Arabia’s score.</p>
              </section>
              <section>
                <div className={styles.cprCaption}>Right to Freedom from Disappearance</div>
                <div className={styles.cprSubTitle}>scores for all 13 countries in HRMI pilot sample</div>
                <RightBarchart
                  isESR={false}
                  currRight={'Freedom from Disappearance'}
                  data={data.OECD}
                  chartHeight={338}
                  chartWidth={this.state.barchartWidth}
                  currCountry={mexico}>
                </RightBarchart>
              </section>
              <section className={styles.topLink}>
                <p className={styles.normalText}>This finding is not surprising given….. [examples, details and context of disappearances in Mexico. If need be the profile could draw on qualitative responses in HRMI survey here, but Amnesty Mexico likely to have plenty of qualitative research to draw on already.]</p>
                <p className={styles.normalText}>By contrast, Mexico’s two best scores in the area of civil and political rights are for the Right to Assembly and Association (score 6.7 out of 10) and the Right to Participate in Government (score 6.6 out of 10).  On both of these Rights, Mexico is closer to the middle of the pack, when compared to the other 12 countries in the pilot study.</p>
                <div className={styles.links}>
                  <div className='arrowLink'>
                    <div className='text'>Explore this right:</div>
                    <RegionLink region='LAC' right='Freedom from Disappearance' onItemClick={this.setRegion}>LATIN AMERICA AND THE CARIBBEAN</RegionLink>
                  </div>
                </div>
              </section>
              <section>
                <div className={styles.cprCaption}>Right to Participate in Government</div>
                <div className={styles.cprSubTitle}>scores for all 13 countries in HRMI pilot sample</div>
                <RightBarchart
                  isESR={false}
                  currRight={'Participate in Government'}
                  data={data.OECD}
                  chartHeight={338}
                  chartWidth={this.state.barchartWidth}
                  currCountry={mexico}
                />
              </section>
              <section className={styles.bottomLink}>
                <p className={styles.normalText}>For example, consider the chart below, which compares the scores of countries for the Right to Participate in Government. For this Right Mexico’s score is not substantively different from Brazil’s score, as indicated by the substantial overlap between the uncertainty bands of the two countries (i.e. Mexico’s average score is above the 10th percentile of Brazil’s score).  The scores shown, together with the uncertainty bands, also suggest that Mexico’s respect for this right is generally comparable to that observed in Fiji and not a lot worse than observed in Liberia and the United Kingdom.</p>
                <p className={styles.normalText}>This is consistent with the fact that Mexico has a somewhat free and fair electoral system with [………………… give more detail….]. Survey respondents did, however, highlight regulations and practices that disproportionately impact indigenous people, people of low economic and social status, less educated people, immigrants and people in some regions of the country. [There have also been concerns expressed about single-party states and people who don’t like the two main political parties.] If you visit this chart on our data visualisation website you will be able to see this further information about the groups in Mexico that are most at risk of having each right violated, by clicking on the Mexico bar of the chart. [Q: or would we like this information to show up in the left hand column of the country profile?]</p>
                <div className={styles.links}>
                  <div className='arrowLink'>
                    <div className='text'>Explore this right:</div>
                    <RegionLink region='LAC' right='Participate in Government' onItemClick={this.setRegion}>LATIN AMERICA AND THE CARIBBEAN</RegionLink>
                  </div>
                </div>
              </section>
              <section>
                <div className={styles.esrCaption}>Economic and Social Rights</div>
              </section>
              <section>
                <p className={styles.normalText}>Turning now to the economic and social rights, the chart below shows Mexico’s trend over time for each of the five economic and social rights. [assuming that this chart type is possible]</p>
              </section>
              <section>
                <div className={styles.lineChart}><img src={lineChart} alt="lineChart" style={{ width: '100%' }} /></div>
              </section>
              <section>
                <p className={styles.normalText}>Note that toward the top of this chart it is possible to switch between two different assessment standards for Mexico. The default for Mexico is set to the Core Assessment Standard, because this is the assessment standard we use for most low and middle-income countries. [explain what this shows]. The other is the HiYOECD assessment standard. [explain what this is].  Although Mexico is not a high-income country, it does have all the data needed to rate it on the hiYOECD country standard as well.</p>
                <p className={styles.normalText}>[Note that if it’s not possible for the user to switch between the two standards IN the profile story then we can just show the line chart twice – once for each assessment standard]. </p>
                <p className={styles.normalText}>[Discussion of results…. what will stand out for Mexico is that Mexico's score using the HiYStandard is much lower on Ed than using the Core Standard.   The difference is also especially pronounced on Work.  This sets up a focus on education or work for Mexico...  let’s assume it is a focus on education…]</p>
                <p className={styles.normalText}>Now turning to a comparison of Mexico’s Right to Education scores with other countries in Latin America, please see the chart below.</p>
              </section>
              <section>
                <div className={styles.esrCaption}>Right to Education</div>
                <div className={styles.esrSubTitle}>Mexico compared to rest of Latin America</div>
                <RightBarchart
                  isESR={true}
                  currRight={'Education'}
                  data={data.OECD}
                  chartHeight={338}
                  chartWidth={this.state.barchartWidth}
                  currCountry={mexico}
                />
              </section>
              <section className={styles.topLink}>
                <p className={styles.normalText}>It is interesting to see that the best performing country in the region on the Right to Education was [Country X].  However, it is also important to remember that [Country X]’s score of 100% (or 90-something %) does NOT imply that everyone in the country enjoys the right. Rather, it tells us that [country X]’s right enjoyment level is on par with the historically best-performing countries at the same per-capita income level. Further improvement is of course still possible – it is just that countries like [Country X] with a very high HRMI score need to innovate to extend human rights enjoyment further than has been done in the past.</p>
                <p className={styles.normalText}>[Assuming that it is possible to switch back and forth within the above chart between the core and high income OECD country standard – we can now have a discussion about the different components of that right using each standard.  Question for Accurat – how do we do this?  Can we have the sub-component scores appear in the left hand side column? Or perhaps we can show in the left hand column the radar of Mexico with the Education petal highlighted, showing the drill-down into the different education components.]</p>
                <p className={styles.normalText}>[This would allow us to clearly see that the main education challenge for Mexico is in improving the quality of education.]</p>
                <p className={styles.normalText}>Comparing Mexico’s performance on the Right to Education with other countries in Latin America, the bar chart above shows…..[… pick out a few interesting things, e.g. comparison with Costa Rica & Bolivia for the core standard; and Uruguay and Brazil using the HIYOECD standard]</p>
                <p className={styles.normalText}>One final point worth noting is that the aggregate country economic and social rights metrics as shown tend to mask the fact that the distribution of fulfilment of the right is often very uneven. For example, higher income people in Mexico are likely to be able to send their children to private schools of a much higher quality than people in lower socio-economic groups. […. add some other examples relevant to Mexico, perhaps with references to analysis and research that discusses these inequalities….?]</p>
                <p className={styles.normalText}>Coming back to the radar chart for Mexico, Mexico’s scores on the five economic and social rights are visible along the uppermost five axes of the radar chart. Based on the core assessment standard, you will see that these scores are very close to one another, ranging from 82% to 89%. But when assessed on the HiYOECD standard they are much more variable.</p>
                <div className={styles.links}>
                  <div className='arrowLink'>
                    <div className='text'>Explore this right:</div>
                    <RegionLink region='LAC' right='Education' onItemClick={this.setRegion}>LATIN AMERICA AND THE CARIBBEAN</RegionLink>
                  </div>
                </div>
              </section>
              <section>
                <div className={styles.esrCaption}>Right to Education</div>
                <div className={styles.radarWrapper}>
                  <div className={styles.radarCol}>
                    <div className={styles.fakeRadar}></div>
                    <div className={styles.radarCountryName}>Core assessment standard</div>
                  </div>
                  <div className={styles.radarCol}>
                    <div className={styles.fakeRadar}></div>
                    <div className={styles.radarCountryName}>High income OECD assessment standard</div>
                  </div>
                </div>
              </section>
              <section className={styles.bottomLink}>
                <p className={styles.normalText}>On either assessment standard for economic and social rights, and also for civil and political rights, the overall story that these data tell us about human rights in Mexico is that Mexico could be doing a lot better…. [ elaborate…]</p>
                <p className={styles.normalText}>For regional inspiration for how to do better in the area of economic and social rights, Mexico might like to look to countries such as Costa Rica/Bolivia/Ecuador/Peru.</p>
                <p className={styles.normalText}>[include here a radar country comparison of Mexico with some or all of Costa Rica/Bolivia/Ecuador/Peru/Brazil.  Obviously most of these other countries would have ‘half-shell’ radars since we don’t yet have CPR data for them. What is the comparision limit? ]</p>
                <p className={styles.normalText}>[If possible for these radar charts also, we would like to offer users the ability to switch between comparisons using the different standards].</p>
                <div className={styles.links}>
                  <div className='arrowLink'>
                    <div className='text'>Explore all rights:</div>
                    <CountryLink region='LAC' code='BOL' onItemClick={this.setCountry}>BOLIVIA</CountryLink>
                  </div>
                  <div className='arrowLink'>
                    <div className='text'>Explore all rights:</div>
                    <CountryLink region='LAC' code='PER' onItemClick={this.setCountry}>PERU</CountryLink>
                  </div>
                </div>
              </section>
              <section>
                <div className={styles.radarWrapper}>
                  <div className={styles.radarCol}>
                    <CountryRightsChart rights={peru.rights} size={400} />
                    <div className={styles.radarCountryName}>PERU</div>
                  </div>
                  <div className={styles.radarCol}>
                    <CountryRightsChart rights={bolivia.rights} size={400} />
                    <div className={styles.radarCountryName}>BOLIVIA</div>
                  </div>
                </div>
              </section>

              <section className={styles.sectionSelector}>
                <h5 className={styles.title}>This is end of the story</h5>
                <h5 className={styles.subtitle}>Explore all the dataset:</h5>
                <SectionSelector />
              </section>
            </div>
          </div>
          <div className={styles.closeBtn} onClick={this.closeStoryMode}></div>
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
      <div className='text underline' onClick={this.onItemClick} style={{ fontSize: '.9em' }}>IN {this.props.children}</div>
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
      <div className='text underline' onClick={this.onItemClick} style={{ fontSize: '.9em' }}>IN {this.props.children}</div>
    )
  }
}
