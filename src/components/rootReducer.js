import { combineReducers } from 'redux'

import router from './routerReducer'
import topNav from './TopNav/reducer'

export default combineReducers({
  router,
  topNav,
})
