export default function (state = { currentDropdown: 'closed' }, action) {
  switch (action.type) {
    case 'UPDATE_DROPDOWN':
      return {
        ...state,
        currentDropdown: action.payload,
      }
    default:
      return state
  }
}
