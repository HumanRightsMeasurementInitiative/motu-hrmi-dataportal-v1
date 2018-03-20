import React from 'react'
import PropTypes from 'prop-types'
import QuestionTooltip from '../QuestionTooltip'
import styles from './style.css'
import Bar1 from './Bar1'
import Bar2 from './Bar2'
import Bar3 from './Bar3'

export default class RightDefinition extends React.Component {
  static propTypes = {
    right: PropTypes.string.isRequired,
    isESRSelected: PropTypes.bool.isRequired,
    content: PropTypes.object.isRequired,
  }

  render() {
    const { right, isESRSelected, content } = this.props
    const tooltips = content.question_tooltips
    const rightsDefinitions = content.rights_definitions

    return (
      <div style={{ height: '100%' }}>
        <QuestionTooltip width={238} question={tooltips[5].question}>
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
        </QuestionTooltip>
        { rightsDefinitions[right].core_text &&
          <div>
            <p className={styles.measureQues}>{tooltips[3].question} {content.rights_name[right].toLowerCase()}?</p>
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
          <div>
            <QuestionTooltip width={238} question={tooltips[0].question}>
              <p>{tooltips[0].tooltip}</p>
            </QuestionTooltip>
            <QuestionTooltip width={360} question={tooltips[1].question[0] + content.rights_name[right].toLowerCase() + tooltips[1].question[1]}>
              <p>{tooltips[1].tooltip.paragraphs[0]}</p>
              <p>{tooltips[1].tooltip.paragraphs[1]}</p>
              <ul>
                <li>{tooltips[1].tooltip.list[0]}</li>
                <li>{tooltips[1].tooltip.list[1]}</li>
                <li style={{ marginBottom: '10px' }}>{tooltips[1].tooltip.list[2]} <a href='https://humanrightsmeasurement.org/wp-content/uploads/2018/03/HRMI-Methodology-Note-2018.pdf' target='_blank'>{tooltips[1].tooltip.linkText}</a>.</li>
              </ul>g
            </QuestionTooltip>
            { right === 'housing' &&
              <QuestionTooltip width={238} question={tooltips[4].question}>
                <p>{tooltips[4].tooltip}</p>
              </QuestionTooltip>
            }
          </div>
        }
        { !isESRSelected &&
          <div>
            <div className={styles.questionTooltip}>
              <QuestionTooltip width={238} question={tooltips[2].question}>
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
            <QuestionTooltip width={294} question={tooltips[3].question + ' ' + content.rights_name[right].toLowerCase() + '?'}>
              <p>{tooltips[3].tooltip.paragraphs[0]} <a href='https://humanrightsmeasurement.org/methodology/methodology-in-depth/' target='_blank'>{tooltips[3].tooltip.linkText}</a>.</p>
            </QuestionTooltip>
          </div>
        }
      </div>
    )
  }
}
