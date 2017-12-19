import React from 'react'
import PropTypes from 'prop-types'
import { joinClassName as jcn } from '../utils'
import styles from './style.css'

export default class CountryItem extends React.Component {
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
      countryName: true,
      selected: selected,
    }, styles)

    return (
      <li className={styles.countryItem}><div className={joinedClass} onClick={this.onClick}>{children}</div></li>
    )
  }
}
