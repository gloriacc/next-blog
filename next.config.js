// import path from 'path';
const path = require('path')
module.exports = {
  webpack: (config, {}) => {
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|ico)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[contenthash].[ext]',
            outputPath: 'static',
            publicPath: '_next/static'
          }
        }
      ]
    }, {
      test: /\.svg$/,
      use: [
        {
          loader: 'svg-sprite-loader',
          options: {}
        }
      ]
    }, {
      test: /\.svg$/,
      use: [
        {
          loader: 'svgo-loader',
          options: {
            plugins: [
              {removeAttrs: {attrs: 'fill'}},
            ]
          }
        }
      ]
    });
    return config
  }
}