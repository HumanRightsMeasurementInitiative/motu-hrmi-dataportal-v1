import React from 'react'
import PropTypes from 'prop-types'
import styles from './style.css'

export default class CountryItem extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    country: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
  }

  onClick = () => {
    const { country, onItemClick } = this.props
    onItemClick(country)
  }

  render() {
    const { children } = this.props
    return (
      <li className={styles.CountryItem} onClick={this.onClick}>{children}</li>
    )
  }
}
