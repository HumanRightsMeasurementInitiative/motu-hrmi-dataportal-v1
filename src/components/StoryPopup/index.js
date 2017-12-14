import { connect } from 'react-redux'
import StoryPopup from './StoryPopup'
import { closeStoryMode } from '../actions'

const mapDispatchToProps = (dispatch) => (
  {
    closeStoryMode: () => dispatch(closeStoryMode()),
  }
)

export default connect(null, mapDispatchToProps)(StoryPopup)
