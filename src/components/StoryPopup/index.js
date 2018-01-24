import { connect } from 'react-redux'
import StoryPopup from './StoryPopup'
import { closeStoryMode, urlPush } from '../actions'

const mapStateToProps = (state) => (
  {
    data: state.data,
    urlSegs: state.router.urlSegs,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    closeStoryMode: () => dispatch(closeStoryMode()),
    urlPush: url => dispatch(urlPush(url)),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(StoryPopup)
