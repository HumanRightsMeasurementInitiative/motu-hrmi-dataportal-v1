import React from 'react'
import TopNav from '../TopNav/'
import styles from './styles.css'

export default class TopMenu extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <img className={styles.logoImg} src='https://humanrightsmeasurement.org/wp-content/uploads/2017/07/logo01.png' alt='logo'/>
        </div>
        <TopNav />
      </div>
    )
  }
}
