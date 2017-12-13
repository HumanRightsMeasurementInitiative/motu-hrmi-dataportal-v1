import { connect } from 'react-redux'
import TopNav from './TopNav'

const mapStateToProps = (state) => (
  {
    popupOpen: state.topNav.popupOpen,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    togglePopup: () => dispatch({ type: 'TOGGLE_POPUP' }),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(TopNav)
