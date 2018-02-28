import React from 'react'
import CountryRightsChart from 'components/CountryRightsChart'
import DownloadPopup from '../DownloadPopup'
import ChangeStandard from '../ChangeStandard'
import styles from './style.css'

function rewriteArgs(fn, ...args) {
  return () => fn(...args)
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
    } = this.props
    return (
      <div className="column">
        <div className={styles.columnMiddle}>
          <div className={styles.chartsHeader}>
            <div className={styles.title}>
              <strong>
                {content.header_text.by_geography} {content.region_name[currRegion]}
              </strong>
            </div>
            <div className={styles.standard}>
              <ChangeStandard />
            </div>
          </div>
          <div className={styles.gridWrapper}>
            <div className={styles.countriesList}>
              <div className={styles.countriesContainer}>
                {countries.map((country, i) => (
                  <div
                    key={country.countryCode}
                    className={styles.countryCard}
                    onClick={rewriteArgs(setCountry, country.countryCode)}
                  >
                    <CountryRightsChart
                      rights={country.rights}
                      currRight={currRight === 'all' ? null : currRight}
                      esrStandard={esrStandard}
                      size={165}
                    />
                    <span>
                      {country.countryName} {hoverCountry === country.countryCode}
                    </span>
                    <div
                      className={styles.cardCover}
                      onMouseOver={rewriteArgs(setHoverCountry, country.countryCode)}
                      onMouseOut={unsetHoverCountry}
                      style={{
                        opacity:
                          hoverCountry === null || hoverCountry === country.countryCode ? 0 : 1,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.chartsFooter}>
            <div className={styles.downloadPopupWrapper}>
              <DownloadPopup itemList={['chart']} content={content} />
            </div>
            <div className={styles.text}>{content.footer_text.by_geography}</div>
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
