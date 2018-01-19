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
    onDownloadClick: PropTypes.func,
  }

  componentDidMount() {
    document.addEventListener('click', this.documentClick)
    this.refs.labels.addEventListener('click', this.onClickHanlder)
    if (this.refs.agreeBtn) this.refs.agreeBtn.addEventListener('click', this.onDownloadClick)
    if (this.props.label !== 'Download Dataset') {
      this.refs.dropdown.addEventListener('click', this.removePropogation)
    } else {
      this.refs.dropdownWrapper.addEventListener('click', this.removePropogation)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.documentClick)
    this.refs.labels.removeEventListener('click', this.onClickHanlder)
    if (this.refs.agreeBtn) this.refs.agreeBtn.removeEventListener('click', this.onDownloadClick)
    if (this.props.label !== 'Download Dataset') {
      this.refs.dropdown.removeEventListener('click', this.removePropogation)
    } else {
      this.refs.dropdownWrapper.removeEventListener('click', this.removePropogation)
    }
  }

  documentClick = () => {
    this.props.onLabelClick('closed')
  }

  removePropogation = (e) => {
    e.stopPropagation()
  }

  onClickHanlder = (e) => {
    e.stopPropagation()
    this.props.onLabelClick(this.props.label)
  }

  isActive = () => (
    this.props.label === this.props.currentDropdown
  )

  onDownloadClick = () => {
    this.props.onDownloadClick()
  }

  render() {
    const { label, currentDropdown, children } = this.props
    const labelClass = jcn({
      'menuLabel': true,
      'active':  currentDropdown === label,
    }, styles)

    const dropdownClassNames = jcn({
      'hide': currentDropdown !== label,
      'menuDropdown': label === 'About the initiative' || label === 'Methodology' || label === 'How To Use',
      'menuDropdownList': label === 'Download Dataset',
    }, styles)

    return (
      <div className={styles.navItem}>
        <div className={labelClass} ref='labels'>{label}</div>
        <div className={dropdownClassNames} dropdown={label} ref='dropdown'>
          <div className={styles.dropdownWrapper} ref='dropdownWrapper'>
            {children}
            { label === 'Download Dataset' &&
              <div className={styles.agreeBtnWrapper}><div className={styles.agreeBtn} ref='agreeBtn'>AGREE</div></div>
            }
          </div>
        </div>
      </div>
    )
  }
}
