import React from 'react'
import PropTypes from 'prop-types'
import LangOptions from './LangOptions'
import { segsToUrl, joinClassName as jcn } from '../utils'
import styles from './styles.css'

export default class LangSelector extends React.Component {
  static propTypes = {
    content: PropTypes.object.isRequired,
    urlSegs: PropTypes.object.isRequired,
    urlPush: PropTypes.func.isRequired,
    changeLanguage: PropTypes.func.isRequired,
    withArrow: PropTypes.bool,
  }

  constructor() {
    super()
    this.state = { isOpen: false }
  }

  componentDidMount() {
    document.addEventListener('click', this.documentClick)
  }

  componentWillUnMount() {
    document.removeEventListener('click', this.documentClick)
  }

  documentClick = (e) => {
    const { languageWrapper } = this.refs
    if (languageWrapper && languageWrapper.contains(e.target)) return
    this.setState({ isOpen: false })
  }

  toggleDropdown = (e) => {
    e.stopPropagation()
    this.setState({ isOpen: !this.state.isOpen })
  }

  changeLanguage = (language, e) => {
    const langabbr = this.abbreviator(language)
    const { urlPush, changeLanguage } = this.props
    if (langabbr !== this.props.urlSegs.language) {
      urlPush(segsToUrl({ ...this.props.urlSegs, language: langabbr }))
      changeLanguage(langabbr)
    }
    this.toggleDropdown(e)
  }

  abbreviator = (language) => {
    switch (language) {
      case 'English':
        return 'EN'
      case 'Español':
        return 'ES'
      case 'Português':
        return 'PT'
      case 'Français':
        return 'FR'
    }
  }

  optionList = () => {
    const languages = ['English', 'Español', 'Português', 'Français']
    return languages.map((item, i) => {
      const optionClassNames = jcn({
        active: this.abbreviator(item) === this.props.urlSegs.language,
        option: true,
      }, styles)
      return <LangOptions key={i} optionClassNames={optionClassNames} onSelect={this.changeLanguage}>{item}</LangOptions>
    })
  }

  render() {
    const { withArrow, content } = this.props
    const { language } = this.props.urlSegs

    const optionsClassNames = jcn({
      'hide': !this.state.isOpen,
      'options': true,
    }, styles)

    return (
      <div className={styles.wrapper} ref='languageWrapper'>
        <div className={styles.toggleBtn} onClick={this.toggleDropdown} style={{ paddingRight: withArrow ? '16px' : '0px' }}><span>{content.lang}: </span><span className={styles.currentLang}>{language}</span></div>
        <ul className={optionsClassNames}>
          {this.optionList()}
        </ul>
      </div>
    )
  }
}
