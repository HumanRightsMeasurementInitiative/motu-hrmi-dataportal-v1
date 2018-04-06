import rightsDefinitions from 'data/rights-definitions.json'
import { RIGHTS_ORDER } from 'lib/constants'
const DEFAULT_REGION = 'cpr-pilot'

export const getRightsData = (rights, esrStandard) => {
  const { esrHI, esrCore, cpr } = rights
  const rightsData = RIGHTS_ORDER.map(rightCode => {
    const { type } = rightsDefinitions[rightCode]
    const NO_DATA = null
    if (type === 'ESR' && esrStandard === 'esrHI') {
      if (!esrHI) return NO_DATA
      if (esrHI[rightCode] === null) return NO_DATA
      return esrHI[rightCode] / 100
    } else if (type === 'ESR' && esrStandard === 'esrCore') {
      if (!esrCore) return NO_DATA
      if (esrCore[rightCode] === null) return NO_DATA
      return esrCore[rightCode] / 100
    } else if (type === 'CPR') {
      if (!cpr || !cpr[rightCode]) return NO_DATA
      if (cpr[rightCode] === null || cpr[rightCode].mean === null) return NO_DATA
      return cpr[rightCode].mean / 10
    }
    throw new Error(`Right '${rightCode}' with no type! Check rightDefinitions`)
  })
  return rightsData
}

export const isRightIndexAnESR = (i) => {
  return [0, 1, 2, 10, 11].includes(i)
}

export const displayRightValue = (rightData, rightIndex) => {
  const val = rightData[rightIndex]
  if (val === null) return 'N/A'

  const isPercent = isRightIndexAnESR(rightIndex)

  if (isPercent) {
    return (val * 100).toFixed(0) + '%'
  } else {
    return (val * 10).toFixed(1) + '/10'
  }
}

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
      right,
      language,
      exploreBy,
      region,
      country,
    }
  } else {
    const [, exploreBy, region, right, country] = segsArr
    return {
      right,
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
        url = '/' + exploreBy + '/' + region + '/' + right + (country ? ('/' + country) : '') + '/'
      } else {
        url = '/' + exploreBy + '/' + region + '/' + 'all' + '/'
      }
    }
  } else {
    if (exploreBy) {
      region = region || DEFAULT_REGION
      if (right) {
        url = '/' + language + '/' + exploreBy + '/' + region + '/' + right + (country ? ('/' + country) : '') + '/'
      } else {
        url = '/' + language + '/' + exploreBy + '/' + region + '/' + 'all' + '/'
      }
    } else {
      url = '/' + language + '/'
    }
  }
  return url
}

export const getRegionName = (regionCode) => (regionCode)
