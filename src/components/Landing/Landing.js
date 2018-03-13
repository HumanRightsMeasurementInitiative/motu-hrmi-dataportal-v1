import React from 'react'
import PropTypes from 'prop-types'
import StoryPopup from '../StoryPopup'
import SectionSelector from '../SectionSelector'
import styles from './style.css'

export default class Landing extends React.Component {
  static propTypes = {
    isStoryOpen: PropTypes.bool.isRequired,
    openStoryMode: PropTypes.func.isRequired,
    content: PropTypes.object.isRequired,
  }

  openStory = () => {
    this.props.openStoryMode()
  }

  render() {
    const { isStoryOpen, content } = this.props
    return (
      <div className={styles.landing}>
        <Title/>
        <SectionSelector />
        <ProfileStorySelector openPopup={this.openStory}/>
        { isStoryOpen &&
          <StoryPopup />
        }
      </div>
    )
  }
}

const Title = () => {
  return (
    <div className={styles.titleWrapper}>
      <h1 className={styles.title}>Welcome to the Human Right<br/>Measurement Initiative's data website</h1>
      <h3 className={styles.subTitle}>(beta-version for now)</h3>
    </div>
  )
}

const ProfileStorySelector = ({ openPopup }) => {
  return (
    <div className={styles.profileStoryWrapper}>
      <div className={styles.paragraphsWrapper}>
        <p>View an example of HRMI data</p>
        <p>being used in a profile story for</p>
      </div>
      <a className={styles.countryUnderlined} onClick={openPopup}>Mexico</a>
      {` or `}
      <a className={styles.countryUnderlined} href="australia_story_en.pdf" target="_blank">Australia</a>
    </div>
  )
}
