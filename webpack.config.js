require('dotenv').config();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  devServer: {
    port: process.env.PORT || 8080,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: process.env.API_URL,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      api: path.resolve(__dirname, 'src/api'),
      types: path.resolve(__dirname, 'src/types'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      utils: path.resolve(__dirname, 'src/utils'),
      configuration: path.resolve(__dirname, 'src/configuration'),
      providers: path.resolve(__dirname, 'src/providers'),
      pages: path.resolve(__dirname, 'src/pages'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Main Page',
      template: path.join(__dirname, 'src/index.html'),
    }),
    new TsconfigPathsPlugin({
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node-modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.tsx?$/,
        exclude: /node-modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
    ],
  },
};
