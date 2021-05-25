# Webpack
webpack is an open-source JavaScript module bundler. It is made primarily for JavaScript, but it can transform front-end assets such as HTML, CSS, and images if the corresponding loaders are included. webpack takes modules with dependencies and generates static assets representing those modules

##### Table of Contents
[Loaders](#loaders)<br>
[Plugins](#plugin)<br>
[Build Performance](#build-performance)<br>
[HMR](#hmr)<br>
[Shimming](#shimming)<br>
[Web workers](#web-workers)<br>
[Progressive Web Application](#progressive-web-application)<br>


## Why webpack
There are two ways to run JavaScript in a browser. <br>
`First` - include a script for each functionality; this solution is hard to scale because loading too many scripts can cause a network bottleneck. <br>
`second` - option is to use a big .js file containing all your project code, but this leads to problems in scope, size, readability and maintainability


``` yarn add webpack webpack-dev-server webpack-cli --dev ```

Note : Incase if win32 related error is coming  ```yarn config set ignore-engines true```

`webpack-dev-server` - it used for local development, it already have all the basic configuration which required for development and  we can use this  with serve tool

```
# both are equal
Entry :
module.exports = {
  entry: './path/to/my/entry/file.js',
};

module.exports = {
  entry: {
    main: './path/to/my/entry/file.js',
  },
};
```
```
// multiple entry points
module.exports = {
  entry: {
    app: './src/app.js',
    adminApp: './src/adminApp.js'
  }
};

```
```
const webpack = require('webpack'); //to access webpack runtime
const configuration = require('./webpack.config.js');

let compiler = webpack(configuration);

```
If you need multiple bundles for multiple HTML pages you can use the "multiple entry points" feature. It will build multiple bundles at once. Additional chunks can be shared between these entry chunks and modules are only built once.

### Loaders
Out of the box, webpack only understands JavaScript and JSON files. Loaders allow webpack to process other types of files and convert them into valid modules that can be consumed by your application and added to the dependency graph
They allow you to pre-process files as you import or “load” them

**Main Points :**
* **A chain is executed in reverse order.** The first loader passes its result (resource with applied transformations) to the next one, and so forth. Finally, webpack expects JavaScript to be returned by the last loader in the chain. <br>
==> Loaders are evaluated/executed from right to left (or from bottom to top). In the example below execution starts with sass-loader, continues with css-loader and finally ends with style-loader
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // [style-loader](/loaders/style-loader)
          { loader: 'style-loader' },
          // [css-loader](/loaders/css-loader)
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          // [sass-loader](/loaders/sass-loader)
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
};
```
* Loaders can be synchronous or asynchronous.
* Loaders run in Node.js and can do everything that’s possible there.
* Loaders can emit additional arbitrary files

**At a high level, loaders have two properties in your webpack configuration:**

* The test property identifies which file or files should be transformed.
* The use property indicates which loader should be used to do the transforming.

```
module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },

```

_Hey webpack compiler, when you come across a path that resolves to a '.txt' file inside of a
require()/import statement, use the raw-loader to transform it before you add it to the bundle._

### Plugin

Plugins can give loaders more features. While loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks like bundle optimization, asset management and injection of environment variables.

Plugins are the backbone of webpack. webpack itself is built on the same plugin system that you use in your webpack configuration!

you can use a plugin multiple times in a configuration for different purposes, you need to create an instance of it by calling it with the new operator.

`ProgressPlugin` - is used to customize how progress should be reported during compilation

```
new webpack.ProgressPlugin().apply(compiler);

compiler.run(function (err, stats) {
  // ...
});

```

`CleanWebpackPlugin` - used for cleaning dist folder after every build <br>
`webpackmanifestplugin` - [stackoverflow link](https://stackoverflow.com/questions/57661590/purpose-of-webpack-manifest-plugin-in-webpack)

###Configuration
`devtool: 'inline-source-map'` - might it show error on console with file name and line no.

**There are a couple of different options available in webpack that help you automatically compile your code whenever it changes** <br>
`webpack's Watch Mode` - You can instruct webpack to "watch" all files within your dependency graph for changes. If one of these files is updated, the code will be recompiled so you don't have to run the full build manually

`webpack-dev-server` - The webpack-dev-server provides you with a simple web server and the ability to use live reloading. Let's set it up:Now we can run npm start from the command line and we will see our browser automatically loading up our page

`webpack-dev-middleware` - webpack-dev-middleware is a wrapper that will emit files processed by webpack to a server. This is used in webpack-dev-server internally,however it's available as a separate package to allow more custom setups if desired

`publicPath: '/static'` - will be used in provide all the files as static url
                          The publicPath will be used within our server script as well in order to make sure files are served correctly on http://localhost:3000/static/

###[Code spliting](https://webpack.js.org/guides/code-splitting/)
**There are three general approaches to code splitting available** <br>
`Entry Points` - Manually split code using entry configuration.pitfalls: it put duplicate code in all entry point. like lodash code <br>
there are some pitfalls to this approach:
* If there are any duplicated modules between entry chunks they will be included in both bundles.
* It isn't as flexible and can't be used to dynamically split code with the core application logic


`Prevent Duplication` - The dependOn option allows to share the modules between the chunks:
```
 module.exports = {
   mode: 'development',
   entry: {
    index: './src/index.js',
    another: './src/another-module.js',
    index: {
      import: './src/index.js',
      dependOn: 'shared',
    },
    another: {
      import: './src/another-module.js',
      dependOn: 'shared',
    },
    shared: 'lodash',
   }
```

use shared: 'lodash', in entry to create different chunk of lodash and we can use  dependOn: 'shared', on both entry point.. runtimeChunk: 'single' in optimization option of webpack <br>
`Note` - If we're going to use multiple entry points on a single HTML page, optimization.runtimeChunk: 'single' is needed too
optimization: {
    runtimeChunk: 'single',
  },

`SplitChunksPlugin` - allows us to extract common dependencies into an existing entry chunk or an entirely new chunk by own itself, here we don't need to add dependOn on each entry point. it will find that ownself
```
optimization: {
     splitChunks: {
       chunks: 'all',
     },
   }

```
we should now see the duplicate dependency removed from our index.bundle.js and another.bundle.js. The plugin should notice that we've separated lodash out to a separate chunk and remove the dead weight from our main bundle

`Dynamic Imports` - Split code via inline function calls within modules.

###Caching
Below piece of code will generate different chunk for node_modules folder as vendor chunk and reduce the main chunk
```
optimization: {
      runtimeChunk: 'single',
     splitChunks: {
       cacheGroups: {
         vendor: {
           test: /[\\/]node_modules[\\/]/,
           name: 'vendors',
           chunks: 'all',
         },
       },
     },
    },

```
and if we use ```moduleIds: 'deterministic',``` will not update hash for vendor chunk

### [Build performance](https://webpack.js.org/guides/build-performance/)
`Worker Pool` - The thread-loader can be used to offload expensive loaders to a worker pool <br>
`parallel-webpack` - It allows for compilation in a worker pool(thread worker). <br>
`cache-loader` - The cache can be shared between multiple compilations.

### HMR
If you took the route of using webpack-dev-middleware instead of webpack-dev-server, please use the webpack-hot-middleware package to enable HMR on your custom server or application.

### webpack-merge
will be used to merge common configs into multiple main configs.

### DefinePlugin
to use inject variable to a global level

* `TerserPlugin` - the TerserPlugin is a great place to start for minification and being used by default, there are other options out there `closure-webpack-plugin`

### shimming
plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash', or  join: ['lodash', 'join'],
    }),
  ],

ProvidePlugin - it expose _ variables through out the app.

### Web workers
you can use Web Workers without worker-loader
```
new Worker(new URL('./worker.js', import.meta.url))
const worker = new Worker(new URL('./deep-thought.js', import.meta.url));
worker.postMessage({
  question:
    'The Answer to the Ultimate Question of Life, The Universe, and Everything.',
});
worker.onmessage = ({ data: { answer } }) => {
  console.log(answer);
};
```

### progressive-web-application
it is the technique through which we serve the urls from service worker thread and it will cache the that url at very first time

```
const WorkboxPlugin = require('workbox-webpack-plugin');

new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
    }),

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}
```

### mocha-webpack
to be continue...

### karma-webpack
to be continue...





### Now add webpack.config.file (cient.dev.js)
