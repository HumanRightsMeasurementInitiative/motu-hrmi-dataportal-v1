import React from 'react'
import PropTypes from 'prop-types'
import LangSelector from '../LangSelector/'
import NavItem from './NavItem'
import styles from './styles.css'

export default class TopNav extends React.Component {
  static propTypes = {
    currentDropdown: PropTypes.string.isRequired,
    updateDropdown: PropTypes.func.isRequired,
  }

  onNavItemClicked = (itemName) => {
    if (this.props.currentDropdown === itemName) {
      this.props.updateDropdown('closed')
    } else {
      this.props.updateDropdown(itemName)
    }
  }

  closeDropdown = () => {
    this.props.updateDropdown('closed')
  }

  render() {
    const { currentDropdown } = this.props
    return (
      <div className={styles.nav}>
        <div className={styles.navItem}><LangSelector /></div>
        <NavItem label={'About the initiative'} onLabelClick={this.onNavItemClicked} currentDropdown={currentDropdown}>
          <div className={styles.closeBtn} onClick={this.closeDropdown}>X</div>
          <h2>About the iniative</h2>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>
          <p>Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
          <a href="https://humanrightsmeasurement.org/" target="_blank">Read more about the HRMI iniative.</a>
        </NavItem>
        <NavItem label={'Methodology'} onLabelClick={this.onNavItemClicked} currentDropdown={currentDropdown}>
          <div className={styles.closeBtn} onClick={this.closeDropdown}>X</div>
          <h2>Methodology</h2>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzri delenit augue duis dolore te feugait nulla facilis.</p>
          <a href="https://humanrightsmeasurement.org/" target="_blank">Read more about the HRMI iniative.</a>
        </NavItem>
        <NavItem label={'How To Use'} onLabelClick={this.onNavItemClicked} currentDropdown={currentDropdown}>
          <ul className={styles.dropdownUl}>
            <li className={styles.dropdownLi}>See Mexico Example</li>
            <li className={styles.dropdownLi}>Data in action</li>
          </ul>
        </NavItem>
        <NavItem label={'Download Dataset'} onLabelClick={this.onNavItemClicked} currentDropdown={currentDropdown}>
          <ul className={styles.dropdownUl}>
            <li className={styles.dropdownLi}>Dataset 1</li>
            <li className={styles.dropdownLi}>Dataset 2</li>
          </ul>
        </NavItem>
      </div>
    )
  }
}
