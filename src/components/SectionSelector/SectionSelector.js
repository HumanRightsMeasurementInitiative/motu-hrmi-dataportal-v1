import React from 'react'
import PropTypes from 'prop-types'
import { segsToUrl, joinClassName as jcn } from '../utils'
import styles from './style.css'

export default class SectionSelector extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    urlSegs: PropTypes.object.isRequired,
    urlPush: PropTypes.func.isRequired,
  }

  changeUrl = (section) => {
    if (this.props.urlSegs.right === 'all') {
      this.props.urlPush(segsToUrl({ ...this.props.urlSegs, exploreBy: section, right: 'Food' }))
    } else {
      if (section === 'Geography') {
        this.props.urlPush(segsToUrl({ ...this.props.urlSegs, exploreBy: section, right: 'all' }))
      } else {
        if (this.props.urlSegs.right === undefined) {
          this.props.urlPush(segsToUrl({ ...this.props.urlSegs, exploreBy: section, right: 'Food' }))
        } else {
          this.props.urlPush(segsToUrl({ ...this.props.urlSegs, exploreBy: section }))
        }
      }
    }
  }

  render() {
    const { title, urlSegs } = this.props

    return (
      <div className={styles.secSelector}>
        { title &&
          <div className={styles.title}>{title}</div>
        }
        <div className={styles.btnContainer}>
          <SectionBtn onItemClick={this.changeUrl} exploreBy='Rights' isSelected={urlSegs.exploreBy === 'Rights'}>Explore by Rights</SectionBtn>
          <SectionBtn onItemClick={this.changeUrl} exploreBy='Geography' isSelected={urlSegs.exploreBy === 'Geography'}>Explore by Geography</SectionBtn>
        </div>
      </div>
    )
  }
}

class SectionBtn extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onItemClick: PropTypes.func.isRequired,
    exploreBy: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
  }

  onItemClick = () => {
    this.props.onItemClick(this.props.exploreBy)
  }

  render() {
    const { children, isSelected } = this.props

    const joinedClass = jcn({
      secBtn: true,
      selected: isSelected,
    }, styles)

    return (
      <div className={joinedClass} onClick={this.onItemClick}>{children}</div>
    )
  }
}
