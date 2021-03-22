const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

let htmlPageNames = ['index','about-us', 'contact', 'not-found', 'pricing', 'services', 'signin'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    minify: {
      removeAttributeQuotes: true,
      collapseWhitespace: true,
      removeComments: true
    },
  })
});

module.exports = {
  mode: "production",
  entry: {
    main: "./src/js/main.js",
    testimonials: "./src/js/testimonials.js"
  },
  output: {
    filename: "js/[name].[contentHash].bundle.js",
    path: path.resolve(__dirname, "public")
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin()
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "css/[name].[contentHash].css" }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['main']
    })
  ].concat(multipleHtmlPlugins),
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(svg|png|jpg|gif)$/i,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "images",
            esModule: false,
          //   limit: 10000,
          //   emitFile: true,
          //   useRelativePath: true
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, //3. Extract css into files
          "css-loader", //2. Turns css into commonjs
          "sass-loader" //1. Turns sass into css
        ],
      }
    ]
  }
};
