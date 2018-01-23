export default function (state = false, action) {
  switch (action.type) {
    case 'OPEN_STORYMODE':
      return true
    case 'CLOSE_STORYMODE':
      return false
    default:
      return state
  }
}
