import React from 'react'
import TopNav from '../TopNav/'
import styles from './styles.css'

export default class TopMenu extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.logo}>HRMI</div>
        <TopNav />
      </div>
    )
  }
}
