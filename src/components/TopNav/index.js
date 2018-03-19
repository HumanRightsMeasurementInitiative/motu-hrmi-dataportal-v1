import React from 'react'
import PropTypes from 'prop-types'
import LangSelector from '../LangSelector'
import NavItem from './NavItem'
import styles from './styles.css'

export default class TopNav extends React.Component {
  static propTypes = {
    content: PropTypes.object.isRequired,
  }

  render() {
    const { content } = this.props
    const menuText = content.menu
    return (
      <div className={styles.nav}>
        <div className={styles.langSelector}>
          <LangSelector withArrow={true} />
        </div>
        <NavItem label={menuText.about.title} labelKey='about'>
          <p className={styles.para}>{menuText.about.paragraphs[0]}</p>
          <p className={styles.para}>{menuText.about.paragraphs[1]}</p>
          <p className={styles.listLabel}>{menuText.about.paragraphs[2]}</p>
          <ul className={styles.list}>
            <li className={styles.listEl}>{menuText.about.list[0]}</li>
            <li className={styles.listEl}>{menuText.about.list[1]}</li>
          </ul>
          <p className={styles.para}>{menuText.about.paragraphs[3]}</p>
          <p className={styles.para}>{menuText.about.paragraphs[4]}</p>
          <div className={styles.linkWrapper}><a href='https://humanrightsmeasurement.org/about-hrmi/the-team/' target='_blank'>{menuText.about.links[0]}</a></div>
          <div className={styles.linkWrapper}><a href='https://humanrightsmeasurement.org/methodology/overview/' target='_blank'>{menuText.about.links[1]}</a></div>
          <div className={styles.linkWrapper}><a className={styles.link} href='https://humanrightsmeasurement.org/methodology/overview/' target='_blank'>{menuText.about.links[2]}</a></div>
        </NavItem>
        <NavItem label={menuText.methodology.title} labelKey='methodology'>
          <p className={styles.para}>{menuText.methodology.paragraphs[0]}</p>
          <p className={styles.para}>{menuText.methodology.paragraphs[1]}</p>
          <p className={styles.para}>{menuText.methodology.paragraphs[2]}</p>
          <div>{menuText.methodology.paragraphs[3]}</div>
          <ul className={styles.list}>
            <li className={styles.listEl}>
              <span className={styles.linkWrapper}><a href='https://humanrightsmeasurement.org/methodology/measuring-economic-social-rights/' target='_blank'>{menuText.methodology.links[0]}</a></span>
            </li>
            <li className={styles.listEl}>
              <span className={styles.linkWrapper}><a href='https://humanrightsmeasurement.org/methodology/measuring-civil-political-rights/' target='_blank'>{menuText.methodology.links[1]}</a></span>
            </li>
            <li className={styles.listEl}>
              <span className={styles.linkWrapper}><a href='https://humanrightsmeasurement.org/wp-content/uploads/2018/03/HRMI-Methodology-Note-2018.pdf' target='_blank'>{menuText.methodology.links[2]}</a></span>
            </li>
            <li className={styles.listEl}>
              <span className={styles.linkWrapper}><a href='https://ugeorgia.qualtrics.com/jfe/preview/SV_d71YagJrGqcMq4R?Q_CHL=preview' target='_blank'>{menuText.methodology.links[3]}</a></span>
              <span> {menuText.methodology.links[4]}</span>
            </li>
          </ul>
        </NavItem>
        <NavItem label={menuText.howToUse.title} labelKey='howToUse'>
          <p className={styles.para}>
            {menuText.howToUse.paragraphs[0]}
          </p>
          <ul className={styles.list}>
            <li className={styles.listEl}>{menuText.howToUse.list[0]}</li>
            <li className={styles.listEl}>{menuText.howToUse.list[1]}</li>
            <li className={styles.listEl}>{menuText.howToUse.list[2]}</li>
            <li className={styles.listEl}>{menuText.howToUse.list[3]}</li>
          </ul>
          <p className={styles.para}>{menuText.howToUse.paragraphs[1]} <a href='https://humanrightsmeasurement.org/get-involved/tell-us/' target='_blank'>{menuText.howToUse.links[0]}</a></p>
          <p className={styles.para}>{menuText.howToUse.paragraphs[2]}<br />{menuText.howToUse.paragraphs[3]}</p>
          <p className={styles.para}>{menuText.howToUse.paragraphs[4]} <a href='https://creativecommons.org/licenses/by/4.0/' target='_blank'>{menuText.howToUse.links[1]}</a>. {menuText.howToUse.paragraphs[5]} <a href='https://humanrightsmeasurement.org/' target='_blank'>{menuText.howToUse.links[2]}</a>.</p>
          <p className={styles.para}>{menuText.howToUse.paragraphs[6]}</p>
          <p className={styles.para}>{menuText.howToUse.paragraphs[7]} <a href='https://humanrightsmeasurement.org' target='_blank'>{menuText.howToUse.links[3]}</a></p>
          <p className={styles.para}>{menuText.howToUse.paragraphs[8]}</p>
          <ul className={styles.list}>
            <li className={styles.listEl}>{menuText.howToUse.list[4]} <a href='https://humanrightsmeasurement.org/' target='_blank'>{menuText.howToUse.links[4]}</a> {menuText.howToUse.list[5]}</li>
          </ul>
          <p className={styles.para}>
            {menuText.howToUse.paragraphs[9]}
          </p>
          <ul className={styles.list}>
            <li className={styles.listEl}>{menuText.howToUse.list[6]}</li>
          </ul>
          <p className={styles.para}>
            {menuText.howToUse.paragraphs[10]}
          </p>
          <ul className={styles.list}>
            <li className={styles.listEl}>{menuText.howToUse.list[7]}</li>
            <li className={styles.listEl}>{menuText.howToUse.list[8]}</li>
          </ul>
        </NavItem>
        <NavItem label={menuText.download.title} labelKey='download' buttonText={menuText.download.button}>
          <p className={styles.para}>{menuText.download.paragraphs[0]}</p>
          <p className={styles.para}>{menuText.download.paragraphs[1]} <a href='https://humanrightsmeasurement.org/' target='_blank'>{menuText.download.link}</a>.</p>
        </NavItem>
      </div>
    )
  }
}
