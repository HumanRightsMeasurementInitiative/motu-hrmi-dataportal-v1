import React from 'react'
import PropTypes from 'prop-types'
import { joinClassName as jcn } from '../utils'
import styles from './style.css'

export default class RightsItem extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    right: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
  }

  onClick = () => {
    const { right, onItemClick } = this.props
    onItemClick(right)
  }

  render() {
    const { children, selected } = this.props

    const joinedClass = jcn({
      rightItem: true,
      selected: selected,
    }, styles)

    return (
      <li className={joinedClass}><div className={styles.rightText} onClick={this.onClick}>Right to {children}</div></li>
    )
  }
}
