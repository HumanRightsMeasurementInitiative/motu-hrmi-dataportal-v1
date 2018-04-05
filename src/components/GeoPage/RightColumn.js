import React from 'react'
import RightsItem from './RightsItem'
import MiniBarChart from '../GeoMiniBarChart'
import RightDefinition from '../RightDefinition'
import styles from './style.css'

export default class GeoPageRightColumn extends React.Component {
  render() {
    const {
      content,
      regionRights,
      esrStandard,
      hoverCountry,
      setRight,
      setRightToAll,
      setExploreBy,
      displayedRightsESR,
      displayedRightsCPR,
      currRegion,
      currRight,
    } = this.props
    return (
      <div className="column">
        <div className={styles.columnRight}>
          <div className={styles.rightPaneWrapper}>
            {currRight === 'all' ? (
              <div>
                <div className={styles.esrTitle}>{content.rights_category.esr}</div>
                <ul className={styles.esrList}>
                  {displayedRightsESR.map((right, i) => (
                    <RightsItem
                      key={i}
                      right={right.code}
                      isESR={true}
                      data={regionRights}
                      esrStandard={esrStandard}
                      onItemClick={setRight}
                      hoverCountry={hoverCountry}
                    >
                      {content.rights_name[right.code]}
                    </RightsItem>
                  ))}
                </ul>
                <div className={styles.cprTitle}>{content.rights_category.cpr}</div>
                <ul className={styles.cprList}>
                  {displayedRightsCPR.map((right, i) => (
                    <RightsItem
                      key={i}
                      right={right.code}
                      isESR={false}
                      data={regionRights}
                      onItemClick={setRight}
                      hoverCountry={hoverCountry}
                    >
                      {content.rights_name[right.code]}
                    </RightsItem>
                  ))}
                </ul>
              </div>
            ) : (
              <div className={styles.specRightInfo}>
                <div
                  className={styles.specRightHeader}
                  onClick={setRightToAll}
                  rightcolor={currRight}
                >
                  <div className={styles.rightName}>{content.rights_name[currRight]}</div>
                  <div className={styles.rightCate}>
                    {displayedRightsESR.length === 0
                      ? content.rights_category.cpr
                      : content.rights_category.esr}
                  </div>
                  {displayedRightsESR.length ? (
                    <MiniBarChart
                      height={60}
                      data={regionRights}
                      isESR={true}
                      right={currRight}
                      hoverCountry={hoverCountry}
                      esrStandard={esrStandard}
                      isWithDot={true}
                      pointColor={`#009540`}
                    />
                  ) : (
                    <MiniBarChart
                      height={60}
                      data={regionRights}
                      isESR={false}
                      right={currRight}
                      hoverCountry={hoverCountry}
                      isWithDot={true}
                      pointColor={`#3378ae`}
                    />
                  )}
                  <div className={styles.linkWrapper}>
                    <div className="arrowLink">
                      <div className="text">{content.explore_this_rights_in}:</div>
                      <div className="text underline" onClick={setExploreBy}>
                        {content.region_name[currRegion]}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.definitionWrapper}>
                  <div className={styles.rightInfo}>
                    <RightDefinition
                      right={currRight}
                      isESRSelected={displayedRightsESR.length !== 0}
                      content={content}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
