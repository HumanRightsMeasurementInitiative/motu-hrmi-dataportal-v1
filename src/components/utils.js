const DEFAULT_REGION = 'oecd'

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
  const languages = ['ES', 'PT', 'FR']
  if (languages.indexOf(segsArr[1]) > -1) {
    const [, language, exploreBy, region, right, country] = segsArr
    return {
      right: right && right.replace(/-/g, ' '),
      language,
      exploreBy,
      region,
      country,
    }
  } else {
    const [, exploreBy, region, right, country] = segsArr
    return {
      right: right && right.replace(/-/g, ' '),
      language: 'EN',
      exploreBy,
      region,
      country,
    }
  }
}

export const segsToUrl = (urlSegs) => {
  let url = '/'
  let { language, exploreBy, region, right, country } = urlSegs
  if (language === 'EN') {
    if (exploreBy) {
      region = region || DEFAULT_REGION
      if (right) {
        url = '/' + exploreBy + '/' + region + '/' + right.replace(/\s/g, '-') + (country ? ('/' + country) : '')
      } else {
        url = '/' + exploreBy + '/' + region + '/' + 'all'
      }
    }
  } else {
    if (exploreBy) {
      region = region || DEFAULT_REGION
      if (right) {
        url = '/' + language + '/' + exploreBy + '/' + region + '/' + right.replace(/\s/g, '-') + (country ? ('/' + country) : '')
      } else {
        url = '/' + language + '/' + exploreBy + '/' + region + '/' + 'all'
      }
    } else {
      url = '/' + language
    }
  }
  return url
}

export const getRegionName = (regionCode) => (regionCode)
