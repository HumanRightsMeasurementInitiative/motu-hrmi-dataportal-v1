import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { flatMap, omitBy, mapKeys, mapValues } from 'lodash'
import { csvFormat } from 'd3'
import fileSaver from 'file-saver'
import DownloadIcon from '../DownloadIcon'
import { joinClassName as jcn } from '../utils'
import styles from './style.css'

function countryDataTabular(data, countryCode) {
  const rights = data.rightsByCountry[countryCode].rights
  const { esrCore, esrHI, cpr } = rights
  const tabularESR = {
    ...mapKeys(omitBy(esrCore, (v, k) => k.endsWith('_sub')), (v, k) => `${k}_core`),
    ...mapKeys(omitBy(esrHI, (v, k) => k.endsWith('_sub')), (v, k) => `${k}_high_income`),
  }
  const tabularCPR = mapValues(cpr || {}, v => v.mean)
  const tabularData = [
    { country_code: countryCode, ...tabularESR, ...tabularCPR },
  ]
  return tabularData
}

function downloadFileWithContent(fileName, content) {
  const blob = new window.Blob([content], { type: 'text/plain;charset=utf-8' })
  fileSaver.saveAs(blob, fileName)
}

class DownloadPopup extends React.Component {
  static propTypes = {
    itemList: PropTypes.array.isRequired,
    content: PropTypes.object.isRequired,
    urlSegs: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.state = { isOpen: false }
  }

  componentDidMount() {
    document.addEventListener('click', this.documentClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.documentClick)
  }

  documentClick = (e) => {
    if (this.refs.downloadPopup.contains(e.target)) return
    this.setState({ isOpen: false })
  }

  togglePopup = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  downloadRadarChart = () => {
    this.togglePopup()
    const { urlSegs } = this.props
    window.alert('Not yet implemented.', urlSegs)
  }

  downloadBarChart = () => {
    this.togglePopup()
    const { urlSegs } = this.props
    window.alert('Not yet implemented.', urlSegs)
  }

  downloadLineChart = () => {
    this.togglePopup()
    const { urlSegs } = this.props
    window.alert('Not yet implemented.', urlSegs)
  }

  downloadCsv = () => {
    this.togglePopup()
    const { urlSegs, data } = this.props
    const {
      exploreBy,
      right: currentRight,
      country: currentCountryCode,
      region: currentRegion,
    } = urlSegs

    if (exploreBy === 'Geography') {
      if (currentCountryCode) {
        // Download country data
        const tabularData = countryDataTabular(data, currentCountryCode)
        const csv = csvFormat(tabularData)
        const fileName = `HRMIData_Country_${currentCountryCode}.csv`
        downloadFileWithContent(fileName, csv)
      } else {
        // Download region data, all its countries
        const countries = data.rightsByRegion[currentRegion].countries
        const tabularData = flatMap(countries, ({ countryCode }) => countryDataTabular(data, countryCode))
        const csv = csvFormat(tabularData)
        const fileName = `HRMIData_Region_${currentRegion}.csv`
        downloadFileWithContent(fileName, csv)
      }
    } else if (exploreBy === 'Rights') {
      // Download rights data for current regions
      const countries = data.rightsByRegion[currentRegion].countries
      const tabularData = countries.map(country => {
        const { countryCode, rights } = country
        const isCPR = rights.cpr && rights.cpr.hasOwnProperty(currentRight)
        if (isCPR) {
          return { country_code: countryCode, ...rights.cpr[currentRight] }
        } else {
          return {
            country_code: countryCode,
            high_income: rights.esrHI[currentRight],
            core: rights.esrCore[currentRight],
          }
        }
      })
      const csv = csvFormat(tabularData)
      const fileName = `HRMIData_Right_${currentRight}_Region_${currentRegion}.csv`
      downloadFileWithContent(fileName, csv)
    }
  }

  render() {
    const { itemList, content } = this.props
    const joinedClass = jcn({
      downloadPopup: true,
      active: this.state.isOpen,
    }, styles)

    return (
      <div className={joinedClass} ref='downloadPopup'>
        <div onClick={this.togglePopup}><DownloadIcon color={this.state.isOpen ? '#fff' : '#25a9e0'} /></div>
        <ul className={styles.list}>
          { itemList.includes('radar chart') &&
            <li className="link" onClick={this.downloadRadarChart}>{content.download[0]}</li>
          }
          { itemList.includes('bar chart') &&
            <li className="link" onClick={this.downloadBarChart}>{content.download[1]}</li>
          }
          { itemList.includes('line chart') &&
            <li className="link" onClick={this.downloadLineChart}>{content.download[2]}</li>
          }
          <li className="link" onClick={this.downloadCsv}>{content.download[3]}</li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    data: state.data,
    urlSegs: state.router.urlSegs,
  }
)

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(DownloadPopup)
