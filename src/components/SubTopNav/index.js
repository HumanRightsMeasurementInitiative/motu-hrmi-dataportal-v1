import React from 'react'
import SectionSelector from '../SectionSelector/'
import { joinClassName as jcn } from '../utils'
import styles from './styles.css'

export default class SubTopNav extends React.Component {
  constructor() {
    super()
    this.state = { open: false }
  }

  onButtonClick = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    const dropdownClassNames = jcn({
      'hide': !this.state.open,
      'dropdown': true,
    }, styles)

    return (
      <div className={styles.wrapper}>
        <div className={styles.selectorWrapper}><SectionSelector /></div>
        <div className={styles.btnHTR} onClick={this.onButtonClick}><span>HOW TO READ </span><span className={this.state.open ? styles.hide : styles.btnIcon}>&#43;</span><span className={this.state.open ? styles.btnIcon : styles.hide}>&#8722;</span></div>
        <div className={dropdownClassNames}>
          <p>Each country is represented by a radar chart, formed by twelve axes. Each axis stands for a right. The longer the axis, the better the performance of the country on that right.</p>
          <h4 className={styles.graphTitle}>Economic and Social Rights (ESR)</h4>
          <div className={styles.image1}>image1</div>
          <h4 className={styles.graphTitle}>Civil and Political Rights (CPR)</h4>
          <h6 className={styles.graphSubtitle}>(only available for 13 pilot countries)</h6>
          <p>The two sets of rights are evaluated on two different scales: on a percentage scale (ESR) and as a score out of 10 (CPR)</p>
          <div className={styles.image2}>image2</div>
          <div>
            <div className={styles.halfSplit}>
              <p>When CPR data are not available in a country, only ESR axes will be shown on the radar.</p>
              <div className={styles.image3}>image3</div>
            </div>
            <div className={styles.halfSplit}>
              <p>A dashed and greyed out axis means that there is no data available for that rights in that country.</p>
              <div className={styles.image4}>image4</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
