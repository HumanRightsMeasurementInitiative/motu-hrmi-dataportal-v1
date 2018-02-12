import { connect } from 'react-redux'
import ChangeStandard from './ChangeStandard'
import { changeEsrStandard } from '../actions'

const mapStateToProps = (state) => (
  {
    esrStandard: state.esrStandard,
    content: state.content,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    changeEsrStandard: esrStandard => dispatch(changeEsrStandard(esrStandard)),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(ChangeStandard)
