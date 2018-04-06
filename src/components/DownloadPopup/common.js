import { omitBy, mapKeys, mapValues } from 'lodash'
import fileSaver from 'file-saver'
import { exportGeography } from './geography'
import { exportRights } from './rights'

export const generateTitleFooter = ({ width, height, dataset, titleMarginMultiplier, footerMarginMultiplier }) => {
  const titleSize = height > 560 ? 22 : 14
  const title = `
    <g transform="translate(20, ${titleMarginMultiplier * titleSize * 2})">
      <text font-size="${titleSize}">
        <tspan fill="#58595b" font-weight="bold">${dataset.headerConstant}: </tspan>
        <tspan fill="#000000">${dataset.headerVariable}</tspan>
      </text>
    </g>
  `
  const footerSize = height > 560 ? 12 : 7
  const footer = `
    <g transform="translate(20, ${height - footerMarginMultiplier * footerSize * 2})" font-size="${footerSize}">
      <text fill="#58595b">${dataset.footer}</text>
      <text fill="#9a9a9a" transform="translate(0, ${footerSize + 2})">${dataset.source} https://humanrightsmeasurement.org</text>
    </g>
  `
  return { title, footer }
}

const exporters = {
  Geography: exportGeography,
  Rights: exportRights,
}

export const exportChart = async ({ svgChart, exploreBy, data, currentCountryCode, currentRight, content, currentRegion, dataset }) => {
  const svgChartCloned = svgChart.cloneNode(true)
  const exporter = exporters[exploreBy]

  svgChartCloned.setAttribute('version', '1.1')
  svgChartCloned.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  svgChartCloned.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xlink', 'http://www.w3.org/1999/xlink')
  svgChartCloned.style.fontFamily = 'sans-serif'
  svgChartCloned.querySelectorAll('text').forEach(text => {
    const n = (parseInt(text.getAttribute('font-size')) - 1) + 'px'
    text.setAttribute('font-size', n)
  })

  const { fileName, svgString, width, height } = exporter({ svgChart, currentCountryCode, svgChartCloned, data, currentRight, content, currentRegion, dataset })
  const svgData = encodeURIComponent(svgString)
  const canvas = await new Promise((resolve, reject) => {
    const image = new window.Image()
    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = width * 2
      canvas.height = height * 2
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
      resolve(canvas)
    }
    image.src = `data:image/svg+xml,${svgData}`
  })
  const blob = await new Promise((resolve, reject) => canvas.toBlob(resolve))
  return {
    fileName,
    exportedChart: blob,
  }
}

export const countryDataTabular = (data, countryCode) => {
  const rights = data.rightsByCountry[countryCode].rights
  const { esrCore, esrHI, cpr } = rights
  const tabularESR = {
    ...mapKeys(omitBy(esrCore, (v, k) => k.endsWith('_sub')), (v, k) => `${k}_core`),
    ...mapKeys(omitBy(esrHI, (v, k) => k.endsWith('_sub')), (v, k) => `${k}_high_income`),
  }
  const tabularCPR = mapValues(cpr || {}, v => v.mean)
  const tabularData = [
    { country_code: countryCode, ...tabularESR, ...tabularCPR },
  ]
  return tabularData
}

export const downloadFileWithContent = (fileName, content, mimeType = 'text/plain') => {
  const blob = new window.Blob([content], { type: `${mimeType};charset=utf-8` })
  fileSaver.saveAs(blob, fileName)
}
