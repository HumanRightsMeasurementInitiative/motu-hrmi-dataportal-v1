import { generateTitleFooter } from './common'
import { RIGHTS_ORDER, PETALS_COLORS } from 'lib/constants'
import { displayRightValue } from 'components/utils'
import * as d3 from 'd3'

const SIZE = window.innerHeight - 290

const wrapperCreator = width => text => {
  // see https://bl.ocks.org/mbostock/7555321 as ref, but the logic is pretty simple
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.style = { position: 'absolute', opacity: 0 }
  svg.appendChild(text)
  document.body.appendChild(svg)
  const element = d3.select(text)
  const words = element.text().split(/\s+/).reverse()
  let line = []
  let lineNumber = 1
  const lineHeight = 1.1
  const y = element.attr('y')
  const dy = parseFloat(element.attr('dy'))
  let tspan = element.text(null).append('tspan').attr('x', 0).attr('y', y).attr('dy', dy + 'em')
  while (words.length !== 0) {
    const word = words.pop()
    line.push(word)
    tspan.text(line.join(' '))
    if (tspan.node().getComputedTextLength() > width) {
      line.pop()
      tspan.text(line.join(' '))
      line = [word]
      tspan = element.append('tspan').attr('x', 0).attr('y', y).attr('dy', lineNumber * lineHeight + dy + 'em').text(word)
      lineNumber++
    }
  }
  const height = lineNumber * lineHeight
  const html = element.node().outerHTML
  d3.select(svg).remove()
  return { height, html }
}

const generateLabel = (content, fontSize) => {
  const names = RIGHTS_ORDER.map(k => content.rights_name_short[k])
  const surfaceSize = SIZE
  const o = surfaceSize / 2
  const r = surfaceSize / 4 + 30
  const wrapper = wrapperCreator(100)
  return (datum, idx, allData) => {
    const name = names[idx]
    const anchor = idx === 0 || idx === 6 ? 'middle' : idx > 6 ? 'end' : 'start'
    const value = displayRightValue(allData, idx)
    const color = PETALS_COLORS[idx]
    const a = 360 / 12 * idx
    const radA = a / 360 * 2 * Math.PI
    const x = o + Math.sin(radA) * r
    const y = o - Math.cos(radA) * r
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    text.setAttribute('y', 0)
    text.setAttribute('dy', 0)
    text.setAttribute('text-anchor', anchor)
    text.textContent = name
    const { height, html } = wrapper(text)
    const valueDy = `${height}em`
    return (
      `
        <g transform="translate(${x}, ${y})" font-size=${fontSize}>
          ${html}
          <text dy=${valueDy} fill="${color}" font-weight="bold" text-anchor=${anchor}>${value}</text>
        </g>
      `
    )
  }
}

export const exportGeography = ({ svgChart, currentCountryCode, svgChartCloned, data, dataset, content }) => {
  if (!currentCountryCode) return // Makes no sense to download the entire country grid
  const height = svgChartCloned.height.baseVal.value
  const width = svgChartCloned.width.baseVal.value
  const fontSize = height > 560 ? 14 : 10
  const labels = dataset.rightsData.map(generateLabel(content, fontSize))
  const { title, footer } = generateTitleFooter({ height, dataset, width, titleMarginMultiplier: +1, footerMarginMultiplier: 1 })
  const svgHtml = `<g>${labels}</g>`
  const currentCountryName = data.rightsByCountry[currentCountryCode].countryName
  svgChartCloned.insertAdjacentHTML('beforeend', svgHtml)
  svgChartCloned.insertAdjacentHTML('beforeend', footer)
  svgChartCloned.insertAdjacentHTML('afterbegin', title)
  const svgString = new window.XMLSerializer().serializeToString(svgChartCloned)
  const fileName = `HRMIChart Human rights performance in ${currentCountryName}.png`
  return {
    fileName,
    svgString,
    width: svgChartCloned.width.baseVal.value,
    height: svgChartCloned.height.baseVal.value,
  }
}
