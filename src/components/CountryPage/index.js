import { connect } from 'react-redux'
import CountryPage from './CountryPage'
import { urlPush, closeStoryMode } from '../actions'

const mapStateToProps = (state) => (
  {
    data: state.data,
    urlSegs: state.router.urlSegs,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    urlPush: url => dispatch(urlPush(url)),
    closeStoryMode: () => dispatch(closeStoryMode()),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(CountryPage)
