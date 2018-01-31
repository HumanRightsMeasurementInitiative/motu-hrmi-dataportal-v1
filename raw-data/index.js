const fs = require('fs')
const _ = require('lodash')
const d3 = require('d3')
const XLSX = require('xlsx')

const CPR_MAPPING = {
  Angola: 'AGO',
  Australia: 'AUS',
  Brazil: 'BRA',
  Fiji: 'FJI',
  Kazakhstan: 'KAZ',
  Kyrgyzstan: 'KGZ',
  Liberia: 'LBR',
  Mexico: 'MEX',
  Mozambique: 'MOZ',
  Nepal: 'NPL',
  NewZealand: 'NZL',
  SaudiArabia: 'SAU',
  UnitedKingdom: 'GBR',
}

function round(float) {
  return parseFloat(parseFloat(float).toFixed(1))
}

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
      countryName: row.A,
      countryCode: row.C,
      year: row.B,
      isHighIncome: parseInt(row.D) === 1,
      isOECD: parseInt(row.E) === 1,
      geoRegion: row.F,
      GDP: round(row.G),
      SERF: round(row.H),
      rights: {
        food: round(row.I),
        food_sub: {
          childrenNourishment: null,
          normalBirthweightInfants: round(row.J),
        },
        education: round(row.K),
        education_sub: {
          combinedSchoolEnrollment: round(row.L),
          educationQuality: round(row.M),
          primarySchoolCompletion: null,
        },
        work: round(row.Q),
        work_sub: {
          notLongTermUnemployed: round(row.R),
          notRelativelyPoor: round(row.S),
          notAbsolutelyPoor: null,
        },
        housing: null,
        housing_sub: {
          improvedSanitation: null,
          improvedRuralWater: null,
        },
        health: round(row.N),
        health_sub: {
          cildSurvival: round(row.O),
          survivalToAge65: round(row.P),
          contraceptiveUseScore: null,
        },
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

      const current = historical['2015'] || null

      const countryData = _.pick(Object.values(countryYears)[0], 'countryCode isHighIncome isOECD geoRegion'.split(' '))
      return { ...countryData, ...current, historical }
    })
    .object(rows)

  return countries
}

function ESRCore() {
  const workbook = XLSX.readFile('esr-core.xlsx')
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]

  const rows = sheetRows(sheet, 'AV', 1).map(row => {
    const datum = {
      countryName: row.A,
      countryCode: row.C,
      year: row.B,
      isHighIncome: parseInt(row.E) === 1,
      isOECD: parseInt(row.F) === 1,
      geoRegion: row.D,
      GDP: round(row.H),
      SERF: round(row.G),
      rights: {
        food: round(row.I),
        food_sub: {
          childrenNourishment: round(row.J),
          normalBirthweightInfants: null,
        },
        education: round(row.R),
        education_sub: {
          combinedSchoolEnrollment: round(row.S),
          educationQuality: null,
          primarySchoolCompletion: round(row.T),
        },
        work: round(row.U),
        work_sub: {
          notLongTermUnemployed: null,
          notRelativelyPoor: null,
          notAbsolutelyPoor: round(row.V),
        },
        housing: round(row.K),
        housing_sub: {
          improvedSanitation: round(row.L),
          improvedRuralWater: round(row.M),
        },
        health: round(row.N),
        health_sub: {
          cildSurvival: round(row.O),
          survivalToAge65: round(row.P),
          contraceptiveUseScore: round(row.Q),
        },
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

      const current = historical['2015'] || null

      const countryData = _.pick(Object.values(countryYears)[0], 'countryCode isHighIncome isOECD geoRegion'.split(' '))
      return { ...countryData, ...current, historical }
    })
    .object(rows)

  return countries
}

function CPR() {
  const csvText = fs.readFileSync('cpr.csv', 'utf-8')
  const rows = d3.csvParse(csvText)
  const countries = rows.map(row => {
    const getRight = rightCode => ({
      mean: parseFloat(row[`${rightCode}_mean`]),
      percentile10: parseFloat(row[`${rightCode}_10`]),
      percentile90: parseFloat(row[`${rightCode}_90`]),
    })

    const countryCode = CPR_MAPPING[row.country]

    if (!countryCode) throw new Error(`Missing CPR_MAPPING country code: '${row.country}'`)

    const datum = {
      countryCode,
      rights: {
        opinionAndExpression: getRight('express'),
        assemblyAndAssociation: getRight('assem_assoc'),
        assemblyAndAssociation_sub: {
          assembly: getRight('assem'),
          association: getRight('assoc'),
        },
        participateInGovernment: getRight('polpart'),
        freedomFromTorture: getRight('tort'),
        freedomFromExecution: getRight('execution'),
        freedomFromExecution_sub: {
          freedomFromTheDeathPenalty: getRight('dpex'),
          freedomFromExtrajudicialExecution: getRight('exkill'),
        },
        freedomFromArbitraryArrest: getRight('arrest'),
        freedomFromDisappearance: getRight('disap'),
      },
    }
    return datum
  })

  return _.keyBy(countries, 'countryCode')
}

const esrHI = ESRHighIncome()
const esrCore = ESRCore()
const cpr = CPR()

const countryCodesList = Object.keys(esrHI)

const catalogCountries = []

const joinedCountries = countryCodesList.map(countryCode => {
  const countryEsrHI = esrHI[countryCode]
  const countryEsrCore = esrCore[countryCode]
  const countryCpr = cpr[countryCode] || { rights: null }

  const countryInfo = _.pick(countryEsrHI, [
    'countryCode',
    // 'countryName',
    // 'GDP',
    // 'SERF',
  ])
  const rights = {
    esr_hi: countryEsrHI.rights,
    esr_hi_historical: countryEsrHI.historical,
    esr_core: countryEsrCore.rights,
    esr_core_historical: countryEsrCore.historical,
    cpr: countryCpr.rights,
  }

  const countryCatalog = _.pick(countryEsrHI, [
    'countryCode',
    'isHighIncome',
    'isOECD',
    'geoRegion',
  ])
  countryCatalog.geoRegion = countryCatalog.geoRegion.replace('_', '-')
  catalogCountries.push(countryCatalog)

  return { ...countryInfo, rights }
})

const joinedCountriesByCountry = _.keyBy(joinedCountries, 'countryCode')

const catalogCountriesByRegion = d3.nest()
  .key(c => c.geoRegion)
  .rollup(cs => cs.map(c => c.countryCode))
  .object(catalogCountries)
const catalogCountriesHI = catalogCountries.filter(c => c.isHighIncome).map(c => c.countryCode)
const catalogCountriesOECD = catalogCountries.filter(c => c.isOECD).map(c => c.countryCode)

const regions = {
  ...catalogCountriesByRegion,
  'high-income': catalogCountriesHI,
  oecd: catalogCountriesOECD,
}

const indent = 2
fs.writeFileSync('../src/data/rights-by-country.json', JSON.stringify(joinedCountriesByCountry, null, indent))
fs.writeFileSync('../src/data/country-categories.json', JSON.stringify(regions, null, indent))

console.log(`
Written data files:
  • ../src/data/rights-by-country.json: Rights data for each country
  • ../src/data/country-categories.json: Countries grouped by category (geographical or political)
`)
