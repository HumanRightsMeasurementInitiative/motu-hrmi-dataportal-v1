import { combineReducers } from 'redux'

import router from './routerReducer'
import topNav from './TopNav/reducer'
import isStoryOpen from './Landing/reducer'
import data from './dataReducer'

export default combineReducers({
  router,
  topNav,
  isStoryOpen,
  data,
})
