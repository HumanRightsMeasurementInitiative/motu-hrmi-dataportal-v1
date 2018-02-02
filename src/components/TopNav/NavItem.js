import React from 'react'
import PropTypes from 'prop-types'
import { joinClassName as jcn } from '../utils'
import styles from './styles.css'

export default class NavItem extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    labelKey: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onDownloadClick: PropTypes.func,
    buttonText: PropTypes.string,
  }

  constructor() {
    super()
    this.state = { isOpen: false }
  }

  componentDidMount() {
    document.addEventListener('click', this.documentClick)
    if (this.props.onDownloadClick !== undefined) {
      this.refs.dropdown.addEventListener('click', this.onClickHanlder)
      this.refs.dropdownWrapper.addEventListener('click', this.removePropogation)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.documentClick)
    if (this.props.onDownloadClick !== undefined) {
      this.refs.dropdown.removeEventListener('click', this.onClickHanlder)
      this.refs.dropdownWrapper.removeEventListener('click', this.removePropogation)
    }
  }

  documentClick = (e) => {
    if (this.refs.navItem.contains(e.target)) return
    this.setState({ isOpen: false })
  }

  removePropogation = (e) => {
    e.stopPropagation()
  }

  onClickHanlder = (e) => {
    e.stopPropagation()
    this.setState({ isOpen: !this.state.isOpen })
  }

  isActive = () => (
    this.state.isOpen
  )

  onDownloadClick = () => {
    this.setState({ isOpen: false })
    this.props.onDownloadClick()
  }

  render() {
    const { label, labelKey, children, buttonText } = this.props
    const labelClass = jcn({
      'menuLabel': true,
      'active': this.state.isOpen,
    }, styles)

    const dropdownClassNames = jcn({
      'hide': !this.state.isOpen,
      'menuDropdown': labelKey === 'about' || labelKey === 'methodology' || labelKey === 'howToUse',
      'menuDropdownList': labelKey === 'download',
    }, styles)

    return (
      <div className={styles.navItem} ref='navItem'>
        <div className={labelClass} onClick={this.onClickHanlder}>{label}</div>
        <div className={dropdownClassNames} dropdown={labelKey} ref='dropdown'>
          <div className={styles.dropdownWrapper} ref='dropdownWrapper'>
            {children}
            { labelKey === 'download' &&
              <div className={styles.agreeBtnWrapper}><div className={styles.agreeBtn} onClick={this.onDownloadClick}>{buttonText}</div></div>
            }
          </div>
        </div>
      </div>
    )
  }
}
