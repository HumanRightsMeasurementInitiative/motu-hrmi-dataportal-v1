import React from 'react'
import PropTypes from 'prop-types'
import QuestionTooltip from '../QuestionTooltip'
import rightsDefinitions from 'data/rights-definitions.json'
import styles from './style.css'

export default class CountryPage extends React.Component {
  static propTypes = {
    right: PropTypes.string.isRequired,
    isESRSelected: PropTypes.bool.isRequired,
    // data: PropTypes.object.isRequired,
    // urlSegs: PropTypes.object.isRequired,
    // urlPush: PropTypes.func.isRequired,
    // esrStandard: PropTypes.string.isRequired,
  }

  render() {
    const { right, isESRSelected } = this.props
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
            <p className={styles.measureQues}>How has HRMI measured the Right to {right}?</p>
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
          <QuestionTooltip width={238} question={`Why aren't the same indicators used for all countries?`}>
            <p>This is because the same data are not always collected for all countries in the world. The core assessment standard is mostly used for developing and non-OECD-member countries. The high-income OECD country assessment standard uses indicators that are often available only for high-income OECD countries. However, all countries are evaluated using both sets of indicators to the extent data are available.</p>
          </QuestionTooltip>
        }
        { right === 'food' &&
          <QuestionTooltip width={360} question='How does the HRMI methodology convert the above indicators into the Right to Food metric?'>
            <p>All HRMI measures of economic and social rights have been produced using official statistics collected by national governments and harmonised by international organisations. For each indicator, our methodology compares the observed level of enjoyment of that dimension of human rights to the enjoyment level it should be feasible for that country to achieve given its per-capita income level. HRMI economic and social rights metrics thus show how well the State is using its available resources to ensure that all people enjoy these rights.</p>
            <p>Three things should be kept in mind when interpreting HRMI economic and social rights metrics: </p>
            <ul>
              <li>1) A score of 100% does NOT imply that everyone in the country enjoys the right. Rather, it implies that the country’s right enjoyment level is on par with the historically best-performing countries at the same per-capita income level.</li>
              <li>2) A score of 100% does NOT mean there is no room for improvement. Countries with high HRMI scores still need to innovate to extend human rights enjoyment further than has been done in the past.</li>
              <li>3) The fact that a high-income country earns a high HRMI score on a right does NOT imply that all population subgroups (e.g. women or indigenous people) in that country enjoy the right equally.</li>
            </ul>
            <p className={styles.tooptipLink}>For more information on the HRMI ESR methodology <a href='https://humanrightsmeasurement.org/methodology/measuring-economic-social-rights/' target='_blank'>click here.</a></p>
          </QuestionTooltip>
        }
        { !isESRSelected &&
          <div>
            <QuestionTooltip width={293} question={'How should I interpret the uncertainty bands?'}>
              <p>Our civil and political rights measures methodology produces a range of estimated levels of respect for each human right. The average country score (indicated by the white horizontal line) represents the average estimate in that range. The lower score on the uncertainty band represents the 10th percentile of our estimates; the higher score on the uncertainty band represents the 90th percentile.</p>
              <p>Narrower uncertainty bands tell us that there was more agreement among expert survey respondents about what that country’s score should be, and/or a larger number of respondents. The greater the overlap between two uncertainty bands, the less certain we can be that the level of respect for human rights represented by those bands are truly different from one another.</p>
              <p className={styles.tooptipLink}>For more detailed information, please see our <a href='#' target='_blank'>methodology note.[need link]</a></p>
            </QuestionTooltip>
            <QuestionTooltip width={294} question={'How has HRMI measured the Right to ' + right + '?'}>
              <p>Each civil and political right metric has been produced from responses to a survey of in-country human rights experts. Respondents’ answers to questions about the frequency of violations of each civil and political right were combined using a statistical model that ensures the comparability of responses across countries. This results in a distribution of estimated levels of respect for each right in each country, represented by the scores and uncertainty bands shown throughout the data visualisations. Other information about who was identified as at risk for human rights abuse was also collected from our respondents, as shown.</p>
              <p className={styles.tooptipLink}>For more detailed information, please see our <a href='https://humanrightsmeasurement.org/methodology/methodology-in-depth/' target='_blank'>website here.</a></p>
            </QuestionTooltip>
          </div>
        }
      </div>
    )
  }
}
