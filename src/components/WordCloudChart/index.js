import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import styles from './style.css'

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
    'Activités politiques non-violente',
    'Activités politiques violente',
    'Groupes victimes de discriminatio',
    'Non discriminé',
    'Ethnicité',
    'Rac',
    'Religio',
    'Nationalité',
    'Appartenance culturelle',
    'Indigène',
    'Immigrant',
    'Réfugiés ou demandeurs d’asil',
    'Personnes de statut social ou économique peu élevé',
    'Sans-abr',
    'Personnes moins éduquée',
    'Criminels présumé',
    'Activité ou affiliation politiques',
    'Syndicat',
    'Journaliste',
    'Défenseurs des droits de l’homm',
    'Universitaire',
    'Professionnel',
    'LGBTQIA+',
    'Femmes et/ou enfant',
    'Enfant',
    'Personnes souffrant de handica',
    'Localisation géographiqu',
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

const indexOfEnglishWord = word => EN_WORDS.indexOf(word)

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
//    const abuseKeys = ['suspected criminals', 'non-violent political', 'violent political', 'discriminated groups', 'indiscriminate']
