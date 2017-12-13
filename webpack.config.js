const buildWebpackConfig = require('webpack-preset-accurapp')
const { css } = require('webpack-blocks')

module.exports = buildWebpackConfig([
  css.modules(),
])
