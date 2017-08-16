const path = require('path');

module.exports = {
  entry: './src/twse.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'twse.js',
    library: 'twse',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  },
  node: {
    dns: 'empty',
    net: 'empty'
  },
  resolve: {
    mainFields: ['browser', 'module', 'main']
  }
};
