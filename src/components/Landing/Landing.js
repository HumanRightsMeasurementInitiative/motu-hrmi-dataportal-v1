import React from 'react'
import PropTypes from 'prop-types'
import StoryPopup from '../StoryPopup'
import SectionSelector from '../SectionSelector'
import styles from './style.css'

const PDF_LANGS = [
  'https://humanrightsmeasurement.org/wp-content/uploads/2018/03/Australia-profile-EN.pdf',
  'https://humanrightsmeasurement.org/wp-content/uploads/2018/03/Australia-profile-ES.pdf',
  'https://humanrightsmeasurement.org/wp-content/uploads/2018/03/Australia-profile-FR.pdf',
  'https://humanrightsmeasurement.org/wp-content/uploads/2018/03/Australia-profile-PT.pdf',
]

function selectPdf(lang) {
  switch (lang) {
    case 'EN':
      return PDF_LANGS[0]
    case 'ES':
      return PDF_LANGS[1]
    case 'FR':
      return PDF_LANGS[2]
    case 'PT':
      return PDF_LANGS[3]
  }
}

export default class Landing extends React.Component {
  static propTypes = {
    isStoryOpen: PropTypes.bool.isRequired,
    openStoryMode: PropTypes.func.isRequired,
    content: PropTypes.object.isRequired,
  }

  render() {
    function makeHTMLParagraph(text, i) {
      const cleanedText = text.replace(`<a `, `<a target="_blank" rel="noopener noreferrer"`)
      return <p key={i} className={styles.normalText} dangerouslySetInnerHTML={{ __html: cleanedText }} />
    }
    const { isStoryOpen, content, openStoryMode } = this.props

    return (
      <div className={styles.landing}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>{content.section.title.map(makeHTMLParagraph)}</h1>
          <h3 className={styles.subTitle}>{content.section.subtitle}</h3>
        </div>

        <SectionSelector />

        <div className={styles.profileStoryWrapper}>
          <div className={styles.paragraphsWrapper}>
            <p>{content.section.paragraphs[0]}</p>
            <p>{content.section.paragraphs[1]}</p>
          </div>
          <a className={styles.countryUnderlined} onClick={openStoryMode}>{content.section.country[0]}</a>
          {` or `}
          <a className={styles.countryUnderlined} href={selectPdf(content.word_cloud_language)} target="_blank">{content.section.country[1]}</a>
        </div>
        { isStoryOpen &&
          <StoryPopup />
        }
      </div>
    )
  }
}
