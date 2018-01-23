import { combineReducers } from 'redux'

import router from './routerReducer'
import isStoryOpen from './Landing/reducer'
import data from './dataReducer'

export default combineReducers({
  router,
  isStoryOpen,
  data,
})
