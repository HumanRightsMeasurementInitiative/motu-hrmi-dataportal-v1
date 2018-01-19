import React from 'react'
import PropTypes from 'prop-types'
import styles from './style.css'
import LangSelector from '../LangSelector'
import SectionSelector from '../SectionSelector'
import RadarChart from '../RadarChart'
import RightBarchart from '../RightBarchart/'

export default class StoryPopup extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    closeStoryMode: PropTypes.func.isRequired,
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
    const { storyPopup, graph, countryName, langSelector, columnLeft, columnRight } = this.refs
    console.log(this.refs.storyPopup.clientHeight)
    graph.style.height = storyPopup.offsetHeight - langSelector.offsetHeight - countryName.offsetHeight + 'px'
    graph.style.width = graph.offsetHeight * 1.2 + 'px'
    columnRight.style.width = storyPopup.offsetWidth - columnLeft.offsetWidth - 2 + 'px'
    this.setState({ radarHeight: graph.offsetHeight, radarWidth: graph.offsetWidth, barchartWidth: columnRight.offsetWidth - 50 })
  }

  closeStoryMode = () => {
    if (this.timer) return
    this.refs.storyWrapper.style.opacity = 0
    this.refs.storyPopup.style.top = '100%'
    this.timer = setTimeout(() => {
      this.props.closeStoryMode()
    }, 200)
  }

  render() {
    const { data } = this.props
    const ESRs = ['Food', 'Education', 'Work', 'Housing', 'Health']
    const CPRs = ['Opinion and Expression', 'Assembly and Association', 'Freedom from Execution', 'Freedom from Torture', 'Participate in Government', 'Freedom from Arbitrary Arrest', 'Freedom from Disappearance']

    return (
      <div className={styles.storyWrapper} ref='storyWrapper'>
        <div className={styles.storyPopup} ref='storyPopup'>
          <div className={styles.popupBody}>

            <div className={styles.columnLeft} ref='columnLeft'>
              <div className={styles.langSelector} ref='langSelector'><LangSelector /></div>
              <div className={styles.graph} ref='graph'>
                <RadarChart
                  chartHeight={this.state.radarHeight}
                  chartWidth={this.state.radarWidth}
                  currRight={'all'}
                  rights={ESRs.concat(CPRs)}
                ></RadarChart>
              </div>
              <div ref='countryName'>
                <h4 className={styles.countryName}>MEXICO</h4>
                <div className={styles.linkWrapper}>
                  <div className='arrowLink'>
                    <div className='text'>Explore all rights:</div>
                    <div className='text underline'>in Brunei</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.columnRight} ref='columnRight'>
              <section>
                <h1 className={styles.articleTitle}>Respect for Human Rights in Mexico is far worse than it should be</h1>
              </section>
              <section>
                <p className={styles.boldText}>Media Stories of disappearances, unjustified arrests and extrajudicial killings are now so commonplace in Mexico that the population has vegun to think they are normal.</p>
                <p className={styles.boldText}>But HRMI's new data measuring respect for civil and political rights in Mexico highlights that this situation is not normal at all.</p>
              </section>
              <section>
                <div className={styles.imageWrapper}>
                  <img src="https://erconsult.com.au/wp-content/uploads/2015/04/placeholder-600x400.png" alt="article image"/>
                  <div className={styles.imageLegend}>[Include some human interest story somewhere quite high up in the story - even to start with - e.g. a story about a particaular journalist who was killed / disppeared]</div>
                  <div className={styles.imageSource}>PHOTO SOURCE / CREDITS</div>
                </div>
              </section>
              <section>
                <p className={styles.normalText}>Media Stories of disappearances, unjustified arrests and extrajudicial killings are now so commonplace in Mexico that the population has vegun to think they are normal.</p>
              </section>
              <section>
                <p className={styles.normalText}>Media Stories of disappearances, unjustified arrests and extrajudicial killings are now so commonplace in Mexico that the population has vegun to think they are normal.</p>
                <p className={styles.normalText}>Media Stories of disappearances, unjustified arrests and extrajudicial killings are now so commonplace in Mexico that the population has vegun to think they are normal.</p>
              </section>
              <section>
                <div className={styles.chartCaption}>Right to Freedom from Disappearance</div>
                <div className={styles.chartSubTitle}>scores for all 13 countries in HRMI pilot sample</div>
                <RightBarchart
                  isESR={false}
                  currRight={'Freedom from Disappearance'}
                  data={data.OECD}
                  chartHeight={338}
                  chartWidth={this.state.barchartWidth}>
                </RightBarchart>
              </section>
              <section>
                <p className={styles.normalText}>Media Stories of disappearances, unjustified arrests and extrajudicial killings are now so commonplace in Mexico that the population has vegun to think they are normal.</p>
                <p className={styles.normalText}>Media Stories of disappearances, unjustified arrests and extrajudicial killings are now so commonplace in Mexico that the population has vegun to think they are normal.</p>
                <div className={styles.links}>
                  <div className='arrowLink'>
                    <div className='text'>Explore all rights:</div>
                    <div className='text underline'>in East Asia and the Pacific</div>
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
                  chartWidth={this.state.barchartWidth}>
                </RightBarchart>
              </section>
              <section>
                <p className={styles.normalText}>Media Stories of disappearances, unjustified arrests and extrajudicial killings are now so commonplace in Mexico that the population has vegun to think they are normal.</p>
                <div className={styles.links}>
                  <div className='arrowLink'>
                    <div className='text'>Explore all rights:</div>
                    <div className='text underline'>in East Asia and the Pacific</div>
                  </div>
                </div>
              </section>
              <section>
                <div className={styles.esrCaption}>Economic and Social Rights</div>
              </section>
              <section>
                <p className={styles.normalText}>Media Stories of disappearances, unjustified arrests and extrajudicial killings are now so commonplace in Mexico that the population has vegun to think they are normal.</p>
              </section>
              <section>
                <div className={styles.lineChart}><img src="" alt=""/></div>
              </section>
              <section>
                <p className={styles.normalText}>Media Stories of disappearances, unjustified arrests and extrajudicial killings are now so commonplace in Mexico that the population has vegun to think they are normal.</p>
                <p className={styles.normalText}>Media Stories of disappearances, unjustified arrests and extrajudicial killings are now so commonplace in Mexico that the population has vegun to think they are normal.</p>
                <p className={styles.normalText}>Media Stories of disappearances, unjustified arrests and extrajudicial killings are now so commonplace in Mexico that the population has vegun to think they are normal.</p>
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
                  currCountry={{ name: 'Mexico', code: 'MEX' }}
                  >
                </RightBarchart>
              </section>
              <section>
                <p className={styles.normalText}>Media Stories of disappearances, unjustified arrests and extrajudicial killings are now so commonplace in Mexico that the population has vegun to think they are normal.</p>
                <p className={styles.normalText}>Media Stories of disappearances, unjustified arrests and extrajudicial killings are now so commonplace in Mexico that the population has vegun to think they are normal.</p>
                <p className={styles.normalText}>Media Stories of disappearances, unjustified arrests and extrajudicial killings are now so commonplace in Mexico that the population has vegun to think they are normal.</p>
                <div className={styles.links}>
                  <div className='arrowLink'>
                    <div className='text'>Explore all rights:</div>
                    <div className='text underline'>in East Asia and the Pacific</div>
                  </div>
                </div>
              </section>
              <section>
                <div className={styles.esrCaption}>Right to Education</div>
                <div className={styles.radarWrapper}></div>
              </section>
              <section className={styles.bottomLink}>
                <p className={styles.normalText}>Media Stories of disappearances, unjustified arrests and extrajudicial killings are now so commonplace in Mexico that the population has vegun to think they are normal.</p>
                <p className={styles.normalText}>Media Stories of disappearances, unjustified arrests and extrajudicial killings are now so commonplace in Mexico that the population has vegun to think they are normal.</p>
                <p className={styles.normalText}>Media Stories of disappearances, unjustified arrests and extrajudicial killings are now so commonplace in Mexico that the population has vegun to think they are normal.</p>
                <div className={styles.links}>
                  <div className='arrowLink'>
                    <div className='text'>Explore all rights:</div>
                    <div className='text underline'>in East Asia and the Pacific</div>
                  </div>
                  <div className='arrowLink'>
                    <div className='text'>Explore all rights:</div>
                    <div className='text underline'>in East Asia and the Pacific</div>
                  </div>
                </div>
              </section>
              <section>
                <div className={styles.radarWrapper}></div>
              </section>

              <section className={styles.section}>
                <h5 className={styles.subtitle}>This is end of the story</h5>
                <SectionSelector title='Explore all the dataset:' />
              </section>
            </div>
          </div>
          <div className={styles.closeBtn} onClick={this.closeStoryMode}></div>
        </div>
      </div>
    )
  }
}
