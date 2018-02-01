import React from 'react'
import PropTypes from 'prop-types'
import LangOptions from './LangOptions'
import { segsToUrl, joinClassName as jcn } from '../utils'
import styles from './styles.css'

export default class LangSelector extends React.Component {
  static propTypes = {
    urlSegs: PropTypes.object.isRequired,
    urlPush: PropTypes.func.isRequired,
    changeLanguage: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = { open: false }
  }

  componentDidMount() {
    document.addEventListener('click', this.onClick)
    this.refs.toggleBtn.addEventListener('click', this.toggleDropdown)
    this.refs.options.style.left = this.refs.text.offsetWidth + 'px'
  }

  componentWillUnMount() {
    document.removeEventListener('click', this.onClick)
    this.refs.toggleBtn.removeEventListener('click', this.toggleDropdown)
  }

  onClick = () => {
    if (this.refs.toggleBtn) this.setState({ open: false })
  }

  toggleDropdown = (e) => {
    e.stopPropagation()
    if (this.refs.toggleBtn) this.setState({ open: !this.state.open })
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
      case 'Spanish':
        return 'ES'
      case 'Portuguese':
        return 'PT'
      case 'French':
        return 'FR'
    }
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
        <div className={styles.toggleBtn} ref='toggleBtn' onClick={this.toggleDropdown}><span ref='text'>Language: </span><span className={styles.currentLang}>{language}</span></div>
        <ul className={optionsClassNames} ref='options'>
          {this.optionList()}
        </ul>
      </div>
    )
  }
}
