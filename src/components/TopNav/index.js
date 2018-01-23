import React from 'react'
import NavItem from './NavItem'
import styles from './styles.css'

export default class TopNav extends React.Component {
  startDownload = () => {
    // start download dataset
  }

  render() {
    return (
      <div className={styles.nav}>
        <NavItem label={'About the initiative'}>
          <p className={styles.para}>The Human Rights Measurement Initiative (HRMI) is a unique collaborative venture between human rights practitioners, researchers, academics, and other human rights supporters.</p>
          <p className={styles.para}>Our goal is to produce the first and best comprehensive set of metrics for tracking the human rights performance of countries.</p>
          <p className={styles.listLabel}>Our 2018 data-set includes:</p>
          <ul className={styles.list}>
            <li className={styles.listEl}>Annual data on five economic and social rights for 120 to 180 countries (depending on the right) from 2005 to 2015.</li>
            <li className={styles.listEl}>Pilot data on seven civil and political rights for 13 countries covering the time period from January to June 2017.</li>
          </ul>
          <p className={styles.para}>Over time we aim to extend our civil and political rights data to the rest of the world, and expand our full set of data to include additional metrics.</p>
          <p className={styles.para}>Learn more about the Human Rights Measurement Initiative:</p>
          <div className={styles.linkWrapper}><a href="https://humanrightsmeasurement.org/about-hrmi/the-team/" target="_blank">Who are we?</a></div>
          <div className={styles.linkWrapper}><a href="https://humanrightsmeasurement.org/methodology/overview/" target="_blank">Read about our methodology</a></div>
          <div className={styles.linkWrapper}><a className={styles.link} href="https://humanrightsmeasurement.org/methodology/overview/" target="_blank">Visit the main HRMI website</a></div>
        </NavItem>
        <NavItem label={'Methodology'}>
          <p className={styles.para}>There is no one-size-fits-all methodology for measuring human rights performance, so we use different methodologies that are best tailored to each area. Wherever possible – e.g. in the area of economic and social rights – our methodologies use objective statistics produced by national governments and international agencies.</p>
          <p className={styles.para}>For civil and political rights, where violations often take place in secret and reporting is very patchy, we use an expert survey approach to get our information directly from the human rights experts who are monitoring events in each country.</p>
          <div>Learn more:</div>
          <ul className={styles.list}>
            <li className={styles.listEl}>
              <span>Get an overview of our methodology for measuring economic and social rights:</span>
              <div className={styles.linkWrapper}><a href="https://humanrightsmeasurement.org/methodology/measuring-economic-social-rights/" target="_blank">https://humanrightsmeasurement.org/methodology/ measuring-economic-social-rights/</a></div>
              <p className={styles.para}></p>
            </li>
            <li className={styles.listEl}>
              <span>Get an overview of our methodology for measuring civil and political rights:</span>
              <div className={styles.linkWrapper}><a href="https://humanrightsmeasurement.org/methodology/measuring-civil-political-rights/" target="_blank">https://humanrightsmeasurement.org/methodology/ measuring-civil-political-rights/</a></div>
              <p className={styles.para}></p>
            </li>
            <li className={styles.listEl}>
              <span>Read our more in-depth methodology handbook:</span>
              <div className={styles.linkWrapper}><a href="#" target="_blank">#</a></div>
              <p className={styles.para}></p>
            </li>
            <li className={styles.listEl}>
              <span>See the HRMI expert survey for civil and political rights (please note this is a link to a preview of the survey only, and any responses you make will not be collected):</span>
              <div className={styles.linkWrapper}><a href="https://humanrightsmeasurement.org/methodology/survey/" target="_blank">https://humanrightsmeasurement.org/methodology/ survey/</a></div>
              <p className={styles.para}></p>
            </li>
          </ul>
        </NavItem>
        <NavItem label={'How To Use'}>
          <p className={styles.para}>
            There are lots of ways that you can use Human Rights Measurement Initiative (HRMI) data.
            <br />
            These include:
          </p>
          <ul className={styles.list}>
            <li className={styles.listEl}>in advocacy and publicity campaigns</li>
            <li className={styles.listEl}>to hold governments to account</li>
            <li className={styles.listEl}>to help identify policies that work to advance human rights</li>
            <li className={styles.listEl}>to stimulate competition for a “race to the top” (that is, to encourage countries to perform as well in human rights as they possibly can)</li>
          </ul>
          <p className={styles.para}>As an example, we’ve created country narratives that draw on these data for Mexico [insert hyperlink] and Australia [insert hyperlink]. We would love to hear how you are using our data. Please let us know here:<br /><a href="https://humanrightsmeasurement.org/get-involved/tell-us/" target="_blank">https://humanrightsmeasurement.org/get-involved/tell-us/</a></p>
          <p className={styles.para}>You can download HRMI charts and data by clicking on the download icon at the bottom left of each screen.<br />We ask that you take care to ensure that you understand the data and what they are showing, so that you do not misrepresent them.</p>
          <p className={styles.para}>We want to make our work freely available to everyone, so all HRMI data, charts, and text are licensed under a <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">Creative Commons Attribution 4.0 copyright licence</a>. This means that you are welcome to reuse what we have created as long as you attribute the Human Rights Measurement Initiative and link back to <a href="https://humanrightsmeasurement.org/" target="_blank">our website</a>.</p>
          <p className={styles.para}>In charts, where space is limited, please reference the source as follows:<br />Source: 2018 Human Rights Measurement Initiative (HRMI) dataset <a href="https://humanrightsmeasurement.org" target="_blank">https://humanrightsmeasurement.org</a></p>
        </NavItem>
        <NavItem label={'Download Dataset'} onDownloadClick={this.startDownload}>
          <p className={styles.para}>You are welcome to use data and charts produced by the Human Rights Measurement Initiative (HRMI) for your advocacy or research. However, we ask that you take care to ensure that you understand the data and what they are showing, so that you do not misrepresent them.</p>
          <p className={styles.para}>Please attribute the Human Rights Measurement Initiative and link back to our website (https://humanrightsmeasurement.org/).</p>
        </NavItem>
      </div>
    )
  }
}
