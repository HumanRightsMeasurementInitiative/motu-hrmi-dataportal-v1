import React from 'react'
import PropTypes from 'prop-types'
import SearchIcon from '../SearchIcon'
import { segsToUrl, joinClassName as jcn } from '../utils'
import styles from './style.css'

export default class SearchList extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired,
    urlPush: PropTypes.func.isRequired,
    urlSegs: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.state = {
      searchText: '',
    }
  }

  searchCountry = (e) => {
    this.setState({ searchText: e.target.value })
  }

  resetText = () => {
    this.refs.searchInput.value = ''
    this.setState({ searchText: '' })
  }

  render() {
    const { data, content, urlPush, urlSegs } = this.props

    const countryCodes = Object.keys(content.countries).filter(countryCode => {
      return content.countries[countryCode].toLowerCase().search(this.state.searchText.toLowerCase()) !== -1
    })

    const countryDropdown = jcn({
      countryDropdown: true,
      hide: countryCodes.length === 0 || this.state.searchText === '',
    }, styles)

    return (
      <div>
        <div className={styles.searchInputWrapper}>
          <div className={styles.searchIcon}><SearchIcon /></div>
          <input ref='searchInput'
            className={styles.searchInput}
            type="text"
            placeholder={content.search_country}
            onChange={this.searchCountry}
          />
        </div>
        <ul className={countryDropdown}>
          {
            countryCodes.map((countryCode, i) => (
              <CountryItem key={i}
                code={countryCode}
                rightsByRegion={data.rightsByRegion}
                urlPush={urlPush}
                urlSegs={urlSegs}
                resetText={this.resetText}
              >
                {content.countries[countryCode]}
              </CountryItem>
            ))
          }
        </ul>
      </div>
    )
  }
}

class CountryItem extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    code: PropTypes.string.isRequired,
    rightsByRegion: PropTypes.object.isRequired,
    urlPush: PropTypes.func.isRequired,
    urlSegs: PropTypes.object.isRequired,
    resetText: PropTypes.func.isRequired,
  }

  onItemClick = () => {
    const { code, rightsByRegion, urlPush, urlSegs, resetText } = this.props
    const checkCountry = region => rightsByRegion[region].countries.some(country => country.countryCode === code)
    const region = Object.keys(rightsByRegion).filter((region, i) => checkCountry(region))[0]
    urlPush(segsToUrl({ ...urlSegs, exploreBy: 'Geography', right: 'all', region: region, country: code }))
    resetText()
  }

  render() {
    const { children } = this.props
    return (
      <li className={styles.listItem} onClick={this.onItemClick}>{children}</li>
    )
  }
}
