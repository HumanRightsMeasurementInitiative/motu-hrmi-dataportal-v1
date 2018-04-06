import { generateTitleFooter } from './common'

export const exportRights = ({ svgChart, currentRight, svgChartCloned, data, currentRegion, content, dataset }) => {
  const isCPR = currentRight.includes('-') // FIXME: Dirty
  const width = svgChartCloned.width.baseVal.value
  const height = svgChartCloned.height.baseVal.value
  const { title, footer } = generateTitleFooter({ height, dataset, width, titleMarginMultiplier: -0.5, footerMarginMultiplier: -1 })
  const svgAppend = isCPR
    ? `
      <g class="-legend">
        <image x="${width - 188 - 32}" y="0"
          href="data:image/png;base64,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">
      </g>
    `
    : `
      <g class="-legend">
        <g class="-circle-core" transform="translate(${width * 0.42}, 15)">
          <circle r="7" fill="#00b95f" />
          <text x="13" y="4" font-size="12" fill="#58595b">
            Core assessment standard
          </text>
        </g>

        <g class="-circle-high-income" transform="translate(${width * 0.62}, 15)">
          <circle r="8" fill="#00b95f" />
          <circle r="4" fill="#00b95f" stroke-width="3" stroke="#fff" />
          <text x="13" y="4" font-size="12" fill="#58595b">
            High income OECD country assessment standard
          </text>
        </g>
      </g>
    `
  svgChartCloned.style.height = svgChartCloned.height.baseVal.value * 1.2
  svgChartCloned.style.paddingTop = svgChartCloned.height.baseVal.value * 0.1
  svgChartCloned.height.baseVal.convertToSpecifiedUnits(svgChartCloned.height.baseVal.SVG_LENGTHTYPE_PX)
  svgChartCloned.height.baseVal.newValueSpecifiedUnits(svgChartCloned.height.baseVal.SVG_LENGTHTYPE_PX, svgChartCloned.height.baseVal.value * 1.4)
  svgChartCloned.insertAdjacentHTML('afterbegin', svgAppend)
  svgChartCloned.insertAdjacentHTML('beforeend', footer)
  svgChartCloned.insertAdjacentHTML('afterbegin', title)
  const svgString = new window.XMLSerializer().serializeToString(svgChartCloned)
  const currentRegionName = content.region_name[currentRegion]
  const fileName = `HRMIChart Right to ${currentRight} in Region ${currentRegionName}.png`
  return {
    fileName,
    svgString,
    width: svgChartCloned.width.baseVal.value,
    height: svgChartCloned.height.baseVal.value,
  }
}
