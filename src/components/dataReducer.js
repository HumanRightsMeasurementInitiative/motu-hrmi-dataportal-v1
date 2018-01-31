import rightsByCountry from 'data/rights-by-country.json'
import categories from 'data/country-categories.json'
import { keyBy } from 'lodash'

const rightsByRegion = keyBy(Object.keys(categories).map(regionCode => ({
  regionCode,
  countries: categories[regionCode].map(countryCode => rightsByCountry[countryCode]),
})), 'regionCode')

export default function dataReducer(state = { rightsByCountry, rightsByRegion }, action) {
  switch (action.type) {
    default:
      return state
  }
}
