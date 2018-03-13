import React from 'react'
import PropTypes from 'prop-types'
import { segsToUrl, joinClassName as jcn } from '../utils'
import styles from './style.css'

export default class SectionSelector extends React.Component {
  static propTypes = {
    urlSegs: PropTypes.object.isRequired,
    urlPush: PropTypes.func.isRequired,
    content: PropTypes.object.isRequired,
    title: PropTypes.string,
    isStoryMode: PropTypes.bool,
  }

  changeUrl = (section) => {
    this.props.closeStoryMode()
    if (section === 'Geography') {
      this.props.urlPush(segsToUrl({ ...this.props.urlSegs, exploreBy: section, right: 'all', country: undefined }))
    } else if (this.props.urlSegs.right === 'all' || this.props.urlSegs.right === undefined) {
      this.props.urlPush(segsToUrl({ ...this.props.urlSegs, exploreBy: section, right: 'food', country: undefined }))
    } else {
      this.props.urlPush(segsToUrl({ ...this.props.urlSegs, exploreBy: section, country: undefined }))
    }
  }

  render() {
    const { title, urlSegs, content, isStoryMode } = this.props

    return (
      <div className={styles.secSelector}>
        <div className={styles.btnContainer}>
          <SectionBtn onItemClick={this.changeUrl} exploreBy='Rights' isSelected={urlSegs.exploreBy === 'Rights'} isStoryMode={isStoryMode}>{content.section.section_name[0]}</SectionBtn>
          <SectionBtn onItemClick={this.changeUrl} exploreBy='Geography' isSelected={urlSegs.exploreBy === 'Geography'} isStoryMode={isStoryMode}>{content.section.section_name[1]}</SectionBtn>
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
    isStoryMode: PropTypes.bool,
  }

  onItemClick = () => {
    this.props.onItemClick(this.props.exploreBy)
  }

  render() {
    const { children, isSelected, isStoryMode } = this.props

    const joinedClass = jcn({
      secBtn: true,
      selected: isSelected,
      zeroMargin: isStoryMode,
    }, styles)

    return (
      <div className={joinedClass} onClick={this.onItemClick}>{children}</div>
    )
  }
}
