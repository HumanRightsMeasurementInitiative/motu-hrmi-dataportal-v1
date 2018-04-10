import { omitBy, mapKeys, mapValues } from 'lodash'
import fileSaver from 'file-saver'
import { exportGeography } from './geography'
import { exportRights } from './rights'

const sizes = () => (
  Math.min(window.innerHeight, window.innerWidth) > 1100
    ? { title: 22, footer: 12, text: 14, width: 100 }
    : { title: 14, footer: 7, text: 10, width: 60 }
)

export const generateTitleFooter = ({ width, height, dataset, titleMarginMultiplier, footerMarginMultiplier, fontSizes }) => {
  const title = `
    <g transform="translate(20, ${titleMarginMultiplier * fontSizes.title * 2})">
      <text font-size="${fontSizes.title}">
        <tspan fill="#58595b" font-weight="bold">${dataset.headerConstant}: </tspan>
        <tspan fill="#000000">${dataset.headerVariable}</tspan>
      </text>
    </g>
  `
  const footer = `
    <g transform="translate(20, ${height - footerMarginMultiplier * fontSizes.footer * 2})" font-size="${fontSizes.footer * 1.3}">
      <text fill="#58595b">${dataset.footer}</text>
      <text fill="#9a9a9a" transform="translate(0, ${fontSizes.footer + 2})">${dataset.source} https://humanrightsmeasurement.org</text>
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
  const fontSizes = sizes()

  svgChartCloned.setAttribute('version', '1.1')
  svgChartCloned.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  svgChartCloned.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xlink', 'http://www.w3.org/1999/xlink')
  svgChartCloned.style.fontFamily = 'sans-serif'
  svgChartCloned.querySelectorAll('text').forEach(text => {
    const n = (parseInt(text.getAttribute('font-size')) - 1) + 'px'
    text.setAttribute('font-size', n)
  })

  const { fileName, svgString, width, height } = exporter({ svgChart, currentCountryCode, svgChartCloned, data, currentRight, content, currentRegion, dataset, fontSizes })
  const svgData = encodeURIComponent(svgString)
  const canvas = await new Promise((resolve, reject) => {
    const image = new window.Image()
    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.height = height * 2
      canvas.width = width * 2
      var scale = { x: 1, y: 1 }
      scale.x = (window.innerWidth - 10) / canvas.width
      scale.y = (window.innerHeight - 10) / canvas.height

      if (scale.x < 1 || scale.y < 1) {
        scale = '1, 1'
      } else if (scale.x < scale.y) {
        scale = scale.x + ', ' + scale.x
      } else {
        scale = scale.y + ', ' + scale.y
      }
      canvas.setAttribute('style', 'margin-top 50px; -ms-transform-origin: center top; -webkit-transform-origin: center top; -moz-transform-origin: center top; -o-transform-origin: center top; transform-origin: center top; -ms-transform: scale(' + scale + '); -webkit-transform: scale3d(' + scale + ', 1); -moz-transform: scale(' + scale + '); -o-transform: scale(' + scale + '); transform: scale(' + scale + ');')

      const ctx = canvas.getContext('2d')
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#58595b'
	  ctx.font = 'bold 22pt Source Sans Pro'
	  ctx.fillText(`${dataset.headerConstant}:`, 20, 40)
      ctx.fillStyle = '#000000'
	  ctx.font = '22pt Source Sans Pro'
	  ctx.fillText(dataset.headerVariable, ctx.measureText(dataset.headerVariable).width + 48, 40)
      resolve(canvas)
    }
    image.src = `data:image/svg+xml,${svgData}`
  })
  document.body.innerHTML = ''
  document.body.appendChild(canvas)
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
