import React from 'react'
import PropTypes from 'prop-types'
import QuestionTooltip from '../QuestionTooltip'
import rightsDefinitions from 'data/rights-definitions.json'
import styles from './style.css'

export default class RightDefinition extends React.Component {
  static propTypes = {
    right: PropTypes.string.isRequired,
    isESRSelected: PropTypes.bool.isRequired,
    tooltips: PropTypes.array.isRequired,
  }

  render() {
    const { right, isESRSelected, tooltips } = this.props

    return (
      <div style={{ height: '100%' }}>
        { rightsDefinitions[right].definition
          ? <p className={styles.definition}>{rightsDefinitions[right].definition}</p>
          : <ul>
            {rightsDefinitions[right].measure_list.map((item, i) => {
              return (<li key={i} className={styles.defList}>{item}</li>)
            })}
          </ul>
        }
        { rightsDefinitions[right].conclusion_para &&
          <p className={styles.definition}>{rightsDefinitions[right].conclusion_para}</p>
        }
        { rightsDefinitions[right].core_text &&
          <div>
            <p className={styles.measureQues}>{tooltips[3].question} {right}?</p>
            <p>{rightsDefinitions[right].core_text}</p>
            <ul>
              {
                rightsDefinitions[right].core_indicator.map((item, i) => (
                  <li key={i} className={styles.withDot}>{item}</li>
                ))
              }
            </ul>
          </div>
        }
        { rightsDefinitions[right].high_text &&
          <div>
            <p>{rightsDefinitions[right].high_text}</p>
            <ul>
              {
                rightsDefinitions[right].high_indicator.map((item, i) => (
                  <li key={i} className={styles.withDot}>{item}</li>
                ))
              }
            </ul>
          </div>
        }
        { isESRSelected &&
          <QuestionTooltip width={238} question={tooltips[0].question}>
            <p>{tooltips[0].tooltip}</p>
          </QuestionTooltip>
        }
        { right === 'food' &&
          <QuestionTooltip width={360} question={tooltips[1].question}>
            <p>{tooltips[1].tooltip.paragraphs[0]}</p>
            <p>{tooltips[1].tooltip.paragraphs[1]}</p>
            <ul>
              <li>{tooltips[1].tooltip.list[0]}</li>
              <li>{tooltips[1].tooltip.list[1]}</li>
              <li>{tooltips[1].tooltip.list[2]}</li>
            </ul>
            <p className={styles.tooptipLink}>{tooltips[1].tooltip.paragraphs[2]} <a href='https://humanrightsmeasurement.org/methodology/measuring-economic-social-rights/' target='_blank'>{tooltips[1].tooltip.linkText}</a>.</p>
          </QuestionTooltip>
        }
        { !isESRSelected &&
          <div>
            <QuestionTooltip width={293} question={tooltips[2].question}>
              <p>{tooltips[2].tooltip.paragraphs[0]}</p>
              <p>{tooltips[2].tooltip.paragraphs[1]}</p>
              <p className={styles.tooptipLink}>{tooltips[2].tooltip.paragraphs[2]} <a href='#' target='_blank'>{tooltips[2].tooltip.linkText}</a>.</p>
            </QuestionTooltip>
            <QuestionTooltip width={294} question={tooltips[3].question + ' ' + right + '?'}>
              <p>{tooltips[3].tooltip.paragraphs[0]}</p>
              <p className={styles.tooptipLink}>{tooltips[3].tooltip.paragraphs[1]} <a href='https://humanrightsmeasurement.org/methodology/methodology-in-depth/' target='_blank'>{tooltips[3].tooltip.linkText}</a>.</p>
            </QuestionTooltip>
          </div>
        }
      </div>
    )
  }
}
