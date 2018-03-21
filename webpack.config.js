const buildWebpackConfig = require('webpack-preset-accurapp')
const { css } = require('@webpack-blocks/assets')

module.exports = buildWebpackConfig([
  css.modules(),
])
