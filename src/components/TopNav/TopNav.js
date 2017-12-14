import React from 'react'
import PropTypes from 'prop-types'
import LangSelector from '../LangSelector/'
import { joinClassName as jcn } from '../utils'
import styles from './styles.css'

export default class TopNav extends React.Component {
  static propTypes = {
    currentDropdown: PropTypes.string.isRequired,
    updateDropdown: PropTypes.func.isRequired,
  }

  onAboutClicked = () => {
    if (this.props.currentDropdown === 'about') {
      this.props.updateDropdown('closed')
    } else {
      this.props.updateDropdown('about')
    }
  }

  onMethodologyClicked = () => {
    if (this.props.currentDropdown === 'methodology') {
      this.props.updateDropdown('closed')
    } else {
      this.props.updateDropdown('methodology')
    }
  }

  onHowClicked = () => {
    if (this.props.currentDropdown === 'how') {
      this.props.updateDropdown('closed')
    } else {
      this.props.updateDropdown('how')
    }
  }

  onDownloadClicked = () => {
    if (this.props.currentDropdown === 'download') {
      this.props.updateDropdown('closed')
    } else {
      this.props.updateDropdown('download')
    }
  }

  closeDropdown = () => {
    this.props.updateDropdown('closed')
  }

  render() {
    const { currentDropdown } = this.props
    const classNamesAbout = jcn({
      'hide': currentDropdown !== 'about',
      'menuDropdown': true,
    }, styles)
    const classNamesMethodology = jcn({
      'hide': currentDropdown !== 'methodology',
      'menuDropdown': true,
    }, styles)
    const classNamesHow = jcn({
      'hide': currentDropdown !== 'how',
      'menuDropdownList': true,
    }, styles)
    const classNamesDownload = jcn({
      'hide': currentDropdown !== 'download',
      'menuDropdownList': true,
    }, styles)
    return (
      <div className={styles.wrapper}>
        <div className={styles.logo}>HRMI</div>
        <div className={styles.menu}>
          <div className={styles.menuItem}><LangSelector /></div>
          <div className={styles.menuItem}>
            <div className={styles.menuLabel} onClick={this.onAboutClicked}>About the initiative</div>
            <div className={classNamesAbout}>
              <div className={styles.closeBtn} onClick={this.closeDropdown}>X</div>
              <h2>About the iniative</h2>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>
              <p>Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
              <a href="https://humanrightsmeasurement.org/" target="_blank">Read more about the HRMI iniative.</a>
            </div>
          </div>
          <div className={styles.menuItem}>
            <div className={styles.menuLabel} onClick={this.onMethodologyClicked}>Methodology</div>
            <div className={classNamesMethodology}>
              <div className={styles.closeBtn} onClick={this.closeDropdown}>X</div>
              <h2>Methodology</h2>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzri delenit augue duis dolore te feugait nulla facilis.</p>
              <a href="https://humanrightsmeasurement.org/" target="_blank">Read more about the HRMI iniative.</a>
            </div>
          </div>
          <div className={styles.menuItem}>
            <div className={styles.menuLabel} onClick={this.onHowClicked}>How To Use</div>
            <div className={classNamesHow}>
              <ul className={styles.dropdownUl}>
                <li className={styles.dropdownLi}>See Mexico Example</li>
                <li className={styles.dropdownLi}>Data in action</li>
              </ul>
            </div>
          </div>
          <div className={styles.menuItem}>
            <div className={styles.menuLabel} onClick={this.onDownloadClicked}>Download Dataset</div>
            <div className={classNamesDownload}>
              <ul className={styles.dropdownUl}>
                <li className={styles.dropdownLi}>Dataset 1</li>
                <li className={styles.dropdownLi}>Dataset 2</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
