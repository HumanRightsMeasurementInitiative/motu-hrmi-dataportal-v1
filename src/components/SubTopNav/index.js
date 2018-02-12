import React from 'react'
import PropTypes from 'prop-types'
import SectionSelector from '../SectionSelector/'
import { joinClassName as jcn } from '../utils'
import styles from './styles.css'

import radarImage from '../../img/image1.png'
import rightImage from '../../img/image2.png'
import unavailableImage from '../../img/image3.png'

export default class SubTopNav extends React.Component {
  static propTypes = {
    content: PropTypes.object,
  }
  constructor() {
    super()
    this.state = { open: false }
  }

  componentDidMount() {
    document.addEventListener('click', this.documentClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.documentClick)
  }

  documentClick = (e) => {
    const { container } = this.refs
    if (container && container.contains(e.target)) return
    this.setState({ open: false })
  }

  onButtonClick = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { content } = this.props

    const dropdownClassNames = jcn({
      'hide': !this.state.open,
      'dropdown': true,
    }, styles)

    const btnHTRClass = jcn({
      'btnHTR': true,
      'active': this.state.open,
    }, styles)

    return (
      <div className={styles.wrapper}>
        <div className={styles.selectorWrapper}><SectionSelector /></div>
        { content &&
          <div ref='container'>
            <div className={btnHTRClass} onClick={this.onButtonClick}>{content.how_to_read.name}<span className={this.state.open ? styles.hide : styles.btnIcon}>&#43;</span><span className={this.state.open ? styles.btnIcon : styles.hide}>&#8722;</span></div>
            <div className={dropdownClassNames}>
              <div className={styles.dropdownCol}>
                <p>{content.how_to_read.paragraphs[0]}</p>
                <div className={styles.image1}><img src={radarImage} alt="radar image" style={{ width: '100%' }} /></div>
                <p>{content.how_to_read.paragraphs[1]} <span className={styles.esr}>{content.rights_category.esr} (ESR)</span> {content.how_to_read.paragraphs[2]} <span className={styles.cpr}>{content.rights_category.cpr} (CPR).</span> {content.how_to_read.paragraphs[3]}.</p>
              </div>
              <div className={styles.dropdownCol}>
                <p>{content.how_to_read.paragraphs[4]} <span className={styles.esr}>(ESR)</span> {content.how_to_read.paragraphs[5]} <span className={styles.cpr}>(CPR)</span>.</p>
                <div className={styles.image2}><img src={rightImage} alt="right image" style={{ height: '90px' }} /></div>
                <p>{content.how_to_read.paragraphs[6]}<br />{content.how_to_read.paragraphs[7]}</p>
                <div className={styles.image3}><img src={unavailableImage} alt="unavailable image" style={{ height: '180px' }} /></div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}
