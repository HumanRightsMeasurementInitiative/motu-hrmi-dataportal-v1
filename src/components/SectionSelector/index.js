import { connect } from 'react-redux'
import SectionSelector from './SectionSelector'
import { urlPush, closeStoryMode } from '../actions'

const mapStateToProps = (state) => (
  {
    urlSegs: state.router.urlSegs,
    content: state.content,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    urlPush: url => dispatch(urlPush(url)),
    closeStoryMode: () => dispatch(closeStoryMode()),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(SectionSelector)
