export const joinClassName = (classNames, styles) => {
  return Object.keys(classNames).filter(key => {
    return classNames[key]
  }).map(className => {
    return styles[className]
  }).join(' ')
}

export const urlToSegs = (url) => {
  const URL_RE = /\/(?:([\w-]+)(?:\/([\w-]+))?)?/
  const segsArr = url.match(URL_RE)
  const langguages = ['ES', 'PT', 'FR']
  if (langguages.indexOf(segsArr[1]) > -1) {
    const [, language, exploreBy] = segsArr
    return {
      language,
      exploreBy,
    }
  } else {
    const [, exploreBy] = segsArr
    return {
      language: 'EN',
      exploreBy,
    }
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
