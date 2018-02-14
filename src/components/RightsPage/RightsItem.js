import React from 'react'
import PropTypes from 'prop-types'
import { joinClassName as jcn } from '../utils'
import styles from './style.css'

export default class RightsItem extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    right: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
    onItemClick: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    const width = this.refs.borderLine.offsetLeft
    this.refs.borderLine.style.display = 'block'
    this.refs.borderLine.style.width = width + 'px'
  }

  onClick = () => {
    const { right, onItemClick } = this.props
    onItemClick(right)
  }

  render() {
    const { children, content, selected } = this.props

    const joinedClass = jcn({
      rightItemWrapper: true,
      selected: selected,
    }, styles)

    return (
      <li className={joinedClass}>
        <div className={styles.rightItem} onClick={this.onClick}>
          {children}
          <span className={styles.borderLine} ref='borderLine'></span>
        </div>
        { children === 'assembly-and-association' && selected &&
          <ul>
            <li className={styles.rightSubItem}>{content.subrights_name.assembly}</li>
            <li className={styles.rightSubItem}>{content.subrights_name.association}</li>
          </ul>
        }
        { children === 'freedom-from-execution' && selected &&
          <ul>
            <li className={styles.rightSubItem}>{content.subrights_name['freedom-from-the-death-penalty']}</li>
            <li className={styles.rightSubItem}>{content.subrights_name['freedom-from-extrajudicial-execution']}</li>
          </ul>
        }
      </li>
    )
  }
}
