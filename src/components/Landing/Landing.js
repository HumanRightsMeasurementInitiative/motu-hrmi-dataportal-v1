import React from 'react'
import PropTypes from 'prop-types'
import StoryPopup from '../StoryPopup'
import SectionSelector from '../SectionSelector'
import styles from './style.css'

export default class Landing extends React.Component {
  static propTypes = {
    isStoryOpen: PropTypes.bool.isRequired,
    openStoryMode: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.openStoryMode()
  }

  render() {
    const { isStoryOpen } = this.props
    return (
      <div className={styles.landing}>
        <div className={styles.pageSelector}><SectionSelector title='Explore all the dataset:' /></div>
        { isStoryOpen &&
          <StoryPopup />
        }
      </div>
    )
  }
}
