import React from 'react'
import PropTypes from 'prop-types'
import { joinClassName as jcn } from '../utils'
import styles from './style.css'

export default class RegionItem extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    index: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
    closePopup: PropTypes.func,
    whiteBorder: PropTypes.bool,
  }

  componentDidMount() {
    const width = this.refs.borderLine.offsetLeft
    this.refs.borderLine.style.display = 'block'
    this.refs.borderLine.style.width = width - 25 + 'px'
    if (this.props.closePopup !== undefined) this.props.closePopup()
  }

  onClick = () => {
    const { code, onItemClick } = this.props
    onItemClick(code)
  }

  render() {
    const { children, index, selected, whiteBorder } = this.props
    const widthValues = ['110px', '160px', '90px', '126px', '110px', '160px', '160px']

    const joinedClass = jcn({
      regionItem: true,
      selected: selected,
      whiteBorder: whiteBorder,
    }, styles)

    return (
      <li className={joinedClass} onClick={this.onClick} data-width={widthValues[index]}>
        {children}
        <span className={styles.borderLine} ref='borderLine'></span>
      </li>
    )
  }
}
