const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

let htmlPageNames = ['about', 'contact', 'not-found', 'pricing', 'services', 'signin'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: ['main']
  })
});

module.exports = {
  mode: "development",
  watch: true,
  entry: {
    main: "./src/js/main.js",
    testimonials: "./src/js/testimonials.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public")
  },
  plugins: [
    new HtmlWebpackPlugin({ 
      template: './src/index.html',
      chunks: ['main', 'testimonials']
    })
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
          "style-loader", //3. Inject styles into DOM
          "css-loader", //2. Turns css into commonjs
          "sass-loader" //1. Turns sass into css
        ]
      }
    ]
  }
};
