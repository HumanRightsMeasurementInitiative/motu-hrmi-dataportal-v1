const defaultStandard = 'esrCore'

export default function standardReducer(state = defaultStandard, action) {
  switch (action.type) {
    case 'CHANGE_STANDARD':
      const esrStandard = action.payload
      if (!['esrHI', 'esrCore'].includes(esrStandard)) {
        throw new Error(`OECD Standard code "${esrStandard}" not recognized! Possible values: ['esrHI', 'esrCore']`)
      }
      return esrStandard
    default:
      return state
  }
}
