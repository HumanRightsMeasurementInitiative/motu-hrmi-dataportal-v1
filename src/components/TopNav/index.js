import { connect } from 'react-redux'
import TopNav from './TopNav'
import { openStoryMode } from '../actions'

const mapDispatchToProps = (dispatch) => (
  {
    openStoryMode: () => dispatch(openStoryMode()),
  }
)

export default connect(null, mapDispatchToProps)(TopNav)
