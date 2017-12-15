import React from 'react'
import PropTypes from 'prop-types'
import { joinClassName as jcn } from '../utils'
import styles from './styles.css'

export default class NavItem extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onLabelClick: PropTypes.func.isRequired,
    currentDropdown: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  }

  onClickHanlder = () => {
    this.props.onLabelClick(this.props.label)
  }

  isActive = () => (
    this.props.label === this.props.currentDropdown
  )

  render() {
    const { label, currentDropdown, children } = this.props
    const dropdownClassNames = jcn({
      'hide': currentDropdown !== label,
      'menuDropdown': label === 'About the initiative' || label === 'Methodology',
      'menuDropdownList': label === 'How To Use' || label === 'Download Dataset',
    }, styles)
    return (
      <div className={styles.navItem}>
        <div className={styles.menuLabel} onClick={this.onClickHanlder}>{label}</div>
        <div className={dropdownClassNames}>
          {children}
        </div>
      </div>
    )
  }
}
