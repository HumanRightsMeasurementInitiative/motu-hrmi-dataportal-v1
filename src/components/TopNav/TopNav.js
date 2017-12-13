import React from 'react'
import LangSelector from '../LangSelector/'
import styles from './styles.css'

export default class TopNav extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.logo}>HRMI</div>
        <div className={styles.menu}>
          <div className={styles.menuItem}><LangSelector /></div>
          <div className={styles.menuItem}>About the initiative</div>
          <div className={styles.menuItem}>Methodology</div>
          <div className={styles.menuItem}>How To Use</div>
          <div className={styles.menuItem}>Download Dataset</div>
        </div>
        <div>
        </div>
      </div>
    )
  }
}
