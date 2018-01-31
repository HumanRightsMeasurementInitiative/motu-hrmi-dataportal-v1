import React from 'react'
import PropTypes from 'prop-types'
import DownloadIcon from '../DownloadIcon'
import { joinClassName as jcn } from '../utils'
import styles from './style.css'

export default class DownloadPopup extends React.Component {
  static propTypes = {
    itemList: PropTypes.array.isRequired,
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

  render() {
    const { itemList } = this.props
    const joinedClass = jcn({
      downloadPopup: true,
      active: this.state.isOpen,
    }, styles)

    return (
      <div className={joinedClass} ref='downloadPopup'>
        <div onClick={this.togglePopup}><DownloadIcon color={this.state.isOpen ? '#fff' : '#25a9e0'} /></div>
        <ul className={styles.list}>
          { itemList.indexOf('chart') > -1 &&
            <li>Download chart</li>
          }
          { itemList.indexOf('bar chart') > -1 &&
            <li>Download bar chart</li>
          }
          { itemList.indexOf('line chart') > -1 &&
            <li>Download line chart</li>
          }
          <li>Download csv</li>
          <li>Download all the above</li>
        </ul>
      </div>
    )
  }
}
