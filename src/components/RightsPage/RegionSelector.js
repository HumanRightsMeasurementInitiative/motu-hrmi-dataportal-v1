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

  render() {
    const { data, urlSegs, onItemClick } = this.props

    const regions = Object.keys(data).map((item, i) => (
      <RegionItem key={i} code={item} onItemClick={onItemClick} selected={item === urlSegs.region}>{getRegionName(item)}</RegionItem>
    ))

    const regionSelector = jcn({
      regionSelector: true,
      show: this.state.isRegionOpen,
    }, styles)

    return (
      <div className={regionSelector}>
        <div className={styles.toggleSwitch} onClick={this.toggleRegionDropdown}>Expore right: <br /> in a different region</div>
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

  render() {
    const { children, selected } = this.props

    const joinedClass = jcn({
      regionItem: true,
      selected: selected,
    }, styles)

    return (
      <li className={joinedClass} onClick={this.onClick}>{children}</li>
    )
  }
}
