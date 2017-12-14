import { connect } from 'react-redux'
import TopNav from './TopNav'
import { updateDropdown } from '../actions.js'

const mapStateToProps = (state) => (
  {
    currentDropdown: state.topNav.currentDropdown,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    updateDropdown: clickedMenu => dispatch(updateDropdown(clickedMenu)),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(TopNav)
