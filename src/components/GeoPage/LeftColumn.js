import React from 'react'
import RegionItem from '../RegionItem'
import SearchList from '../SearchList'
import styles from './style.css'

export default class GeoPageLeftColumn extends React.Component {
  render() {
    const { rightsByRegion, currRegion, content, setRegion } = this.props
    const regionCodes = Object.keys(rightsByRegion)

    return (
      <div className="column">
        <div className={styles.columnLeft}>
          <SearchList />
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
