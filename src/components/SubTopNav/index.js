import React from 'react'
import SectionSelector from '../SectionSelector/'
import { joinClassName as jcn } from '../utils'
import styles from './styles.css'

import radarImage from '../../img/image1.png'
import rightImage from '../../img/image2.png'
import unavailableImage from '../../img/image3.png'

export default class SubTopNav extends React.Component {
  constructor() {
    super()
    this.state = { open: false }
  }

  componentDidMount() {
    this.refs.HTRDropdown.style.maxHeight = window.innerHeight - 104 + 'px'
    document.addEventListener('click', this.documentClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.documentClick)
  }

  documentClick = (e) => {
    if (this.refs.container.contains(e.target)) return
    this.setState({ open: false })
  }

  onButtonClick = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
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
        <div ref='container'>
          <div className={btnHTRClass} onClick={this.onButtonClick}>HOW TO READ<span className={this.state.open ? styles.hide : styles.btnIcon}>&#43;</span><span className={this.state.open ? styles.btnIcon : styles.hide}>&#8722;</span></div>
          <div className={dropdownClassNames} ref='HTRDropdown'>
            <div className={styles.dropdownCol}>
              <p>Each country is represented by a radar chart, formed by twelve axes. Each axis stands for a right. The longer the axis, the better the performance of the country on that right.</p>
              <div className={styles.image1}><img src={radarImage} alt="radar image" style={{ width: '100%' }} /></div>
              <p>Rights are color coded by two different sets: <span className={styles.esr}>Economic and Social Rights (ESR)</span> and <span className={styles.cpr}>Civil and Political Rights (CPR).</span> CPR data are only available for 13 pilot countries.</p>
            </div>
            <div className={styles.dropdownCol}>
              <p>The two sets of rights are evaluated on two different scales: on a percentage scale <span className={styles.esr}>(ESR)</span> and as a score out of 10 <span className={styles.cpr}>(CPR)</span></p>
              <div className={styles.image2}><img src={rightImage} alt="right image" style={{ height: '90px' }} /></div>
              <p>When CPR data are not available in a country, only ESR axes will be shown on the radar. <br />A dashed and greyed out axis means that there is no data available for that rights in that country.</p>
              <div className={styles.image3}><img src={unavailableImage} alt="unavailable image" style={{ height: '180px' }} /></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
