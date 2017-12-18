import React from 'react'
import SubTopNav from '../SubTopNav/'
import styles from './style.css'
import { joinClassName as jcn } from '../utils'

export default class RightsPage extends React.Component {
  constructor() {
    super()
    this.state = { isRegionOpen: false }
  }

  componentDidMount() {
    this.refs.content.style.height = this.refs.page.offsetHeight - 90 + 'px'
  }

  toggleRegionDropdown = () => {
    this.setState({ isRegionOpen: !this.state.isRegionOpen })
  }

  render() {
    const regionSelector = jcn({
      regionSelector: true,
      show: this.state.isRegionOpen,
    }, styles)

    return (
      <div className={styles.rightsPage} ref='page'>
        <SubTopNav />
        <div className='row' ref='content'>
          <div className='column'>
            <div className={styles.columnLeft}>
              <div className={regionSelector}>
                <div className={styles.toggleSwitch} onClick={this.toggleRegionDropdown}>Expore right: <br /> in a different region</div>
                <ul className={styles.regionDropdown}>
                  <li className={styles.regionItem}>High Income OECD Countries</li>
                  <li className={styles.regionItem}>Central and Eastern Europe and Central Asia</li>
                  <li className={styles.regionItem}>East Asia and the Pacific</li>
                  <li className={styles.regionItem}>Latin America and the Caribbean</li>
                  <li className={styles.regionItem}>Middle East and Northern Africa</li>
                  <li className={styles.regionItem}>Sub-Saharan Africa</li>
                  <li className={styles.regionItem}>Civil and Political Rights Pilot Countries</li>
                </ul>
              </div>
              <div>Economic and Social Rights</div>
              <ul>
                <li className={styles.rightItem}>Right to Education</li>
                <li className={styles.rightItem}>Right to Food</li>
                <li className={styles.rightItem}>Right to Work</li>
                <li className={styles.rightItem}>Right to Housing</li>
                <li className={styles.rightItem}>Right to Health</li>
              </ul>
              <div>Civil and Political Rights</div>
              <ul>
                <li className={styles.rightItem}>Right to Opinion and Expression</li>
                <li className={styles.rightItem}>Right to Assembly and Association</li>
                <li className={styles.rightItem}>Right to Freedom from Execution</li>
                <li className={styles.rightItem}>Right to Freedom from Torture</li>
                <li className={styles.rightItem}>Right to Participate in Government</li>
                <li className={styles.rightItem}>Right to Freedom from Arbitrary Arrest</li>
                <li className={styles.rightItem}>Right to Freedom from Disappearance</li>
              </ul>
            </div>
          </div>
          <div className='column'></div>
          <div className='column'>
            <div>
              <div>
                <div>Right to Food</div>
                <div>in High Income OECD Countries</div>
              </div>
              <div className='arrowLink'>
                <div className='text'>Expore all rights in:</div>
                <div className='text underline'>High Income OECD Countries</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
