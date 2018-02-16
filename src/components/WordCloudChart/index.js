
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
    const sort = (a, b) => (b.value - a.value)
    const filter = (v, i) => i < 10
    const sortedWords = words.slice().sort(sort).filter(filter)

    const scale = d3.scaleLinear().domain([0, 1]).range([0.5, 1])

    return (
      <div className={styles.wrapper}>
        {
          sortedWords.map((item, i) => (
            <div key={i} className={styles.listItem} style={{ opacity: scale(item.value), fontSize: scale(item.value) * 24 }}>
              {item.text}
            </div>
          ))
        }
      </div>
    )
  }
}
