import React from 'react'
import PropTypes from 'prop-types'
import QuestionMark from '../QuestionMark'
import { joinClassName as jcn } from '../utils'
import styles from './style.css'

export default class ChangeStandard extends React.Component {
  static propTypes = {
    content: PropTypes.object.isRequired,
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
    if (this.refs.questionTooltip.contains(e.target)) return
    this.setState({ isOpen: false })
  }

  togglePopup = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  onItemClick = (name) => {
    this.props.changeEsrStandard(name)
    // this.setState({ isOpen: false })
  }

  render() {
    const { esrStandard, content } = this.props

    return (
      <div className={styles.buttonGroup}>
        <ListItem onItemClick={this.onItemClick} value='esrCore' currentValue={esrStandard}>
          {content.legend.esr_barchart[0]}
        </ListItem>
        <ListItem onItemClick={this.onItemClick} value='esrHI' currentValue={esrStandard}>
          {content.legend.esr_barchart[1]}
        </ListItem>
        <div className={styles.container} ref='questionTooltip'>
          <span className={styles.questionMark} onClick={this.togglePopup}>
            <QuestionMark></QuestionMark>
          </span>
          { this.state.isOpen &&
            <div className={styles.popupPane} ref='popupPane'>{content.country_tooltips[2].paragraphs}</div>
          }
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
    onItemClick: PropTypes.func.isRequired,
  }

  onItemClick = () => {
    const { value, onItemClick } = this.props
    onItemClick(value)
  }

  render() {
    const { children, value, currentValue } = this.props
    const selected = jcn({
      standardItem: true,
      selected: value === currentValue,
    }, styles)
    return (
      <div className={selected} onClick={this.onItemClick}>{children}</div>
    )
  }
}
