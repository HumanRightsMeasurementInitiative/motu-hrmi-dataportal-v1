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

  componentWillMount() {
    this.props.openStoryMode()
  }

  render() {
    const { isStoryOpen, content } = this.props
    return (
      <div className={styles.landing}>
        <div className={styles.pageSelector}><SectionSelector title={content.section.title} /></div>
        { isStoryOpen &&
          <StoryPopup />
        }
      </div>
    )
  }
}
