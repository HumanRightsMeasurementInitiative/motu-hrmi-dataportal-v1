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
      right: right.replace(/-/g, ' '),
      language,
      exploreBy,
      region,
      country,
    }
  } else {
    const [, exploreBy, region, right, country] = segsArr
    return {
      right: right.replace(/-/g, ' '),
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
      region = region || 'OECD'
      if (right) {
        url = '/' + exploreBy + '/' + region + '/' + right.replace(/\s/g, '-') + (country ? ('/' + country) : '')
      } else {
        url = '/' + exploreBy + '/' + region + '/' + 'all'
      }
    }
  } else {
    if (exploreBy) {
      region = region || 'OECD'
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

const regionNametoCode = {
  'High Income OECD Countries': 'OECD',
  'Central and Eastern Europe and Central Asia': 'CEECA',
  'East Asia and the Pacific': 'EAP',
  'Latin America and the Caribbean': 'LAC',
  'Middle East and Northern Africa': 'MENA',
  'Sub-Saharan Africa': 'SSA',
  'Civil and Political Rights Pilot Countries': 'CPRP',
}

const regionCodetoName = {
  OECD: 'High Income OECD Countries',
  CEECA: 'Central and Eastern Europe and Central Asia',
  EAP: 'East Asia and the Pacific',
  LAC: 'Latin America and the Caribbean',
  MENA: 'Middle East and Northern Africa',
  SSA: 'Sub-Saharan Africa',
  CPRP: 'Civil and Political Rights Pilot Countries',
}

export const getRegionName = (regionCode) => (regionCodetoName[regionCode])

export const getRegionCode = (regionName) => (regionNametoCode[regionName])
