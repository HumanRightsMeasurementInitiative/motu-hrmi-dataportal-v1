import React from 'react'
import PropTypes from 'prop-types'
import { joinClassName as jcn } from '../utils'
import styles from './style.css'

export default class RegionItem extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    code: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    const width = this.refs.borderLine.offsetLeft
    this.refs.borderLine.style.display = 'block'
    this.refs.borderLine.style.width = width - 25 + 'px'
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
      <li className={joinedClass} onClick={this.onClick}>
        {children}
        <span className={styles.borderLine} ref='borderLine'></span>
      </li>
    )
  }
}
