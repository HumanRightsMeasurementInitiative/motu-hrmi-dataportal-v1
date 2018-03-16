import React from 'react'
import PropTypes from 'prop-types'
import QuestionTooltip from '../QuestionTooltip'
import WordCloudChart from '../WordCloudChart'
import AbuseBarChart from '../AbuseBarChart'
import styles from './style.css'

export default class RightsPage extends React.Component {
  static propTypes = {
    isESRSelected: PropTypes.bool.isRequired,
    isCPRSelected: PropTypes.bool.isRequired,
    content: PropTypes.object.isRequired,
    currCountry: PropTypes.object.isRequired,
    currRight: PropTypes.string.isRequired,
    isHideTimeline: PropTypes.bool,
  }

  static defaultProps = {
    isHideTimeline: false,
  }

  render() {
    const { isESRSelected, isCPRSelected, currCountry, currRight, content, isHideTimeline } = this.props
    const cloudWords = isCPRSelected && currCountry && currRight !== 'all' && currCountry.rights.cprRangeAtRisk
      ? currCountry.rights.cprRangeAtRisk[currRight]
      : []

    return (
      <div>
        { !isESRSelected && cloudWords.length !== 0
          ? (<div>
            <QuestionTooltip width={214} question={content.cpr_at_risk.title} isTitle={true}>
              <p>{content.cpr_at_risk.tooltip} <a href='https://humanrightsmeasurement.org/wp-content/uploads/2018/03/Qualitative-responses-HRMI-2017-pilot.pdf' target='_blank'>{content.cpr_at_risk.link}</a>.</p>
            </QuestionTooltip>
            <WordCloudChart words={cloudWords} />
            <QuestionTooltip width={220} question={content.cpr_abuse.title} isTitle={true}>
              <p>{content.cpr_abuse.tooltip}</p>
            </QuestionTooltip>
            <div className={styles.cprChartSubtitle}>{content.cpr_abuse.subtitle}</div>
            <AbuseBarChart data={cloudWords} height={100} />
            <div className={styles.chartKeys}>
              <strong>A:</strong> {content.cpr_abuse.keys[0]}, <strong>B:</strong> {content.cpr_abuse.keys[1]}, <strong>C:</strong> {content.cpr_abuse.keys[2]}, <strong>D:</strong> {content.cpr_abuse.keys[3]}, <strong>E:</strong> {content.cpr_abuse.keys[4]}
            </div>
          </div>)
                : (<div style={{ fontWeight: 'bold', fontSize: '15px' }}>None Selected by Expert Respondents</div>)
        }
        { isESRSelected && currCountry && !isHideTimeline &&
          <div>
            <div className={styles.subtitleESR}>{content.esr_trend.title}</div>
            <div className={styles.esrChartKey}>{content.esr_trend.subtitle}</div>
          </div>
        }
      </div>
    )
  }
}
