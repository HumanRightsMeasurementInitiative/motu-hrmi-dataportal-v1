import { connect } from 'react-redux'
import TopMenu from './TopMenu'

const mapStateToProps = (state) => (
  {
    isStoryOpen: state.isStoryOpen,
    content: state.content,
  }
)

export default connect(mapStateToProps)(TopMenu)
