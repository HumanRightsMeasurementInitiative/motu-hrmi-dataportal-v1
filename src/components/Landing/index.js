import { connect } from 'react-redux'
import Landing from './Landing'

const mapStateToProps = (state) => (
  {
    isStoryOpen: state.isStoryOpen,
  }
)

export default connect(mapStateToProps)(Landing)
