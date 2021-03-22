const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

let htmlPageNames = ['index','about', 'contact', 'not-found', 'pricing', 'services', 'signin'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    favicon: './src/images/favicon.ico',
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
    new HtmlWebpackPlugin({ chunks: ['main'] })
  ].concat(multipleHtmlPlugins),
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        include: /images/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            emitFile: true,
            outputPath: "images",
            publicPath: "images"
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        include: /css-img/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            emitFile: true,
            outputPath: "images",
            publicPath: "../images"
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
