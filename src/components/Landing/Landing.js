import React from 'react'
import PropTypes from 'prop-types'
import StoryPopup from '../StoryPopup'
import SectionSelector from '../SectionSelector'

export default class Landing extends React.Component {
  static propTypes = {
    isStoryOpen: PropTypes.bool.isRequired,
  }

  render() {
    const { isStoryOpen } = this.props
    return (
      <div>
        <SectionSelector />
        { isStoryOpen &&
          <StoryPopup />
        }
      </div>
    )
  }
}
