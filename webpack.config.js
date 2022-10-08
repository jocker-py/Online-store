const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const pluginsAll = () => {
  const plugins = [
    new HtmlWebpackPlugin({
      title: 'Online-store',
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      noUiSlider: 'nouislider'
  }),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns : [
        {
          from: path.resolve(__dirname, 'src/assets/img/categories'),
          to: "[path][name][ext]",
        }
      ]
    }
    )
  ];
  return plugins;
};

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  mode: 'development',
  devServer: {
      historyApiFallback: true,
      open: true,
      compress: true,
      port: 8109,
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  plugins: pluginsAll(),
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
};
