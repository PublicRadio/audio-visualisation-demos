import webpack, { DefinePlugin, HotModuleReplacementPlugin} from 'webpack';

const {
    OccurenceOrderPlugin,
    DedupePlugin,
    UglifyJsPlugin,
    AggressiveMergingPlugin,
    } = webpack.optimize;

export const cache = true;
export const debug = true;

export const recordsPath = __dirname + '/_webpack.records.json';

export const stats = {
    colors: true,
    reasons: true
};
export const plugins = [
    new OccurenceOrderPlugin(),
    new DefinePlugin({
        'process.env.NODE_ENV': '"development"',
        '__DEV__': true
    }),
    new HotModuleReplacementPlugin()
];
export const resolve = {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
};
export const module = {
    preLoaders: [],
    loaders: [
        {
            test: /\.glsl?$/,
            exclude: /node_modules/,
            loader: 'shader-loader'
        },
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'react-hot-loader!babel-loader?optional[]=runtime&stage=0'
        }
    ]
};

export let entry = [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.js'
];

export const output = {
    publicPath: '/',
    path: './build',
    filename: 'index.js',
    chunkFilename: '[name]-[id].js'
};

export const devtool = 'source-map';