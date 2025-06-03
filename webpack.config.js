const path = require('path');
const package = require('./package.json');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (env, options) => {
  const devMode = options.mode === 'development';

  process.env.NODE_ENV = options.mode;

  return {
    mode: options.mode,
    entry: path.resolve(__dirname, './src/index.tsx'),
    output: {
      path: path.resolve(__dirname, './dist'),  // ← changed from ./docs to ./dist
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[contenthash].js',
      clean: true,
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      alias: {
        '@components': path.resolve(__dirname, 'src/components/'),
        '@constants': path.resolve(__dirname, 'src/constants/'),
        '@hooks': path.resolve(__dirname, 'src/hooks/'),
        '@services': path.resolve(__dirname, 'src/services/'),
        '@store': path.resolve(__dirname, 'src/store/'),
        '@styles': path.resolve(__dirname, 'src/styles/'),
        '@utils': path.resolve(__dirname, 'src/utils/'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/i,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
              },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.(woff|woff2|ttf|eot)$/,
          type: 'asset/resource',
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[contenthash].css',
        chunkFilename: devMode ? '[name].css' : '[name].[contenthash].css',
      }),
      new CopyPlugin({
  patterns: [
    {
      from: "public/**/*",
      globOptions: {
        ignore: ["**/index.html", "**/*.tif"], // <-- exclude .tif files
      },
    },
  ],
}),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        title: package.title,
        meta: {
          title: package.title,
          description: package.description,
          author: package.author,
          keywords: Array.isArray(package.keywords)
            ? package.keywords.join(',')
            : undefined,
          'og:title': package.name,
          'og:description': package.description,
          'og:url': package.homepage,
        },
        minify: {
          html5: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributese: true,
          useShortDoctype: true,
        },
      }),
    ].filter(Boolean),
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: true,
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
    },
  };
};
