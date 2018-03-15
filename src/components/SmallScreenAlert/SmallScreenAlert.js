import React from 'react'
import PropTypes from 'prop-types'
import ScreenIcon from './ScreenIcon'
import BetaLogo from '../BetaLogo/'
import styles from './style.css'

export default class SmallScreenAlert extends React.Component {
  static propTypes = {
    content: PropTypes.object.isRequired,
  }

  render() {
    const { content } = this.props
    return (
      <div className={styles.alert}>
        <div className={styles.logo}>
          <a href='https://humanrightsmeasurement.org/' target='_blank'><BetaLogo /></a>
        </div>
        <div className={styles.alertContainer}>
          <div className={styles.iconWrapper}><ScreenIcon /></div>
          <div className={styles.alertText} dangerouslySetInnerHTML={{ __html: content.alert }}></div>
        </div>
      </div>
    )
  }
}
