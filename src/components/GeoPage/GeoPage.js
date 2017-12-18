import React from 'react'
import SubTopNav from '../SubTopNav/'
import styles from './style.css'

export default class GeoPage extends React.Component {
  componentDidMount() {
    this.refs.content.style.height = this.refs.page.offsetHeight - 90 + 'px'
  }

  render() {
    return (
      <div className={styles.geoPage} ref='page'>
        <SubTopNav />
        <div className='row' ref='content'>
          <div className='column'>
            <div>
              <input type="text" placeholder='Search Country' />
              <ul>
                <li>High Income OECD Countries</li>
                <li>Central and Eastern Europe and Central Asia</li>
                <li>East Asia and the Pacific</li>
                <li>Latin America and the Caribbean</li>
                <li>Middle East and Northern Africa</li>
                <li>Sub-Saharan Africa</li>
                <li>Civil and Political Rights Pilot Countries</li>
              </ul>
            </div>
          </div>
          <div className='column'></div>
          <div className='column'>
            <div>
              <div>ESR</div>
              <ul>
                <li>Right to Education</li>
                <li>Right to Food</li>
                <li>Right to Work</li>
                <li>Right to Housing</li>
                <li>Right to Health</li>
              </ul>
              <div>CPR</div>
              <ul>
                <li>Right to Opinion and Expression</li>
                <li>Right to Assembly and Association</li>
                <li>Right to Freedom from Execution</li>
                <li>Right to Freedom from Torture</li>
                <li>Right to Participate in Government</li>
                <li>Right to Freedom from Arbitrary Arrest</li>
                <li>Right to Freedom from Disappearance</li>
              </ul>
              <div>
                <div>
                  <div>Right to Education</div>
                  <div>Ecomonic and Social Rights</div>
                </div>
                <div className='arrowLink'>
                  <div className='text'>Explore this rights in:</div>
                  <div className='text underline'>HRMI Civic and Political Rights Pilot Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
