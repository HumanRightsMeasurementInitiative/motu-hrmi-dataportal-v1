import React from 'react'
import PropTypes from 'prop-types'
import MiniBarChart from '../GeoMiniBarChart'
import styles from './style.css'

export default class RightsItem extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    right: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    onItemClick: PropTypes.func.isRequired,
    esrStandard: PropTypes.string,
  }

  onClick = () => {
    const { right, onItemClick } = this.props
    onItemClick(right)
  }

  render() {
    const { children, data, right, esrStandard } = this.props
    return (
      <li className={styles.rightsItem} onClick={this.onClick} rightcolor={children}>
        <div className={styles.chartCaption}>{children}</div>
        <div className={styles.chartWrapper}>
          <MiniBarChart height={28} data={data} right={right} esrStandard={esrStandard} />
        </div>
      </li>
    )
  }
}
