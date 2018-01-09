import React from 'react'
import PropTypes from 'prop-types'
import { getRegionName, joinClassName as jcn } from '../utils'
import styles from './style.css'

export default class RegionSelector extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    urlSegs: PropTypes.object.isRequired,
    onItemClick: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = { isRegionOpen: false }
  }

  toggleRegionDropdown = () => {
    this.setState({ isRegionOpen: !this.state.isRegionOpen })
  }

  onItemClick = (code) => {
    this.props.onItemClick(code)
    this.setState({ isRegionOpen: false })
  }

  render() {
    const { data, urlSegs } = this.props

    const regions = Object.keys(data).map((item, i) => (
      <RegionItem key={i} code={item} onItemClick={this.onItemClick} selected={item === urlSegs.region}>{getRegionName(item)}</RegionItem>
    ))

    const regionSelector = jcn({
      regionSelector: true,
      show: this.state.isRegionOpen,
    }, styles)

    return (
      <div className={regionSelector}>
        <div className={styles.toggleSwitch} onClick={this.toggleRegionDropdown}>Select Region</div>
        <ul className={styles.regionDropdown}>
          {regions}
        </ul>
      </div>
    )
  }
}

class RegionItem extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    code: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
  }

  onClick = () => {
    const { code, onItemClick } = this.props
    onItemClick(code)
  }

  createBorderLine = () => {
    const { borderLine } = this.refs
    if (this.timer) clearTimeout(this.timer)
    if (borderLine && borderLine.style.display !== 'block') {
      this.timer = setTimeout(function () {
        const width = borderLine.offsetLeft
        borderLine.style.display = 'block'
        borderLine.style.width = width - 25 + 'px'
      }, 100)
    }
    return ''
  }

  render() {
    const { children, selected } = this.props

    const joinedClass = jcn({
      regionItem: true,
      selected: selected,
    }, styles)

    return (
      <li className={joinedClass} onClick={this.onClick}>
        {children}
        <span className={styles.rightBorder} ref='borderLine'>{this.createBorderLine()}</span>
      </li>
    )
  }
}