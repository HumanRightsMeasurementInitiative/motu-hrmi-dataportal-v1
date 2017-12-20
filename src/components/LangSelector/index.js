import { connect } from 'react-redux'
import LangSelector from './LangSelector'
import { urlPush, updateDropdown } from '../actions'

const mapStateToProps = (state) => (
  {
    urlSegs: state.router.urlSegs,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    urlPush: url => dispatch(urlPush(url)),
    updateDropdown: clickedMenu => dispatch(updateDropdown(clickedMenu)),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(LangSelector)
