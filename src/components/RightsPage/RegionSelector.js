import React from 'react'
import PropTypes from 'prop-types'
import RegionItem from '../RegionItem'
import { getRegionName, joinClassName as jcn } from '../utils'
import styles from './style.css'

export default class RegionSelector extends React.Component {
  static propTypes = {
    rightsByRegion: PropTypes.object.isRequired,
    urlSegs: PropTypes.object.isRequired,
    onItemClick: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = { isRegionOpen: true }
  }

  toggleRegionDropdown = () => {
    this.setState({ isRegionOpen: !this.state.isRegionOpen })
  }

  onItemClick = (code) => {
    this.props.onItemClick(code)
    this.setState({ isRegionOpen: false })
  }

  render() {
    const { rightsByRegion, urlSegs } = this.props

    const regions = Object.keys(rightsByRegion).map((region, i) => (
      <RegionItem key={i} index={i} code={region} onItemClick={this.onItemClick} selected={region === urlSegs.region} closePopup={this.toggleRegionDropdown} whiteBorder={true}>
        {getRegionName(region)}
      </RegionItem>
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
