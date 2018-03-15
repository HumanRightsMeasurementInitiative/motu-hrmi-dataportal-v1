import React from 'react'
import PropTypes from 'prop-types'
import DownloadIcon from '../DownloadIcon'
import { joinClassName as jcn } from '../utils'
import styles from './style.css'

export default class DownloadPopup extends React.Component {
  static propTypes = {
    itemList: PropTypes.array.isRequired,
    content: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.state = { isOpen: false }
  }

  componentDidMount() {
    document.addEventListener('click', this.documentClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.documentClick)
  }

  documentClick = (e) => {
    if (this.refs.downloadPopup.contains(e.target)) return
    this.setState({ isOpen: false })
  }

  togglePopup = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  downloadRadarChart = () => {
    window.alert('Not yet implemented.')
  }

  downloadBarChart = () => {
    window.alert('Not yet implemented.')
  }

  downloadLineChart = () => {
    window.alert('Not yet implemented.')
  }

  downloadCsv = () => {
    window.alert('Not yet implemented.')
  }

  render() {
    const { itemList, content } = this.props
    const joinedClass = jcn({
      downloadPopup: true,
      active: this.state.isOpen,
    }, styles)

    return (
      <div className={joinedClass} ref='downloadPopup'>
        <div onClick={this.togglePopup}><DownloadIcon color={this.state.isOpen ? '#fff' : '#25a9e0'} /></div>
        <ul className={styles.list}>
          { itemList.includes('radar chart') &&
            <li className="link" onClick={this.downloadRadarChart}>{content.download[0]}</li>
          }
          { itemList.includes('bar chart') &&
            <li className="link" onClick={this.downloadBarChart}>{content.download[1]}</li>
          }
          { itemList.includes('line chart') &&
            <li className="link" onClick={this.downloadLineChart}>{content.download[2]}</li>
          }
          <li className="link" onClick={this.downloadCsv}>{content.download[3]}</li>
        </ul>
      </div>
    )
  }
}
