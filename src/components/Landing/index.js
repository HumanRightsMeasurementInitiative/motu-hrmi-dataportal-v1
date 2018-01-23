import { connect } from 'react-redux'
import Landing from './Landing'
import { openStoryMode } from '../actions'

const mapStateToProps = (state) => (
  {
    isStoryOpen: state.isStoryOpen,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    openStoryMode: () => dispatch(openStoryMode()),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
