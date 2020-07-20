module.exports = {
  webpack: (config, {}) => {
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
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
    })
    return config
  }
}