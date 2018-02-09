import { connect } from 'react-redux'
import RightsPage from './RightsPage'
import { urlPush } from '../actions'

const mapStateToProps = (state) => (
  {
    data: state.data,
    urlSegs: state.router.urlSegs,
    content: state.content,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    urlPush: url => dispatch(urlPush(url)),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(RightsPage)
