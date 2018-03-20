import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import styles from './style.css'
import { sortBy } from 'lodash'

export default class WordCloudChart extends React.Component {
  static propTypes = {
    words: PropTypes.array.isRequired,
  }

  render() {
    const { words, content } = this.props

    const language = content.word_cloud_language
    const abuseWordsToExclude = content.cpr_abuse.keys.map(word => word.toLowerCase())
    const filteredWords = words.filter(item => !abuseWordsToExclude.includes(item[0].toLowerCase()))

    const sortedWords = sortBy(filteredWords, '1').reverse()
    const topWords = sortedWords.slice(0, 10)
    const scale = d3.scaleLinear().domain([0, 1]).range([0.5, 1])

    return (
      <div className={styles.wrapper}>
        {topWords.map(([codeWord, value], i) => (
          <div key={i} className={styles.listItem} style={{ opacity: scale(value), fontSize: scale(value) * 24 }}>
            {translateWordsCloud(codeWord, language)}
          </div>
        ))}
      </div>
    )
  }
}

const EN_WORDS =
  {
    atrisk1: 'Ethnicity',
    atrisk2: 'Race',
    atrisk3: 'Religion',
    atrisk4: 'Nationality',
    atrisk5: 'Cultural Background',
    atrisk6: 'Indigenous Peoples',
    atrisk7: 'Immigrant Status',
    atrisk8: 'Refugees or Asylum Seekers',
    atrisk9: 'Low Social or Economic Status',
    atrisk10: 'Homeless',
    atrisk11: 'Less Educated',
    atrisk12: 'Detainees or suspected criminals',
    atrisk13: 'Political Activity or Affiliation',
    atrisk14: 'Labour unions',
    atrisk15: 'Journalists',
    atrisk16: 'Human Rights Advocates',
    atrisk17: 'Academics',
    atrisk18: 'Professionals',
    atrisk19: 'LGBTQIA+',
    atrisk20: 'Women and/or Girls',
    atrisk21: 'Children',
    atrisk22: 'People with Disabilities',
    atrisk23: 'Geographic Location',
  }
const ES_WORDS =
  {
    atrisk1: 'Etnia',
    atrisk2: 'Raza',
    atrisk3: 'Religión',
    atrisk4: 'Nacionalidad',
    atrisk5: 'Origen cultural',
    atrisk6: 'Indígenas',
    atrisk7: 'Inmigrantes',
    atrisk8: 'Refugiados o solicitantes de asilo',
    atrisk9: 'Personas de baja condición social o económica',
    atrisk10: 'Personas sin hogar',
    atrisk11: 'Personas con menos educación',
    atrisk12: 'Detenidos o acusados de delitos',
    atrisk13: 'Afiliación política',
    atrisk14: 'Sindicatos',
    atrisk15: 'Periodistas',
    atrisk16: 'Defensores de derechos humanos',
    atrisk17: 'Académicos',
    atrisk18: 'Profesionales (como médicos, abogados, banqueros)',
    atrisk19: 'LGBTQIA+',
    atrisk20: 'Mujeres y/o niñas',
    atrisk21: 'Niños en general',
    atrisk22: 'Personas con discapacidad',
    atrisk23: 'Por ubicación geográfica',
  }
const FR_WORDS =
  {
    atrisk1: 'Ethnicité',
    atrisk2: 'Race',
    atrisk3: 'Religion',
    atrisk4: 'Nationalité',
    atrisk5: 'Appartenance culturelle',
    atrisk6: 'Indigènes',
    atrisk7: 'Immigrants',
    atrisk8: 'Réfugiés ou demandeurs d’asile',
    atrisk9: 'Personnes de statut social ou économique peu élevé',
    atrisk10: 'Sans-abri',
    atrisk11: 'Personnes moins éduquées',
    atrisk12: 'Criminels présumés',
    atrisk13: 'Activité ou affiliation politique',
    atrisk14: 'Syndicats',
    atrisk15: 'Journalistes',
    atrisk16: 'Défenseurs des droits de l’homme',
    atrisk17: 'Universitaires',
    atrisk18: 'Professionnels',
    atrisk19: 'LGBTQIA+',
    atrisk20: 'Femmes et/ou enfants',
    atrisk21: 'Enfants',
    atrisk22: 'Personnes souffrant de handicap',
    atrisk23: 'Localisation géographique',
  }
const PT_WORDS =
  {
    atrisk1: 'Etnia',
    atrisk2: 'Raça',
    atrisk3: 'Religião',
    atrisk4: 'Nacionalidade',
    atrisk5: 'Contexto Cultural',
    atrisk6: 'Povo Indígena',
    atrisk7: 'Imigrantes',
    atrisk8: 'Refugiados ou Requerentes de Asilo',
    atrisk9: 'Condição Social ou Condição Económica Baixa',
    atrisk10: 'Sem-Abrigo',
    atrisk11: 'Menos Instruídos',
    atrisk12: 'Detidos ou Acusados de Crimes',
    atrisk13: 'Afiliação Política',
    atrisk14: 'Sindicatos',
    atrisk15: 'Jornalistas',
    atrisk16: 'Defensores dos Direitos Humanos',
    atrisk17: 'Acadêmicos',
    atrisk18: 'Profissionais (ex:. médicos, advogados, banqueiros)',
    atrisk19: 'LGBTQIA+',
    atrisk20: 'Mulheres e/ou Raparigas',
    atrisk21: 'Crianças',
    atrisk22: 'Pessoas com deficiência',
    atrisk23: 'Localização Geográfica',
  }

function translateWordsCloud(codeWord, language) {
  if (!(
    codeWord in EN_WORDS &&
    codeWord in ES_WORDS &&
    codeWord in FR_WORDS &&
    codeWord in PT_WORDS
  )) {
    throw new Error(`WordCloud: Translation not found for ${codeWord}`)
  }
  switch (language) {
    case 'EN':
      return EN_WORDS[codeWord]
    case 'ES':
      return ES_WORDS[codeWord]
    case 'FR':
      return FR_WORDS[codeWord]
    case 'PT':
      return PT_WORDS[codeWord]
  }
}
