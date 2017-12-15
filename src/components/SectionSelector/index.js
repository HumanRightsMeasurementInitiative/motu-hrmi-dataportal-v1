import { connect } from 'react-redux'
import SectionSelector from './SectionSelector'
import { urlPush } from '../actions'

const mapStateToProps = (state) => (
  {
    urlSegs: state.router.urlSegs,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    urlPush: url => dispatch(urlPush(url)),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(SectionSelector)
