import React from 'react'
import PropTypes from 'prop-types'
import SubTopNav from '../SubTopNav/'
import RightsItem from './RightsItem'
import BarChartCPR from '../BarChartCPR'
import RegionSelector from './RegionSelector'
import RightBarchart from '../RightBarchart/'
import ESRTimeline from '../ESRTimeline/'
import DownloadPopup from '../DownloadPopup'
import SortbyDropdown from '../SortbyDropdown'
import RightDefinition from '../RightDefinition'
import DefinitionFooter from '../DefinitionFooter'
import QuestionTooltip from '../QuestionTooltip'
import SearchList from '../SearchList'
import { segsToUrl, joinClassName as jcn } from '../utils'
import { get } from 'lodash'
import styles from './style.css'
import rightsDefinitions from 'data/rights-definitions.json'
import Bar1 from './Bar1'
import Bar2 from './Bar2'
import Bar3 from './Bar3'

export default class RightsPage extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    urlSegs: PropTypes.object.isRequired,
    urlPush: PropTypes.func.isRequired,
    content: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.state = {
      currCountry: null,
      chartHeight: 0,
      chartWidth: 0,
      currYear: 2015,
      rightPaneWidth: 0,
      hoveredCountry: null,
      subrights: null,
      sortby: 'Name',
    }
  }

  componentDidMount() {
    const { charts, rightPane } = this.refs
    this.setState({
      chartHeight: charts.offsetHeight,
      chartWidth: charts.offsetWidth,
      rightPaneWidth: rightPane.offsetWidth,
    })
  }

  setExploreBy = right => {
    const { urlSegs } = this.props
    this.props.urlPush(
      segsToUrl({
        ...urlSegs,
        exploreBy: 'Geography',
        right: 'all',
        country: undefined,
      })
    )
  }

  setRegion = region => {
    this.setState({ currCountry: null })
    this.props.urlPush(
      segsToUrl({ ...this.props.urlSegs, region: region, country: undefined })
    )
  }

  setRight = right => {
    this.setState({ currCountry: null, subrights: null })
    this.props.urlPush(segsToUrl({ ...this.props.urlSegs, right: right }))
  }

  setCountry = () => {
    this.props.urlPush(
      segsToUrl({
        ...this.props.urlSegs,
        exploreBy: 'Geography',
        country: this.state.currCountry.countryCode,
        right: 'all',
      })
    )
  }

  setCurrCountry = country => {
    if (
      this.state.currCountry === null ||
      country.countryCode !== this.state.currCountry.countryCode
    ) {
      this.setState({ currCountry: country })
    } else {
      this.setState({ currCountry: null })
    }
  }

  resetCurrCountry = () => {
    this.setState({ currCountry: null })
  }

  setCurrYear = year => {
    this.setState({ currYear: year })
  }

  setSubrights = right => {
    this.setState({ subrights: right })
  }

  setSortby = name => {
    this.setState({ sortby: name })
  }

  gotoCPRPilot = () => {
    this.props.urlPush(
      segsToUrl({ ...this.props.urlSegs, region: 'cpr-pilot' })
    )
  }

  setHoveredCountry = country => {
    this.setState({ hoveredCountry: country })
  }

  unsetHoveredCountry = country => {
    this.setState({ hoveredCountry: null })
  }

  render() {
    const { data: { rightsByRegion }, urlSegs, content } = this.props
    const rights = Object.entries(rightsDefinitions).map(([code, right]) => ({
      code,
      ...right,
    }))
    const ESRs = rights.filter(right => right.type === 'ESR')
    const CPRs = rights.filter(right => right.type === 'CPR')

    const ESRItems = ESRs.map((right, i) => (
      <RightsItem
        key={right.code}
        right={right.code}
        onItemClick={this.setRight}
        selected={right.code === urlSegs.right}
        content={content}
      >
        {content.rights_name[right.code]}
      </RightsItem>
    ))
    const CPRItems = CPRs.map((right, i) => (
      <RightsItem
        key={right.code}
        right={right.code}
        onItemClick={this.setRight}
        selected={right.code === urlSegs.right}
        content={content}
        subrights={this.state.subrights}
        setSubrights={this.setSubrights}
      >
        {content.rights_name[right.code]}
      </RightsItem>
    ))

    const isESRSelected = ESRs.some(r => r.code === urlSegs.right)
    const isCPRSelected = CPRs.some(r => r.code === urlSegs.right)

    const colorClassName = jcn(
      {
        rightInfo: true,
        esrs: isESRSelected,
        cprs: isCPRSelected,
      },
      styles
    )

    const cprFooter = jcn(
      {
        cprFooter: isCPRSelected,
      },
      styles
    )

    const getRightValue = country =>
      this.state.sortby === 'Core assessment standard score'
        ? get(
            country,
            `rights.esrCoreHistorical.${this.state.currYear}.rights.${
              urlSegs.right
            }`,
            0
          )
        : get(
            country,
            `rights.esrHIHistorical.${this.state.currYear}.rights.${
              urlSegs.right
            }`,
            0
          )
    const getGDPValue = country =>
      get(country, `rights.esrHIHistorical.${this.state.currYear}.GDP`, 0)
    const sortby = data => {
      switch (this.state.sortby) {
        case 'Core assessment standard score':
          return data
            .slice()
            .sort((a, b) => getRightValue(a) - getRightValue(b))
        case 'High income OECD assessment country score':
          return data
            .slice()
            .sort((a, b) => getRightValue(a) - getRightValue(b))
        case 'GDP/Capita':
          return data.slice().sort((a, b) => getGDPValue(a) - getGDPValue(b))
        case 'Name':
          return data
      }
    }

    const rightsByRegionCountries = sortby(
      rightsByRegion[urlSegs.region].countries
    )

    return (
      <div className={styles.rightsPage}>
        <div className={styles.searchWrapper}>
          <SearchList />
        </div>
        <SubTopNav />
        <div className="row">
          <div className="column">
            <div className={styles.columnLeft}>
              <div className={styles.regionSelectorWrapper}>
                <RegionSelector
                  content={content}
                  selectRetionText={content.select_region}
                  rightsByRegion={rightsByRegion}
                  urlSegs={urlSegs}
                  isActive={isESRSelected}
                  onItemClick={this.setRegion}
                />
              </div>
              <div className={styles.rightsWrapper}>
                <div className={styles.rightList}>
                  <div className={styles.ESRTitle}>
                    {content.rights_category.esr}
                  </div>
                  <ul>{ESRItems}</ul>
                  <div className={styles.CPRTitle}>
                    {content.rights_category.cpr}
                  </div>
                  <ul>{CPRItems}</ul>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className={styles.chartsHeader}>
              <div className={styles.regionName}>
                <span style={{ color: isESRSelected ? '#00af49' : '#2e65a1' }}>
                  {content.rights_name[urlSegs.right]}:
                </span>{' '}
                {content.region_name[urlSegs.region]}
              </div>
              <div className={styles.chartSubtitle}>
                {isESRSelected && content.esr_chart_subtitle}
              </div>
              <div className={styles.esrLegendContainer}>
                {isESRSelected ? (
                  <div className={styles.esrLegend} data-legend>
                    <div className={styles.text}>
                      {content.legend.esr_barchart[0]}
                    </div>
                    <div className={styles.text}>
                      {content.legend.esr_barchart[1]}
                    </div>
                  </div>
                ) : (
                  <div className={styles.cprLegend} data-legend>
                    <div className={styles.meanText}>
                      {content.legend.cpr_barchart[0]}
                    </div>
                    <div className={styles.bar} />
                    <div className={styles.textContainer}>
                      <div className={styles.maxText}>
                        90<sup>th</sup> {content.legend.cpr_barchart[1]}
                      </div>
                      <div className={styles.minText}>
                        10<sup>th</sup> {content.legend.cpr_barchart[1]}
                      </div>
                    </div>
                    <div className={styles.questionTooltip}>
                      <QuestionTooltip width={238} question={''}>
                        <p>
                          {content.question_tooltips[2].tooltip.paragraphs[0]}
                        </p>
                        <div style={{ display: 'flex', flexFlow: 'column' }}>
                          <Bar1 legend={content.question_tooltips[2].tooltip.legend[0]} />
                          <Bar2 legend={content.question_tooltips[2].tooltip.legend[1]}/>
                          <Bar3 legend={content.question_tooltips[2].tooltip.legend[2]}/>
                        </div>
                        <p>
                          {content.question_tooltips[2].tooltip.paragraphs[1]}{' '}
                          <a href="https://humanrightsmeasurement.org/wp-content/uploads/2018/03/HRMI-Methodology-Note-2018.pdf" target="_blank">
                            {content.question_tooltips[2].tooltip.linkText}
                          </a>.
                        </p>
                      </QuestionTooltip>
                    </div>
                  </div>
                )}
                {isESRSelected && (
                  <div
                    className={styles.sortBy}
                    style={{
                      opacity:
                        isESRSelected || urlSegs.region === 'cpr-pilot' ? 1 : 0,
                    }}
                  >
                    <SortbyDropdown
                      regionCode={urlSegs.region}
                      sortby={this.state.sortby}
                      onItemClick={this.setSortby}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className={styles.chartsContainer} ref="charts">
              {isESRSelected || urlSegs.region === 'cpr-pilot' ? (
                <RightBarchart
                  isESR={rightsDefinitions[urlSegs.right].type === 'ESR'}
                  currYear={this.state.currYear}
                  currRight={urlSegs.right}
                  rightsByRegionCountries={rightsByRegionCountries}
                  chartHeight={this.state.chartHeight * 0.6}
                  chartWidth={this.state.chartWidth}
                  currCountry={this.state.currCountry}
                  onItemClick={this.setCurrCountry}
                  resetCurrCountry={this.resetCurrCountry}
                  hoveredCountry={this.state.hoveredCountry}
                  onItemHover={this.setHoveredCountry}
                  resetHoveredCountry={this.unsetHoveredCountry}
                  score={content.score}
                  subrights={this.state.subrights}
                />
              ) : (
                <div className={styles.CPRAlertWrapper}>
                  <div className={styles.CPRAlert}>
                    {content.cpr_alert.text}{' '}
                    <u>{content.cpr_alert.underline_text}</u>
                    <div className={styles.button}>
                      <button onClick={this.gotoCPRPilot}>
                        {content.cpr_alert.button_text}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {isESRSelected && (
                <ESRTimeline
                  data={rightsByRegionCountries}
                  chartHeight={this.state.chartHeight * 0.4}
                  chartWidth={this.state.chartWidth}
                  currYear={this.state.currYear}
                  currRight={urlSegs.right}
                  currCountry={this.state.currCountry}
                  hoveredCountry={this.state.hoveredCountry}
                  onItemClick={this.setCurrYear}
                />
              )}
            </div>
            <div className={styles.chartsFooter}>
              <div
                className={cprFooter}
                style={{ bottom: this.state.chartHeight * 0.4 - 40 + 'px' }}
              >
                <div className={styles.downloadPopupWrapper}>
                  <DownloadPopup
                    itemList={
                      isESRSelected
                        ? ['bar chart', 'line chart']
                        : ['bar chart']
                    }
                    content={content}
                  />
                </div>
                <div className={styles.text}>
                  {isESRSelected
                    ? content.footer_text.rights_page_esr
                    : content.footer_text.rights_page_cpr}
                </div>
                <div className={styles.source}>
                  {content.footer_text.source}{' '}
                  <a
                    className={styles.small}
                    href="https://humanrightsmeasurement.org"
                  >
                    https://humanrightsmeasurement.org
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="column" ref="rightPane">
            <div className={styles.infoHeader}>
              <div className={colorClassName}>
                <div className={styles.rightName}>{content.rights_name[urlSegs.right]}</div>
                <div className={styles.regionName}>
                  {this.state.currCountry
                    ? content.countries[this.state.currCountry.countryCode]
                    : content.region_name[urlSegs.region]}
                </div>
              </div>
              <div className="arrowLink">
                <div className="text">{content.explore_all_rights_in}:</div>
                <div className="text underline" onClick={this.setExploreBy}>
                  {content.region_name[urlSegs.region]}
                </div>
                {this.state.currCountry !== null && (
                  <div className="text underline" onClick={this.setCountry}>
                    {content.countries[this.state.currCountry.countryCode]}
                  </div>
                )}
              </div>
            </div>

            {this.state.currCountry !== null && isCPRSelected && (
              <div style={{ margin: `25px 25px 0 25px` }}>
                <BarChartCPR data={this.state.currCountry.rights.cpr} rightCode={urlSegs.right} height={80} />
              </div>
            )}

            <div className={styles.infoContent}>
              <div className={styles.textWrapper}>
                <RightDefinition
                  right={urlSegs.right}
                  isESRSelected={isESRSelected}
                  content={content}
                />
                {this.state.currCountry && (
                  <DefinitionFooter
                    isESRSelected={isESRSelected}
                    isCPRSelected={isCPRSelected}
                    currCountry={this.state.currCountry}
                    currRight={urlSegs.right}
                    content={content}
                    isHideTimeline={true}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
