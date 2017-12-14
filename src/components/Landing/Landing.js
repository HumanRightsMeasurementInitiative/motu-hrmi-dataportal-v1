import React from 'react'
import PropTypes from 'prop-types'
import StoryPopup from '../StoryPopup'

export default class Landing extends React.Component {
  static propTypes = {
    isStoryOpen: PropTypes.bool.isRequired,
  }

  render() {
    const { isStoryOpen } = this.props
    return (
      <div>
        <div>Explore all the dataset:</div>
        <div>Expore by Rights , Explore by Geography</div>
        { isStoryOpen &&
          <StoryPopup />
        }
      </div>
    )
  }
}
