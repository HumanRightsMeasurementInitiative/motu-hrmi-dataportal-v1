import { connect } from 'react-redux'
import CountryPage from './CountryPage'
import { urlPush } from '../actions'

const mapStateToProps = (state) => (
  {
    data: state.data,
    urlSegs: state.router.urlSegs,
    esrStandard: state.esrStandard,
    content: state.content,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    urlPush: url => dispatch(urlPush(url)),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(CountryPage)
