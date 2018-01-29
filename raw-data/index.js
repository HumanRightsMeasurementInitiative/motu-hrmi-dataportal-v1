const _ = require('lodash')
const d3 = require('d3')
const XLSX = require('xlsx')

function sheetRows(sheet, columns = 'AZ', startFromRow = 0) {
  const [colStart, rowStart, colEnd, rowEnd] = sheet['!ref'].match(/([A-Z]+)(\d+):([A-Z]+)(\d+)/).slice(1)

  console.assert(colStart === columns[0] && colEnd === columns[1], `Warning! The number of columns has changed from the master format.`)

  const rows = _.range(parseInt(rowStart) + startFromRow, parseInt(rowEnd)).map((rowN) => {
    const row = {}
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(colN => {
      const cell = sheet[`${colN}${rowN}`]
      const value = cell ? cell.v : null
      row[colN] = value
    })
    return row
  })

  return rows
}

function ESRHighIncome() {
  const workbook = XLSX.readFile('esr-high-income.xlsx')
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]

  const rows = sheetRows(sheet, 'AS', 1).map(row => {
    const datum = {
      countryCode: row.C,
      year: row.B,
      isHighIncome: parseInt(row.D) === 1,
      isOECD: parseInt(row.E) === 1,
      geoRegion: row.F,
      GDP: row.G,
      SERF: row.H,
      rights: {
        food: row.I,
        food_derived: [row.J],
        education: row.K,
        education_derived: [row.L, row.M],
        health: row.N,
        health_derived: [row.O, row.P],
        work: row.Q,
        work_derived: [row.R, row.S],
      },
    }
    return datum
  })

  const countries = d3.nest()
    .key(d => d.countryCode)
    .rollup(countryYears => {
      const historical = d3.nest()
        .key(d => d.year)
        .rollup(ds => {
          console.assert(ds.length === 1, `WARNING: Duplicate year: ${JSON.stringify(ds, null, 2)}`)
          const d = _.pick(ds[0], 'year GDP SERF rights'.split(' '))
          return d
        })
        .object(countryYears)

      const current = historical['2015'] || {
        GDP: null,
        SERF: null,
        rights: {
          food: null,
          food_derived: null,
          education: null,
          education_derived: null,
          health: null,
          health_derived: null,
          work: null,
          work_derived: null,
        },
      }

      const countryData = _.pick(Object.values(countryYears)[0], 'countryCode isHighIncome isOECD geoRegion'.split(' '))
      return { ...countryData, ...current, historical }
    })
    .object(rows)

  return countries
}

console.log(ESRHighIncome())
