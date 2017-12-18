import dataOECD from '../data/data_OECD.json'
import dataCEECA from '../data/data_CEECA.json'
import dataEAP from '../data/data_EAP.json'
import dataLAC from '../data/data_LAC.json'
import dataMENA from '../data/data_MENA.json'
import dataSSA from '../data/data_SSA.json'
import dataCPRP from '../data/data_CPRP.json'

export default function dataReducer(state = {
  OECD: dataOECD,
  CEECA: dataCEECA,
  EAP: dataEAP,
  LAC: dataLAC,
  MENA: dataMENA,
  SSA: dataSSA,
  CPRP: dataCPRP,
}, action) {
  switch (action.type) {
    case 'UPDATE_DATA':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
