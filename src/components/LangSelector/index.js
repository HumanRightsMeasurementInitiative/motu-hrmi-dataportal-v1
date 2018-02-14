import { connect } from 'react-redux'
import LangSelector from './LangSelector'
import { urlPush, languageChange } from '../actions'

const mapStateToProps = (state) => (
  {
    urlSegs: state.router.urlSegs,
    content: state.content,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    urlPush: url => dispatch(urlPush(url)),
    changeLanguage: languageCode => dispatch(languageChange(languageCode)),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(LangSelector)
