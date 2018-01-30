import React from 'react'
import PropTypes from 'prop-types'
import QuestionMark from '../QuestionMark'
import { joinClassName as jcn } from '../utils'
import styles from './style.css'

export default class QuestionTooltip extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    question: PropTypes.string.isRequired,
    isTitle: PropTypes.bool,
  }

  constructor() {
    super()
    this.state = { showAnswer: false }
  }

  componentDidMount() {
    document.addEventListener('click', this.documentClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.documentClick)
  }

  documentClick = (e) => {
    if (this.refs.quesPopup.contains(e.target)) return
    this.setState({ showAnswer: false })
  }

  toggleAnswer = (e) => {
    e.stopPropagation()
    this.setState({ showAnswer: !this.state.showAnswer })
  }

  render() {
    const { children, question, isTitle } = this.props
    const joinedClass = jcn({
      indicatorQues: !isTitle,
      CPRTitle: isTitle,
    }, styles)

    return (
      <div className={styles.quesPopup} ref='quesPopup'>
        <div className={joinedClass}>{question}<span className={styles.questionMark} onClick={this.toggleAnswer}><QuestionMark></QuestionMark></span></div>
        { this.state.showAnswer &&
          <div className={styles.popupPane}>{children}</div>
        }
      </div>
    )
  }
}
