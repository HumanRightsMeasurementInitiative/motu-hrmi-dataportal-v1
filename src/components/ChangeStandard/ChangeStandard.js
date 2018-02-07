import React from 'react'
import PropTypes from 'prop-types'
import { joinClassName as jcn } from '../utils'
import styles from './style.css'

const LABELS = {
  esrHI: 'High income OECD',
  esrCore: 'Core',
}

export default class ChangeStandard extends React.Component {
  static propTypes = {
    esrStandard: PropTypes.string.isRequired,
    changeEsrStandard: PropTypes.func.isRequired,
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
    this.props.changeEsrStandard(name)
    this.setState({ isOpen: false })
  }

  render() {
    const { esrStandard } = this.props

    const downloadPopup = jcn({
      downloadPopup: true,
      active: this.state.isOpen,
    }, styles)

    return (
      <div className={downloadPopup} ref='downloadPopup'>
        <div className={styles.listWrapper}>
          Change assessment standard:
          {' '}
          <span style={{ textDecoration: 'underline' }} onClick={this.togglePopup}>
            {LABELS[esrStandard]}
          </span>
          <ul className={styles.list}>
            <ListItem className={styles.item} onItemClick={this.onItemClick} value="esrHI" currentValue={esrStandard}>
              {LABELS['esrHI']}
            </ListItem>
            <ListItem className={styles.item} onItemClick={this.onItemClick} value="esrCore" currentValue={esrStandard}>
              {LABELS['esrCore']}
            </ListItem>
          </ul>
        </div>
      </div>
    )
  }
}

class ListItem extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.string.isRequired,
    currentValue: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
  }

  onItemClick = () => {
    const { value, onItemClick } = this.props
    onItemClick(value)
  }

  render() {
    const { value, children, className, currentValue } = this.props
    const selected = jcn({
      selected: value === currentValue,
    }, styles)
    return (
      <li className={className} onClick={this.onItemClick}>
        <div className={selected}>{children}</div>
      </li>
    )
  }
}
