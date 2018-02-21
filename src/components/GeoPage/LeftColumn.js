import React from 'react'
import RegionItem from '../RegionItem'
import styles from './style.css'

export default class GeoPageLeftColumn extends React.Component {
  render() {
    const { rightsByRegion, currRegion, content, setRegion } = this.props
    const regionCodes = Object.keys(rightsByRegion)

    return (
      <div className="column">
        <div className={styles.columnLeft}>
          <div className={styles.searchInputWrapper}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder={content.search_country}
            />
          </div>
          <ul className={styles.regionList}>
            {regionCodes.map((regionCode, i) => (
              <RegionItem
                key={regionCode}
                code={regionCode}
                onItemClick={setRegion}
                selected={regionCode === currRegion}
              >
                {content.region_name[regionCode]}
              </RegionItem>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
