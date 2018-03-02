import { connect } from 'react-redux'
import SmallScreenAlert from './SmallScreenAlert'

const mapStateToProps = (state) => (
  {
    content: state.content,
  }
)

export default connect(mapStateToProps)(SmallScreenAlert)
