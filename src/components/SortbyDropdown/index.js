import React from 'react'
import PropTypes from 'prop-types'
import { joinClassName as jcn } from '../utils'
import styles from './style.css'

export default class SortbyDropdown extends React.Component {
  static propTypes = {
    regionCode: PropTypes.string.isRequired,
    sortby: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
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
    this.props.onItemClick(name)
    this.setState({ isOpen: false })
  }

  render() {
    const { regionCode, sortby } = this.props

    const downloadPopup = jcn({
      downloadPopup: true,
      active: this.state.isOpen,
    }, styles)

    return (
      <div className={downloadPopup} ref='downloadPopup'>
        <div>Sort by: <span style={{ textDecoration: 'underline' }} onClick={this.togglePopup}>{sortby.includes('score') ? 'Score' : sortby}</span></div>
        <ul className={styles.list}>
          <ListItem className={styles.item} sortby={sortby} onItemClick={this.onItemClick}>Name</ListItem>
          { regionCode !== 'high-income' &&
            <li className={styles.item}>
              <div className={jcn({ selected: sortby.includes('score') }, styles)}>Score</div>
              <ul className={styles.sublist}>
                <ListItem className={styles.subItem} sortby={sortby} onItemClick={this.onItemClick}>Core assessment standard score</ListItem>
                <ListItem className={styles.subItem} sortby={sortby} onItemClick={this.onItemClick}>High income OECD assessment country score</ListItem>
              </ul>
            </li>
          }
          <ListItem className={styles.item} sortby={sortby} onItemClick={this.onItemClick}>GDP/Capita</ListItem>
        </ul>
      </div>
    )
  }
}

class ListItem extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string.isRequired,
    sortby: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
  }

  onItemClick = () => {
    const { children, onItemClick } = this.props
    onItemClick(children)
  }

  render() {
    const { children, className, sortby } = this.props
    const selected = jcn({
      selected: children === sortby,
    }, styles)
    return (
      <li className={className} onClick={this.onItemClick}>
        <div className={selected}>{children}</div>
      </li>
    )
  }
}
