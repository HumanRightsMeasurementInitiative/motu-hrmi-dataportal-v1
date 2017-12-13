export const joinClassName = (classNames, styles) => {
  return Object.keys(classNames).filter(key => {
    return classNames[key]
  }).map(className => {
    return styles[className]
  }).join(' ')
}

export const urlToSegs = (url) => {
  const URL_RE = /\/(?:([\w-]+)(?:\/([\w-]+))?)?/
  const [, language = 'EN', exploreBy] = url.match(URL_RE)

  return {
    language,
    exploreBy,
  }
}

export const segsToUrl = (urlSegs) => {
  let url = '/'
  const { language, exploreBy } = urlSegs
  if (language === 'EN') {
    if (exploreBy) {
      url += exploreBy
    }
  } else {
    if (exploreBy) {
      url = '/' + language + '/' + exploreBy
    } else {
      url = '/' + language
    }
  }
  return url
}
