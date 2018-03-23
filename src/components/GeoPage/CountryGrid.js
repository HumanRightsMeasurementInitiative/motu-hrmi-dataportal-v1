import React from 'react'
import CountryRightsChart from 'components/CountryRightsChart'
import DownloadPopup from '../DownloadPopup'
import ChangeStandard from '../ChangeStandard'
import styles from './style.css'

function rewriteArgs(fn, ...args) {
  return () => fn(...args)
}

function async(fn) {
  return (...a) => setTimeout(() => fn(...a), 10)
}

export default class GeoPageCountryGrid extends React.Component {
  render() {
    const {
      countries,
      esrStandard,
      content,
      currRegion,
      currRight,
      hoverCountry,
      setCountry,
      setHoverCountry,
      unsetHoverCountry,
      urlSegs,
    } = this.props
    return (
      <div className="column">
        <div className={styles.columnMiddle}>
          <div className={styles.chartsHeader}>
            <div className={styles.title}>
              <strong>
                {content.header_text.by_geography}: {content.region_name[currRegion]}
              </strong>
            </div>
            <div className={styles.standard}>
              <ChangeStandard />
            </div>
          </div>
          <div className={styles.gridWrapper}>
            <div className={styles.countriesList}>
              <div className={styles.countriesContainer} onMouseLeave={async(unsetHoverCountry)}>
                {countries.map((country, i) => (
                  <div
                    key={country.countryCode}
                    className={styles.countryCard}
                    onClick={rewriteArgs(setCountry, country.countryCode)}
                    onMouseEnter={async(rewriteArgs(setHoverCountry, country.countryCode))}
                  >
                    <CountryRightsChart
                      rights={country.rights}
                      currRight={currRight === 'all' ? null : currRight}
                      esrStandard={esrStandard}
                      size={165}
                    />
                    <span>
                      {content.countries[country.countryCode]} {hoverCountry === country.countryCode}
                      {country.isHI && '*'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.chartsFooter}>
            <div className={styles.downloadPopupWrapper}>
              <DownloadPopup itemList={['chart']} content={content} />
            </div>
            {(urlSegs.region !== 'sub-saharan-africa' && urlSegs.region !== 'south-asia') &&
            <div className={styles.text} style={{ marginBottom: 4 }}>
              <b style={{ fontSize: 14, color: 'black' }}>*</b>
              {' '}
              {content.high_income_footnote}
            </div>
            }
            <div className={styles.text}>
              {content.footer_text.by_geography}
            </div>
            <div className={styles.source}>
              {content.footer_text.source}
              {' '}
              <a className={styles.small} href="https://humanrightsmeasurement.org">
                https://humanrightsmeasurement.org
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
