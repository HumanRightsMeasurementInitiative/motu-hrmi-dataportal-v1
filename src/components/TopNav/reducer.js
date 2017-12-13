export default function (state = { popupOpen: false }, action) {
  switch (action.type) {
    case 'TOGGLE_POPUP':
      const open = state.popupOpen
      return {
        ...state,
        popupOpen: !open,
      }
    default:
      return state
  }
}
