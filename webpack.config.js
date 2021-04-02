const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') /* Uso de Html en Webpack */
const MiniCssExtractPlugin = require('mini-css-extract-plugin') /* Uso de Css en Webpack */
const CopyPlugin = require('copy-webpack-plugin') /* Copiar archivos */

module.exports = {
    entry: './src/index.js', /* Entrada del proyecto */
    output: {
        path: path.resolve(__dirname, 'dist'), /* Salida del proyecto */
        filename: 'main.js', /* Nombre del archivo como debe de salir */
        /* mover los files al directori indicado */
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    resolve: {
        extensions: ['.js'] /* Archivos de extensiones a soportar por webpack */
    },
    module: {
        rules: [
            {/* Configuracion de lodaer babel */
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {/* Configuracion del loader de css */
                test: /\.css|.styl$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.png/,
                type: 'asset/resource' /* Path de webpack */
            },
            { /* Configuracion de fuentes */
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000, /* Limite del tamaño del archivo */
                        mimetype: "application/font-woff",
                        name: "[name].[ext]", /* Directorio de salida */
                        outputPath: "./assets/fonts/", /* Directorio publico */
                        publicPath: "./assets/fonts/", /* Avisar explicitamente si es un modulo */
                        esModule: false
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true, /* Injecta el html de manera automatica */
            template: './public/index.html',/* Donde agarro el archivo a transformar */
            filename: './index.html'   /* Salida y nombre del archivo */
        }),
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
                {/* (from) Directorio en donde se encuentran los archivos a mover*/
                    from: path.resolve(__dirname, "src", "assets/images"),
                    /* (to) Directorio en donde se moveran los archivos */
                    to: "assets/images"
                }
            ]
        })
    ]
}