
import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import styles from './style.css'

export default class WordCloudChart extends React.Component {
  static propTypes = {
    words: PropTypes.array.isRequired,
  }

  render() {
    const { words } = this.props
    const sort = (a, b) => (b[1] - a[1])
    // const sortedWords = words.slice().sort(sort).slice(0, 10)

    // TODO remove
    const abuseKeys = ['suspected criminals', 'non-violent political', 'violent political', 'discriminated groups', 'indiscriminate']
    let sortedWords = words.filter(item => abuseKeys.indexOf(item[0].toLowerCase()) === -1)
    sortedWords = sortedWords.slice().sort(sort).slice(0, 10)
    // TODO end

    const scale = d3.scaleLinear().domain([0, 1]).range([0.5, 1])

    return (
      <div className={styles.wrapper}>
        {
          sortedWords.map((item, i) => (
            <div key={i} className={styles.listItem} style={{ opacity: scale(item[1]), fontSize: scale(item[1]) * 24 }}>
              {item[0]}
            </div>
          ))
        }
      </div>
    )
  }
}
