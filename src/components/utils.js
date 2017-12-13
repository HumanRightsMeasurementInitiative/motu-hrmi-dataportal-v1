export const joinClassName = (classNames, styles) => {
  return Object.keys(classNames).filter(key => {
    return classNames[key]
  }).map(className => {
    return styles[className]
  }).join(' ')
}

export const urlToSegs = (url) => {
  const URL_RE = /\/(?:([\w-]+)(?:\/([\w-]+))?)?/
  const [, language, exploreBy ] = url.match(URL_RE)

  return {
    language,
    exploreBy,
  }
}

export const segsToUrl = (urlSegs) => {
  let url = '/'
  return url
}
