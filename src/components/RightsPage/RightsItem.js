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

  componentDidMount() {
    const width = this.refs.borderLine.offsetLeft
    this.refs.borderLine.style.display = 'block'
    this.refs.borderLine.style.width = width - 25 + 'px'
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
      <li className={joinedClass} onClick={this.onClick}>
        Right to {children}
        <span className={styles.borderLine} ref='borderLine'></span>
      </li>
    )
  }
}
