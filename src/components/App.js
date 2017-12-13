import { connect } from 'react-redux'
import Layout from './Layout'

const mapStateToProps = (state) => (
  {
    router: state.router,
  }
)

export default connect(mapStateToProps)(Layout)
