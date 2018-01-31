import React from 'react'
import PropTypes from 'prop-types'
import QuestionMark from '../QuestionMark'
import { joinClassName as jcn } from '../utils'
import styles from './style.css'

export default class QuestionTooltip extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    question: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    isTitle: PropTypes.bool,
  }

  constructor() {
    super()
    this.state = { showAnswer: false }
  }

  componentDidMount() {
    document.addEventListener('click', this.documentClick)
  }

  componentDidUpdate() {
    if (this.refs.popupPane) {
      const pos = this.refs.question.getBoundingClientRect()
      const size = this.refs.popupPane.getBoundingClientRect()
      console.log(size)
      this.refs.popupPane.style.right = document.body.clientWidth - pos.x + 24 + 'px'
      if (pos.top < size.height) {
        this.refs.popupPane.style.top = '30px'
      } else {
        this.refs.popupPane.style.bottom = document.body.clientHeight - pos.bottom + 'px'
      }
    }
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
    const { children, question, isTitle, width } = this.props
    const joinedClass = jcn({
      indicatorQues: !isTitle,
      CPRTitle: isTitle,
    }, styles)

    return (
      <div className={styles.quesPopup} ref='quesPopup'>
        <div className={joinedClass} onClick={this.toggleAnswer} ref='question'>
          {question}
          <span className={styles.questionMark}>
            { isTitle
              ? 'i'
              : <QuestionMark></QuestionMark>
            }
          </span>
        </div>
        { this.state.showAnswer &&
          <div className={styles.popupPane} ref='popupPane' style={{ width: width + 'px' }}>{children}</div>
        }
      </div>
    )
  }
}
