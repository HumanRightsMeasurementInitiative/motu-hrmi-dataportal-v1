import React from 'react'
import PropTypes from 'prop-types'
import TopNav from '../TopNav/'
import { joinClassName as jcn } from '../utils'
import styles from './styles.css'

export default class TopMenu extends React.Component {
  static propTypes = {
    isStoryOpen: PropTypes.bool.isRequired,
    content: PropTypes.object.isRequired,
  }
  render() {
    const { isStoryOpen, content } = this.props
    const joinClassName = jcn({
      wrapper: true,
      isBlur: isStoryOpen,
    }, styles)
    return (
      <div className={joinClassName}>
        <div className={styles.logo}>
          <img className={styles.logoImg} src='https://humanrightsmeasurement.org/wp-content/uploads/2017/07/logo01.png' alt='logo'/>
        </div>
        <TopNav content={content} />
      </div>
    )
  }
}
