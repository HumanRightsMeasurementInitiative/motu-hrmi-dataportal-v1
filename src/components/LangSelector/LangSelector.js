import React from 'react'
import PropTypes from 'prop-types'
import LangOptions from './LangOptions'
import { segsToUrl, joinClassName as jcn } from '../utils'
import styles from './styles.css'

export default class LangSelector extends React.Component {
  static propTypes = {
    urlSegs: PropTypes.object.isRequired,
    urlPush: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = { open: false }
  }

  toggleDropdown = () => {
    this.setState({ open: !this.state.open })
  }

  abbreviator = (language) => {
    switch (language) {
      case 'English':
        return 'EN'
      case 'Spanish':
        return 'ES'
      case 'Portuguese':
        return 'PT'
      case 'French':
        return 'FR'
    }
  }

  changeLanguage = (language) => {
    const langabbr = this.abbreviator(language)
    if (langabbr !== this.props.urlSegs.language) {
      this.props.urlPush(segsToUrl({ ...this.props.urlSegs, language: langabbr }))
    }
    this.toggleDropdown()
  }

  optionList = () => {
    const languages = ['English', 'Spanish', 'Portuguese', 'French']
    return languages.map((item, i) => {
      const optionClassNames = jcn({
        active: this.abbreviator(item) === this.props.urlSegs.language,
        option: true,
      }, styles)
      return <LangOptions key={i} optionClassNames={optionClassNames} onSelect={this.changeLanguage}>{item}</LangOptions>
    })
  }

  render() {
    const { language } = this.props.urlSegs

    const optionsClassNames = jcn({
      'hide': !this.state.open,
      'options': true,
    }, styles)

    return (
      <div className={styles.wrapper}>
        <div onClick={this.toggleDropdown}><span>Language: </span><span className={styles.currentLang}>{language}</span></div>
        <ul className={optionsClassNames}>
          {this.optionList()}
        </ul>
      </div>
    )
  }
}
