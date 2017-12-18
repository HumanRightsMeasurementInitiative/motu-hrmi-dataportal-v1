export const joinClassName = (classNames, styles) => {
  return Object.keys(classNames).filter(key => {
    return classNames[key]
  }).map(className => {
    return styles[className]
  }).join(' ')
}

export const urlToSegs = (url) => {
  const URL_RE = /\/(?:([\w-]+)(?:\/([\w-]+)(?:\/([\w-]+)(?:\/([\w-]+)(?:\/([\w-]+))?)?)?)?)?/
  const segsArr = url.match(URL_RE)
  const langguages = ['ES', 'PT', 'FR']
  if (langguages.indexOf(segsArr[1]) > -1) {
    const [, language, exploreBy, region, right, country] = segsArr
    return {
      language,
      exploreBy,
      region,
      right,
      country,
    }
  } else {
    const [, exploreBy, region, right, country] = segsArr
    return {
      language: 'EN',
      exploreBy,
      region,
      right,
      country,
    }
  }
}

export const segsToUrl = (urlSegs) => {
  let url = '/'
  let { language, exploreBy, region, right, country } = urlSegs
  if (language === 'EN') {
    if (exploreBy) {
      region = region || 'OECD'
      if (right) {
        url = '/' + exploreBy + '/' + region + '/' + right + (country ? ('/' + country) : '')
      } else {
        url = '/' + exploreBy + '/' + region + '/' + 'all'
      }
    }
  } else {
    if (exploreBy) {
      region = region || 'OECD'
      if (right) {
        url = '/' + language + '/' + exploreBy + '/' + region + '/' + right + (country ? ('/' + country) : '')
      } else {
        url = '/' + language + '/' + exploreBy + '/' + region + '/' + 'all'
      }
    } else {
      url = '/' + language
    }
  }
  return url
}
