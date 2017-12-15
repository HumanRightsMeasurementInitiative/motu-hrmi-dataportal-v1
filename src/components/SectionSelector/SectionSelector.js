import React from 'react'
import PropTypes from 'prop-types'
import { segsToUrl } from '../utils'

export default class DatasetSelector extends React.Component {
  static propTypes = {
    urlSegs: PropTypes.object.isRequired,
    urlPush: PropTypes.func.isRequired,
  }

  changeUrl = (section) => {
    console.log(segsToUrl({ ...this.props.urlSegs, exploreBy: section }))
    this.props.urlPush(segsToUrl({ ...this.props.urlSegs, exploreBy: section }))
  }

  render() {
    return (
      <div>
        <div>Explore all the dataset:</div>
        <div>
          <SectionBtn onItemClick={this.changeUrl} exploreBy='Rights'>Explore by Rights</SectionBtn>
          <SectionBtn onItemClick={this.changeUrl} exploreBy='Geography'>Explore by Geography</SectionBtn>
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
  }

  onItemClick = () => {
    this.props.onItemClick(this.props.exploreBy)
  }

  render() {
    const { children } = this.props

    return (
      <div onClick={this.onItemClick}>{children}</div>
    )
  }
}
