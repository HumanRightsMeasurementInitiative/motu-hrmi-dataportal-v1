import React from 'react'
import PropTypes from 'prop-types'
import QuestionTooltip from '../QuestionTooltip'
import WordCloudChart from '../WordCloudChart'
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
        {(isESRSelected && currCountry && !isHideTimeline) &&
        <div>
          <div className={styles.subtitleESR}>{content.esr_trend.title}</div>
          <div className={styles.esrChartKey}>{content.esr_trend.subtitle}</div>
        </div>
            }
        {!isESRSelected && cloudWords.length !== 0 &&
        <div>
          <QuestionTooltip width={214} question={content.cpr_at_risk.title} isTitle={true}>
            <p>{content.cpr_at_risk.tooltip}
              <a
                href='https://humanrightsmeasurement.org/wp-content/uploads/2018/03/Qualitative-responses-HRMI-2017-pilot.pdf'
                target='_blank'
                                >
                {content.cpr_at_risk.link}.
                                 </a>
            </p>
          </QuestionTooltip>
          <WordCloudChart words={cloudWords} content={content}/>
        </div>
              }
        {!isESRSelected && cloudWords.length === 0 &&
        <div>
          <div className={styles.CPRTitle}>{content.cpr_at_risk.title}</div>
          <div style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}>{content.cpr_at_risk.none_selected}</div>
        </div>
         }
      </div>
    )
  }
}
