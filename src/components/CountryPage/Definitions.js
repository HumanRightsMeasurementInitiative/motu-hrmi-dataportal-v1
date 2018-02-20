import React from 'react'
import PropTypes from 'prop-types'
import QuestionTooltip from '../QuestionTooltip'
import styles from './style.css'

export default class CountryPage extends React.Component {
  static propTypes = {
    isESRSelected: PropTypes.bool.isRequired,
    isCPRSelected: PropTypes.bool.isRequired,
    currRight: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.state = {
      showMore: false,
    }
  }

  toggleShowMore = () => {
    this.setState({ showMore: !this.state.showMore })
  }

  render() {
    const { isESRSelected, isCPRSelected, currRight, content } = this.props
    const { showMore } = this.state
    const rightsDefinitions = content.rights_definitions

    return (
      <div>
        { rightsDefinitions[currRight].definition
          ? <p className={styles.definition}>{rightsDefinitions[currRight].definition}</p>
          : <ul>
            {rightsDefinitions[currRight].measure_list.map((item, i) => {
              return (<li key={i} className={styles.defList}>{item}</li>)
            })}
          </ul>
        }
        { rightsDefinitions[currRight].conclusion_para &&
          <p className={styles.definition}>{rightsDefinitions[currRight].conclusion_para}</p>
        }
        { rightsDefinitions[currRight].core_text &&
          <div>
            <p className={styles.measureQues}>{content.question_tooltips[3].question} {content.rights_name[currRight]}?</p>
            <p>{rightsDefinitions[currRight].core_text}</p>
            <ul>
              {
                rightsDefinitions[currRight].core_indicator.map((item, i) => (
                  <li key={i} className={styles.withDot}>{item}</li>
                ))
              }
            </ul>
          </div>
        }
        { showMore && rightsDefinitions[currRight].high_text &&
          <div>
            <p>{rightsDefinitions[currRight].high_text}</p>
            <ul>
              {
                rightsDefinitions[currRight].high_indicator.map((item, i) => (
                  <li key={i} className={styles.withDot}>{item}</li>
                ))
              }
            </ul>
          </div>
        }
        { showMore && isESRSelected &&
          <div>
            <QuestionTooltip width={238} question={content.question_tooltips[0].question}>
              <p>{content.question_tooltips[0].tooltip}</p>
            </QuestionTooltip>
            <QuestionTooltip width={360} question={content.question_tooltips[1].question[0] + content.rights_name[currRight] + content.question_tooltips[1].question[1]}>
              <p>{content.question_tooltips[1].tooltip.paragraphs[0]}</p>
              <p>{content.question_tooltips[1].tooltip.paragraphs[1]}</p>
              <ul>
                <li>{content.question_tooltips[1].tooltip.list[0]}</li>
                <li>{content.question_tooltips[1].tooltip.list[1]}</li>
                <li style={{ marginBottom: '10px' }}>{content.question_tooltips[1].tooltip.list[2]} <a href='https://humanrightsmeasurement.org/methodology/measuring-economic-social-rights/' target='_blank'>{content.question_tooltips[1].tooltip.linkText}</a>.</li>
              </ul>
            </QuestionTooltip>
            { currRight === 'housing' &&
              <QuestionTooltip width={238} question={content.question_tooltips[4].question}>
                <p>{content.question_tooltips[4].tooltip}</p>
              </QuestionTooltip>
            }
          </div>
        }
        { showMore && isCPRSelected &&
          <div>
            <QuestionTooltip width={293} question={content.question_tooltips[2].question}>
              <p>{content.question_tooltips[2].tooltip.paragraphs[0]}</p>
              <p>{content.question_tooltips[2].tooltip.paragraphs[1]} <a href='#' target='_blank'>{content.question_tooltips[2].tooltip.linkText}</a>.</p>
            </QuestionTooltip>
            <QuestionTooltip width={294} question={content.question_tooltips[3].question + ' ' + content.rights_name[currRight] + '?'}>
              <p>{content.question_tooltips[3].tooltip.paragraphs[0]} <a href='https://humanrightsmeasurement.org/methodology/methodology-in-depth/' target='_blank'>{content.question_tooltips[3].tooltip.linkText}</a>.</p>
            </QuestionTooltip>
          </div>
        }
        <div className={styles.showMoreBtn} onClick={this.toggleShowMore}>{showMore ? content.show_less : content.show_more}</div>
      </div>
    )
  }
}
