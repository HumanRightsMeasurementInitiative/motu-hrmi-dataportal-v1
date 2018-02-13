
import React from 'react'
import PropTypes from 'prop-types'
import WordCloud from 'react-d3-cloud'

export default class WordCloudChart extends React.Component {
  static propTypes = {
    words: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  render() {
    const { words, height, width } = this.props
    const fontSizeMapper = word => word.value * 40 + 5

    return (
      <div style={{ marginLeft: '-20px' }}>
        { width > 0 &&
          <WordCloud
            width={width}
            height={height}
            data={words}
            font={'Source Sans Pro, sans-serif'}
            fontSizeMapper={fontSizeMapper}
          />
        }
      </div>
    )
  }
}
