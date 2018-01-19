import { connect } from 'react-redux'
import StoryPopup from './StoryPopup'
import { closeStoryMode } from '../actions'

const mapStateToProps = (state) => (
  {
    data: state.data,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    closeStoryMode: () => dispatch(closeStoryMode()),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(StoryPopup)
