import { connect } from 'react-redux'
import ChangeStandard from './ChangeStandard'
import { changeStandard } from '../actions'

const mapStateToProps = (state) => (
  {
    standard: state.standard,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    changeStandard: standard => dispatch(changeStandard(standard)),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(ChangeStandard)
