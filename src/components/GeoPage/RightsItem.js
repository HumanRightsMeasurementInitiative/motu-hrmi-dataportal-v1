import React from 'react'
import PropTypes from 'prop-types'
import styles from './style.css'

export default class RightsItem extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    right: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
  }

  onClick = () => {
    const { right, onItemClick } = this.props
    onItemClick(right)
  }

  render() {
    const { children } = this.props
    return (
      <li className={styles.rightsItem} onClick={this.onClick} rightcolor={children}>
        <div className={styles.chartCaption}>Right to {children}</div>
        <div className={styles.chartWrapper}></div>
      </li>
    )
  }
}
