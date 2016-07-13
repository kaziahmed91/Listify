var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  hot: true,
  historyApiFallback: true,
  progress: true,
  quiet: false,
  host: '0.0.0.0',
  stats: {
    colors: true,
    timings: true
  }
}).listen(8080, '0.0.0.0', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Building modules to serve at localhost:8080');
});
