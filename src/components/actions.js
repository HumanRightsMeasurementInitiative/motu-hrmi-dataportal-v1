export const locationChange = ({ pathname, search, hash, urlSegs }) => ({
  type: 'ROUTER/LOCATION_CHANGE',
  payload: {
    pathname,
    search,
    hash,
    urlSegs,
  },
})
