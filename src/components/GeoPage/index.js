import { connect } from 'react-redux'
import GeoPage from './GeoPage'
import { urlPush } from '../actions'

const mapStateToProps = (state) => (
  {
    data: state.data,
    urlSegs: state.router.urlSegs,
    esrStandard: state.esrStandard,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    urlPush: url => dispatch(urlPush(url)),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(GeoPage)
