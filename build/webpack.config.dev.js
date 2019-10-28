const path = require('path');
const EmitTemplatePlugin = require('../lib/plugins/EmitTemplatePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, '../dist')
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.txt$/,
        use: {
          loader: path.resolve(__dirname, '../lib/loaders/txt-loader.js'),
          options: {
            author: 'ZZH',
          }
        }
      }
    ],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   filename: path.resolve(__dirname, '../dist/bundle.html'),
    //   template: path.resolve(__dirname, '../static/test.html'),
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //   },
    //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    //   chunksSortMode: 'dependency'
    // }),
    new EmitTemplatePlugin(
      {
        template: path.resolve(__dirname, '../static/test.html'),
        output: path.resolve(__dirname, '../dist/bundle.html'),
        params: {
          title: 'test',
          author: 'ZZH'
        }
      }
    )
  ],

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
};