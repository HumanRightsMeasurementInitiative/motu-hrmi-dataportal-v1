import { connect } from 'react-redux'
import TopMenu from './TopMenu'

const mapStateToProps = (state) => (
  {
    isStoryOpen: state.isStoryOpen,
  }
)

export default connect(mapStateToProps)(TopMenu)
