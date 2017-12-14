export const urlPush = (url) => ({
  type: 'ROUTER/PUSH',
  payload: url,
})

export const urlReplace = (url) => ({
  type: 'ROUTER/REPLACE',
  payload: url,
})

export const urlGo = (index) => ({
  type: 'ROUTER/GO',
  payload: index,
})

export const urlGoBack = () => ({
  type: 'ROUTER/GO_BACK',
})

export const urlGoForward = () => ({
  type: 'ROUTER/GO_FORWARD',
})

export const locationChange = ({ pathname, search, hash, urlSegs }) => ({
  type: 'ROUTER/LOCATION_CHANGE',
  payload: {
    pathname,
    search,
    hash,
    urlSegs,
  },
})

export const updateDropdown = (clickedMenu) => ({
  type: 'UPDATE_DROPDOWN',
  payload: clickedMenu,
})

export const closeStoryMode = () => ({
  type: 'CLOSE_STORYMODE',
})
