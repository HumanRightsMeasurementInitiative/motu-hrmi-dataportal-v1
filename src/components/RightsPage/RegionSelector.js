import React from 'react'
import PropTypes from 'prop-types'
import RegionItem from '../RegionItem'
import { joinClassName as jcn } from '../utils'
import styles from './style.css'

export default class RegionSelector extends React.Component {
  static propTypes = {
    content: PropTypes.object.isRequired,
    selectRetionText: PropTypes.string.isRequired,
    rightsByRegion: PropTypes.object.isRequired,
    urlSegs: PropTypes.object.isRequired,
    isActive: PropTypes.bool.isRequired,
    onItemClick: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = { isRegionOpen: true }
  }

  toggleRegionDropdown = () => {
    if (this.props.isActive) {
      this.setState({ isRegionOpen: !this.state.isRegionOpen })
    }
  }

  closePopup = () => {
    this.setState({ isRegionOpen: false })
  }

  onItemClick = (code) => {
    this.props.onItemClick(code)
    this.closePopup()
  }

  render() {
    const { content, selectRetionText, rightsByRegion, urlSegs, isActive } = this.props

    const regions = Object.keys(rightsByRegion).map((region, i) => (
      <RegionItem key={i} code={region} onItemClick={this.onItemClick} selected={region === urlSegs.region} closePopup={this.closePopup} whiteBorder={true}>
        {content.region_name[region]}
      </RegionItem>
    ))

    const regionSelector = jcn({
      regionSelector: true,
      show: this.state.isRegionOpen,
    }, styles)

    return (
      <div className={regionSelector} style={{ opacity: isActive ? 1 : 0.2 }}>
        <div className={styles.toggleSwitch} onClick={this.toggleRegionDropdown} style={{ cursor: isActive ? 'pointer' : 'default' }}>{selectRetionText}</div>
        <ul className={styles.regionDropdown}>
          {regions}
        </ul>
      </div>
    )
  }
}
