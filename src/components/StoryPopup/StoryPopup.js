import React from 'react'
import PropTypes from 'prop-types'
import styles from './style.css'
import LangSelector from '../LangSelector'
import SectionSelector from '../SectionSelector'

export default class StoryPopup extends React.Component {
  static propTypes = {
    closeStoryMode: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { container, graph, intro } = this.refs
    graph.style.height = container.clientHeight - intro.clientHeight - 80 + 'px'
  }

  closeStoryMode = () => {
    if (this.timer) return
    this.refs.storyWrapper.style.opacity = 0
    this.refs.storyPopup.style.top = '100%'
    this.timer = setTimeout(() => {
      this.props.closeStoryMode()
    }, 1000)
  }

  render() {
    return (
      <div className={styles.storyWrapper} ref='storyWrapper'>
        <div className={styles.storyPopup} ref='storyPopup'>
          <div className={styles.popupBody}>
            <div className={styles.columnLeft} ref='container'>
              <div className={styles.fixedContainer}>
                <div className={styles.graph} ref='graph'></div>
                <div ref='intro'>
                  <h4 className={styles.countryName}>Brunei</h4>
                  <p className={styles.countryIntro}>This is a story about rights in Brunei, one of our pilot countries for the Human Rights Measuerement Initiative.</p>
                  <p className={styles.countryIntro}>Here there will be a short introduction on the country and the general context, wich will be narrated in more detail in the long scroll on the right.</p>
                  <div className={styles.popupLink}>Explore all rights:<br/> in Brunei</div>
                </div>
              </div>
            </div>
            <div className={styles.columnRight}>
              <div className={styles.article}>
                <section className={styles.section}>
                  <h1 className={styles.title}>This is a title of the article</h1>
                  <p className={styles.paragraph}>Right to educationThis is a long scroll article about rights in Brunei. It will explain the economic, social, cultural and political context of the country, highlighting how different rights are perceived and experienced in the country, and how some relevant events have influenced the evolution of specific rights.</p>
                  <p className={styles.paragraph}>Images, charts and other kind of media could be used in the article, and several links embedded in the article will lead the user to different sections of the site.</p>
                </section>
                <section className={styles.section}>
                  <h5 className={styles.subtitle}>Right to education</h5>
                  <p className={styles.paragraph}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>
                  <div className={styles.links}>
                    <div className={styles.popupLink}>Explore all rights:<br/> in Brunei</div>
                  </div>
                </section>
                <section className={styles.section}>
                  <div className={styles.articleGraph}></div>
                </section>
                <section className={styles.section}>
                  <p className={styles.paragraph}>Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
                </section>
                <section className={styles.section}>
                  <div className={styles.articleImg}>
                    <div className={styles.image}></div>
                    <div className={styles.desc}>This is a picture of a great strike for this right. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation</div>
                  </div>
                </section>
                <section className={styles.section}>
                  <p className={styles.paragraph}>Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
                </section>
                <section className={styles.section}>
                  <h5 className={styles.subtitle}>Right to education</h5>
                  <SectionSelector />
                </section>
              </div>
            </div>
          </div>
          <div className={styles.langSelector}><LangSelector /></div>
          <div className={styles.closeBtn} onClick={this.closeStoryMode}></div>
        </div>
      </div>
    )
  }
}
