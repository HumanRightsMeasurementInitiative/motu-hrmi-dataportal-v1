import calcWidth from 'text-width'
import { sum } from 'lodash'
import { generateTitleFooter } from './common'

const esrLegend = ({ content, fontSizes, width }) => {
  const widths = [
    13, // first circle
    calcWidth(content.legend.esr_barchart[0]), // first legend
    13, // second circle
    calcWidth(content.legend.esr_barchart[1]), // second legend
  ]
  const totalWidth = sum(widths)
  return (
    `
      <g class="-legend">
        <g class="-circle-core" transform="translate(${width - totalWidth}, 15)">
          <circle r="7" fill="#00b95f" />
          <circle r="7" fill="#00b95f" />
          <text x=${sum(widths.slice(0, 1))} y="4" font-size=${fontSizes.text} fill="#58595b">
            ${content.legend.esr_barchart[0]}
          </text>
          <circle r="8" fill="#00b95f" cx="${sum(widths.slice(0, 2))}" />
          <circle r="4" fill="#00b95f" cx="${sum(widths.slice(0, 2))}" stroke-width="3" stroke="#fff" />
          <text y="4" font-size=${fontSizes.text} fill="#58595b" x=${sum(widths.slice(0, 3))}>
            ${content.legend.esr_barchart[1]}
          </text>
        </g>
      </g>
    `
  )
}

const cprLegend = ({ content, fontSizes, width }) => {
  const barHeight = 22
  const barVerticalBuffer = 2
  const barWidth = 8
  const firstLegend = content.legend.cpr_barchart[0]
  const secondLegend = `90th ${content.legend.cpr_barchart[1]}`
  const separator = '—'
  const widths = [
    calcWidth(firstLegend), // first legend
    calcWidth(separator),
    barWidth,
    calcWidth(separator),
    calcWidth(secondLegend), // second legend
  ]
  const totalWidth = sum(widths)
  return (
    `
      <g class="-legend">
        <g class="-circle-core" transform="translate(${width - totalWidth}, 0)">
          <text alignment-baseline="middle" text-anchor="start" font-size=${fontSizes.text} fill="#58595b">
            ${firstLegend}
          </text>
          <text alignment-baseline="middle" x=${sum(widths.slice(0, 1))} font-size=${fontSizes.text} fill="#58595b">
            ${separator}
          </text>
          <rect
            x=${sum(widths.slice(0, 2))}
            y=${barVerticalBuffer}
            width=${barWidth}
            height=${barHeight}
            fill="#3378ae"
          />
          <rect
            x=${sum(widths.slice(0, 2))}
            y=${-(barHeight + barVerticalBuffer)}
            width=${barWidth}
            height=${barHeight}
            fill="#3378ae"
          />
          <g transform="translate(${sum(widths.slice(0, 3))}, 0)">
            <text alignment-baseline="middle" font-size=${fontSizes.text} fill="#58595b" y=${barHeight}>
              ${separator}
            </text>
            <text alignment-baseline="middle" font-size=${fontSizes.text} fill="#58595b" y=${-(barHeight + barVerticalBuffer)}>
              ${separator}
            </text>
          </g>
          <g transform="translate(${sum(widths.slice(0, 4))}, 0)">
            <text alignment-baseline="middle" font-size=${fontSizes.text} fill="#58595b" y=${barHeight}>
              ${`10th ${content.legend.cpr_barchart[1]}`}
            </text>
            <text alignment-baseline="middle" font-size=${fontSizes.text} fill="#58595b" y=${-(barHeight + barVerticalBuffer)}>
              ${`90th ${content.legend.cpr_barchart[1]}`}
            </text>
          </g>
        </g>
      </g>
    `
  )
}

export const exportRights = ({ svgChart, currentRight, svgChartCloned, data, currentRegion, content, dataset, fontSizes }) => {
  const isCPR = currentRight.includes('-') // FIXME: Dirty
  const width = svgChartCloned.width.baseVal.value
  const height = svgChartCloned.height.baseVal.value
  const { title, footer } = generateTitleFooter({ height, dataset, width, titleMarginMultiplier: -0.5, footerMarginMultiplier: -1, fontSizes })

  const svgAppend = isCPR
    ? cprLegend({ content, fontSizes, width })
    : esrLegend({ content, fontSizes, width })
  console.log(svgAppend)
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
