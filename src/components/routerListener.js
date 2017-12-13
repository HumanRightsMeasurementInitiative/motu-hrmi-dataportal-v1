import { locationChange } from './actions'
import { urlToSegs } from './utils'

export default function startListener(history, store) {
  const urlSegs = urlToSegs(history.location.pathname)

  store.dispatch(locationChange({
    pathname: history.location.pathname,
    search: history.location.search,
    hash: history.location.hash,
    urlSegs,
  }))

  history.listen((location) => {
    const urlSegs = urlToSegs(history.location.pathname)
    store.dispatch(locationChange({
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      urlSegs,
    }))
  })
}
