import React from 'react'
import SubTopNav from '../SubTopNav/'
import styles from './style.css'

export default class RightsPage extends React.Component {
  componentDidMount() {
    this.refs.content.style.height = this.refs.page.offsetHeight - 90 + 'px'
  }

  render() {
    return (
      <div className={styles.rightsPage} ref='page'>
        <SubTopNav />
        <div className='row' ref='content'>
          <div className='column'></div>
          <div className='column'></div>
          <div className='column'></div>
        </div>
      </div>
    )
  }
}
