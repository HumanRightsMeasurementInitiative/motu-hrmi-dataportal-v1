import EN from 'data/content-en.json'
import ES from 'data/content-es.json'
import PT from 'data/content-pt.json'
import FR from 'data/content-fr.json'

const content = { EN, ES, PT, FR }

export default function dataReducer(state = EN, action) {
  switch (action.type) {
    case 'CHANGE_LANGUAGE':
      const text = content[action.payload]
      return {
        ...text,
      }
    default:
      return state
  }
}
