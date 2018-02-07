import { combineReducers } from 'redux'

import router from './routerReducer'
import isStoryOpen from './Landing/reducer'
import data from './dataReducer'
import content from './LangSelector/reducer'
import esrStandard from './ChangeStandard/reducer'

export default combineReducers({
  router,
  isStoryOpen,
  data,
  content,
  esrStandard,
})
