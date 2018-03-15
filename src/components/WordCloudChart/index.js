import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import styles from './style.css'

export default class WordCloudChart extends React.Component {
  static propTypes = {
    words: PropTypes.array.isRequired,
  }

  render() {
    const { words, content } = this.props
    const sort = (a, b) => (b[1] - a[1])

    const language = content.word_cloud_language
    const abuseKeys = content.cpr_abuse.keys

    let sortedWords = words.filter(item => abuseKeys.indexOf(item[0].toLowerCase()) === -1)
    sortedWords = sortedWords.slice().sort(sort).slice(0, 10)

    const scale = d3.scaleLinear().domain([0, 1]).range([0.5, 1])

    return (
      <div className={styles.wrapper}>
        {
          sortedWords.map((item, i) => (
            <div key={i} className={styles.listItem} style={{ opacity: scale(item[1]), fontSize: scale(item[1]) * 24 }}>
              {language === 'EN' ? item[0] : translateWordsCloud(indexOfEnglishWord(item[0]), language)}
            </div>
          ))
        }
      </div>
    )
  }
}

const EN_WORDS =
  [
    'Suspected Criminal',
    'Non-Violent Political',
    'Violent Political',
    'Discriminated Groups',
    'Indiscriminate',
    'Ethnicity',
    'Race',
    'Reliigon',
    'Nationality',
    'Cultural Background',
    'Indigenous Peoples',
    'Immigrant Status',
    'Refugees or Asylum Seekers',
    'Low Social or Economic Status',
    'Homeless',
    'Less Educated',
    'Detainees or those accused of crimes',
    'Political Activity or Affiliation',
    'Detidos ou Acusados de Crimes',
    'Journalists',
    'Human Rights Advocates',
    'Academics',
    'Professionals',
    'LGBTQIA+',
    'Women and/or Girls',
    'Children',
    'People with Disabilities',
    'Geographic Location<Paste>',
  ]
const ES_WORDS =
  [
    'Presuntos criminales',
    'Actividad política no violenta',
    'Actividad política violenta',
    'Grupos discriminados',
    'Indiscriminado',
    'Etnia',
    'Raza',
    'Religión',
    'Nacionalidad',
    'Origen cultural',
    'Indígenas',
    'Inmigrantes',
    'Refugiados o solicitantes de asilo',
    'Personas de baja condición social o económica',
    'Personas sin hogar',
    'Personas con menos educación',
    'Detenidos o acusados de delitos',
    'Afiliación política',
    'Sindicatos',
    'Periodistas',
    'Defensores de derechos humanos',
    'Académicos',
    'Profesionales (como médicos, abogados, banqueros)',
    'LGBTQIA+',
    'Mujeres y/o niñas',
    'Niños en general',
    'Personas con discapacidad',
    'Por ubicación geográfica',
  ]
const FR_WORDS =
  [
    'Criminel présumé',
    'Activités politiques non-violentes',
    'Activités politiques violentes',
    'Groupes victimes de discrimination',
    'Non discriminé',
    'Ethnicité',
    'Race',
    'Religion',
    'Nationalité',
    'Appartenance culturelle',
    'Indigènes',
    'Immigrants',
    'Réfugiés ou demandeurs d’asile',
    'Personnes de statut social ou économique peu élevé',
    'Sans-abri',
    'Personnes moins éduquées',
    'Criminels présumés',
    'Activité ou affiliation politique',
    'Syndicats',
    'Journalistes',
    'Défenseurs des droits de l’homme',
    'Universitaires',
    'Professionnels',
    'LGBTQIA+',
    'Femmes et/ou enfants',
    'Enfants',
    'Personnes souffrant de handicap',
    'Localisation géographique',
  ]
const PT_WORDS =
  [
    'Criminosos suspeitos',
    'Atividade política não-violenta',
    'Atividade política violenta',
    'Grupos discriminados',
    'Indiscriminado',
    'Etnia',
    'Raça',
    'Religião',
    'Nacionalidade',
    'Contexto Cultural',
    'Povo Indígena',
    'Imigrantes',
    'Refugiados ou Requerentes de Asilo',
    'Condição Social ou Condição Económica Baixa',
    'Sem-Abrigo',
    'Menos Instruídos',
    'Detidos ou Acusados de Crimes',
    'Afiliação Política',
    'Sindicatos',
    'Jornalistas',
    'Defensores dos Direitos Humanos',
    'Acadêmicos',
    'Profissionais (ex:. médicos, advogados, banqueiros)',
    'LGBTQIA+',
    'Mulheres e/ou Raparigas',
    'Crianças',
    'Pessoas com deficiência',
    'Localização Geográfica',
  ]

function indexOfEnglishWord(word) {
  return EN_WORDS.indexOf(word)
}

function translateWordsCloud(indexOfWord, language) {
  switch (language) {
    case 'ES':
      return ES_WORDS[indexOfWord]
    case 'FR':
      return FR_WORDS[indexOfWord]
    case 'PT':
      return PT_WORDS[indexOfWord]
  }
}
