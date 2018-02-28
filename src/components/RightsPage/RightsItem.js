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
    setSubrights: PropTypes.func,
    subrights: PropTypes.string,
  }

  static defaultProps = {
    subrights: null,
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
    const { children, right, content, selected, subrights, setSubrights } = this.props

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
        { right === 'assembly-and-association' && selected &&
          <ul>
            <SubRights subrights={subrights} rightName='assembly' setSubrights={setSubrights}>{content.subrights_name.assembly}</SubRights>
            <SubRights subrights={subrights} rightName='association' setSubrights={setSubrights}>{content.subrights_name.association}</SubRights>
          </ul>
        }
        { right === 'freedom-from-execution' && selected &&
          <ul>
            <SubRights subrights={subrights} rightName='freedom-from-the-death-penalty' setSubrights={setSubrights}>{content.subrights_name['freedom-from-the-death-penalty']}</SubRights>
            <SubRights subrights={subrights} rightName='freedom-from-extrajudicial-execution' setSubrights={setSubrights}>{content.subrights_name['freedom-from-extrajudicial-execution']}</SubRights>
          </ul>
        }
      </li>
    )
  }
}

class SubRights extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    rightName: PropTypes.string.isRequired,
    setSubrights: PropTypes.func,
    subrights: PropTypes.string,
  }

  componentDidMount() {
    const width = this.refs.borderLine.offsetLeft - 20
    this.refs.borderLine.style.display = 'block'
    this.refs.borderLine.style.width = width + 'px'
  }

  setSubrights = () => {
    const { setSubrights, rightName } = this.props
    if (setSubrights) setSubrights(rightName)
  }

  render() {
    const { children, subrights, rightName } = this.props

    const rightSubItem = jcn({
      rightSubItem: true,
      selected: subrights === rightName,
    }, styles)

    return (
      <li className={rightSubItem} onClick={this.setSubrights}>
        {children}
        <span className={styles.subBorderLine} ref='borderLine'></span>
      </li>
    )
  }
}
