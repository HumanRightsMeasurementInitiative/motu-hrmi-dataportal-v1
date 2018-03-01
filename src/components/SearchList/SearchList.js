import React from 'react'
import PropTypes from 'prop-types'
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

    const countries = content.countries.filter(country => {
      return country.name.toLowerCase().search(this.state.searchText.toLowerCase()) !== -1
    })

    const countryDropdown = jcn({
      countryDropdown: true,
      hide: countries.length === 0 || this.state.searchText === '',
    }, styles)

    return (
      <div>
        <div className={styles.searchInputWrapper}>
          <input ref='searchInput'
            className={styles.searchInput}
            type="text"
            placeholder={content.search_country}
            onChange={this.searchCountry}
          />
        </div>
        <ul className={countryDropdown}>
          {
            countries.map((country, i) => (
              <CountryItem key={i}
                code={country.code}
                rightsByRegion={data.rightsByRegion}
                urlPush={urlPush}
                urlSegs={urlSegs}
                resetText={this.resetText}
              >
                {country.name}
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
    const { children, code, rightsByRegion, urlPush, urlSegs, resetText } = this.props
    const checkCountry = region => rightsByRegion[region].countries.some(country => country.countryName === children)
    const region = Object.keys(rightsByRegion).filter((region, i) => checkCountry(region))[0]
    urlPush(segsToUrl({ ...urlSegs, region: region, country: urlSegs.country && code }))
    resetText()
  }

  render() {
    const { children } = this.props
    return (
      <li className={styles.listItem} onClick={this.onItemClick}>{children}</li>
    )
  }
}
