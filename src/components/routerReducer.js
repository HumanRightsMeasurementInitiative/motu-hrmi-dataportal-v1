export default function routerReducer(state = {
  pathname: '/',
  search: '',
  hash: '',
  urlSegs: {},
}, action) {
  switch (action.type) {
    case 'ROUTER/LOCATION_CHANGE':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
