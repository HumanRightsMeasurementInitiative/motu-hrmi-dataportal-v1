import React from 'react'
import SubTopNav from '../SubTopNav/'
import styles from './style.css'

export default class CountryPage extends React.Component {
  componentDidMount() {
    this.refs.content.style.height = this.refs.page.offsetHeight - 90 + 'px'
  }

  render() {
    return (
      <div className={styles.countryPage} ref='page'>
        <SubTopNav />
        <div className='row' ref='content'>
          <div className='column'>
            <div className={styles.columnLeft}>
              <div className={styles.hintText}>Back to:</div>
              <div className={styles.backLink}>
                Civic and Political Rights Pilot Countries
              </div>
              <ul className={styles.countriesList}>
                <li className={styles.countryItem}>Australia</li>
                <li className={styles.countryItem}>Brunei</li>
                <li className={styles.countryItem}>Burma</li>
                <li className={styles.countryItem}>Cambodia</li>
                <li className={styles.countryItem}>China</li>
                <li className={styles.countryItem}>Fiji</li>
                <li className={styles.countryItem}>Indonesia</li>
                <li className={styles.countryItem}>Japan</li>
                <li className={styles.countryItem}>Kiribati</li>
                <li className={styles.countryItem}>Korea, North</li>
                <li className={styles.countryItem}>Korea, South</li>
                <li className={styles.countryItem}>Laos</li>
                <li className={styles.countryItem}>Malaysia</li>
              </ul>
            </div>
          </div>
          <div className='column'></div>
          <div className='column'>
            <div>
              <div>BRUNEI</div>
              <div>population</div>
              <div>43.9(2016)</div>
              <div>GDP/Capita(2016)</div>
              <div>$$$</div>
              <div>ESR</div>
              <div>CPR</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
