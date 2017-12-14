import { combineReducers } from 'redux'

import router from './routerReducer'
import topNav from './TopNav/reducer'
import isStoryOpen from './Landing/reducer'

export default combineReducers({
  router,
  topNav,
  isStoryOpen,
})
