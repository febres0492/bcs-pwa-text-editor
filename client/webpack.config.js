const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
    return {
        mode: 'development',
        entry: {
            main: './src/js/index.js',
            install: './src/js/install.js'
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html',
                title: 'Progressive Web App'
            }),
            new InjectManifest({
                swSrc: './src-sw.js',
                swDest: 'service-worker.js'
            }),
            new WebpackPwaManifest({
                name: 'Progressive Web App',
                short_name: 'PWA',
                description: 'My awesome Progressive Web App!',
                background_color: '#ffffff',
                crossorigin: 'use-credentials', 
                icons: [
                    {
                        src: path.resolve('src/images/logo.png'),
                        sizes: [96, 128, 192, 256, 384, 512] 
                    }
                ]
            })
        ],
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ],
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 9000,
            open: true, // Automatically open the browser
        },
    };
};