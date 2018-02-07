export default function standardStandard(state = 'High income OECD', action) {
  switch (action.type) {
    case 'CHANGE_STANDARD':
      return action.payload
    default:
      return state
  }
}
