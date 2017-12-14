import React from 'react'
import PropTypes from 'prop-types'
import styles from './style.css'

export default class StoryPopup extends React.Component {
  static propTypes = {
    closeStoryMode: PropTypes.func.isRequired,
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
          <div className={styles.closeBtn} onClick={this.closeStoryMode}></div>
        </div>
      </div>
    )
  }
}
