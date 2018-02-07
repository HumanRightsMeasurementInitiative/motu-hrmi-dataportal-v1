import { combineReducers } from 'redux'

import router from './routerReducer'
import isStoryOpen from './Landing/reducer'
import data from './dataReducer'
import content from './LangSelector/reducer'
import standard from './ChangeStandard/reducer'

export default combineReducers({
  router,
  isStoryOpen,
  data,
  content,
  standard,
})
