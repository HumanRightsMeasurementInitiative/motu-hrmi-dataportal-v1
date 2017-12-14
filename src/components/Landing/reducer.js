export default function (state = true, action) {
  switch (action.type) {
    case 'CLOSE_STORYMODE':
      return false
    default:
      return state
  }
}
