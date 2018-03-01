import { connect } from 'react-redux'
import SearchList from './SearchList'
import { urlPush } from '../actions'

const mapStateToProps = (state) => (
  {
    urlSegs: state.router.urlSegs,
    data: state.data,
    content: state.content,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    urlPush: url => dispatch(urlPush(url)),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(SearchList)
