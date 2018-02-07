import React from 'react'
import PropTypes from 'prop-types'
import { joinClassName as jcn } from '../utils'
import styles from './style.css'

export default class ChangeStandard extends React.Component {
  static propTypes = {
    standard: PropTypes.string.isRequired,
    changeStandard: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = { isOpen: false }
  }

  componentDidMount() {
    document.addEventListener('click', this.documentClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.documentClick)
  }

  documentClick = (e) => {
    if (this.refs.downloadPopup.contains(e.target)) return
    this.setState({ isOpen: false })
  }

  togglePopup = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  onItemClick = (name) => {
    this.props.changeStandard(name)
    this.setState({ isOpen: false })
  }

  render() {
    const { standard } = this.props

    const downloadPopup = jcn({
      downloadPopup: true,
      active: this.state.isOpen,
    }, styles)

    return (
      <div className={downloadPopup} ref='downloadPopup'>
        <div className={styles.listWrapper}>
          Change assessment standard: <span style={{ textDecoration: 'underline' }} onClick={this.togglePopup}>{standard}</span>
          <ul className={styles.list}>
            <ListItem className={styles.item} standard={standard} onItemClick={this.onItemClick}>Core</ListItem>
            <ListItem className={styles.item} standard={standard} onItemClick={this.onItemClick}>High income OECD</ListItem>
          </ul>
        </div>
      </div>
    )
  }
}

class ListItem extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string.isRequired,
    standard: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
  }

  onItemClick = () => {
    const { children, onItemClick } = this.props
    onItemClick(children)
  }

  render() {
    const { children, className, standard } = this.props
    const selected = jcn({
      selected: children === standard,
    }, styles)
    return (
      <li className={className} onClick={this.onItemClick}>
        <div className={selected}>{children}</div>
      </li>
    )
  }
}
