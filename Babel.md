
# Babel
 babel used for transpile the es6 or latest code to previous or es5 code so that code would be runnable to all browser 
```
yarn add  babel-core babel-loader babel-preset-es2015 --dev
yarn add babel-plugin-transform-object-rest-spread --dev
```
### In Depth
we want to install other tools that serve as an interface to @babel/core and integrate well with your development process

`plugin` - it simple transpiler for specific syntax, we can create own as well
 
 * `@babel/plugin-transform-arrow-functions` - To transform ES2015+ arrow function into ES5 normal function
 * `babel-plugin-transform-object-rest-spread` - This plugin allows Babel to transform rest properties for object destructuring assignment and spread properties for object literals. it support following syntax -> z = { x, ...y };
 * `@babel/plugin-transform-runtime` - It might support run time import statement
 * [@babel/plugin-proposal-class-properties](https://medium.com/@jacobworrel/babels-transform-class-properties-plugin-how-it-works-and-what-it-means-for-your-react-apps-6983539ffc22) - it something like bind the other function as well like arrow function defind function which we have not mentioned in constructor. By default only those function would be the part of class which defined in class constructor only but with the plugin every thing will transpile which written in class
 * `@babel/plugin-transform-export-extensions`- handle export v from "mod";
 * `@babel/plugin-proposal-export-namespace-from` - export * as ns from "mod";
 * `@babel/plugin-transform-template-literals : tag` - \unicode and \u{55}`; 
 * [@babel/plugin-proposal-decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators.html) : it handle annotation
 * `@babel/plugin-proposal-pipeline-operator` - 
 * `@babel/plugin-async-to-generator` - 
 * `@babel/register` - (babel-core/registe has been remoed in babel7):will also now only compile files in the current working directly (was done to fix issues with symlinking).
 
`preset` - set of plugins, we can create own as well

* `@babel/core` - The core functionality of Babel resided in this, Earlier the name was babel-core now they have changed the name only in package.json, repo is still same 
* `babel-loader` - It just load the file in webpack for defined extension
* `@babel/preset-react` - It is set of plugins (which transpile react related stuff to js and to es5 as well)
* `@babel/preset-typescript` - it is used for converting typescript files into es5 module
* `@babel/preset-env` - Without any configuration, this preset will include all plugins to support modern JavaScript (ES2015, ES2016, etc.)
* `@babel/polyfill` - Using this plugin we can use use new built-ins like Promise or WeakMap
* `@babel/preset-flow` - Flow is a static type checker for your JavaScript code. It does a lot of work to make you more productive. Making you code faster, smarter, more confidently, and to a bigger scale.
                         
   Flow checks your code for errors through static type annotations. These types allow you to tell Flow how you want your code to work, and Flow will make sure it does work that way.
                         
   Because Flow understands JavaScript so well, it doesn’t need many of these types. You should only ever have to do a minimal amount of work to describe your code to Flow and it will infer the rest. A lot of the time, Flow can understand your code without any types at all.
   ```
      // @flow
      function square(n) {
        return n * n; // Error!
      }
  
    square("2");
  ```


> Now luckily for us, we're using the env preset which has a "useBuiltIns" option that when set to "usage" will practically apply the last optimization mentioned above where you only include the polyfills you need. With this new option the configuration changes like this:

==> In case if we want to add manually any thing for babel polyfill then we can use like this:
                  
```
require("core-js/modules/es.promise.finally"); 
    Promise.resolve().finally(); 
``` 

###check applied babel configuration
we can also check applied babel configuration using below command
```
BABEL_SHOW_CONFIG_FOR=./src/myComponent.jsx npm start
```

###Stages of babel deployement and development
As mostly elaborated by other answers. Stage 4 is most Stable and Stage 0, the most dangerous. Here is a bit of a breakdown at a high level for the 5 stages from the previous answers and the documentation. I'm adding this because when I came to this I was expecting a more high-level break down of what each stage is:

`Stage 4`: Finished
Ready for inclusion in ECMAScript Standard, has passed testing and will be part of the next revision

`Stage 3`: Candidate
Includes a full spec text and includes plugins that have mostly been tested and provided with feedback. Solution is complete and all further changes are based on implementation experience.

`Stage 2`: Draft
Further support for plugins completed as much as possible. Requirements for these are met mostly with only incremental changes on the way. Semantics and api is expected to be complete. It will most likely become part of the spec.

`Stage 1`: Proposal A concept that has been discovered and selected to be examined at this phase mostly poly-fills and demos are expected.

`Stage 0`: Strawman This name made me chuckle according to the TC-39 it kind of doesn't have any sort of bound but given the context it is the category for concepts that have not been selected to be followed up on or examined.
Each level is inclusive whereas 4 includes 3 includes 2 and so on... I hope that this summation helps someone in the future.


### Preference and overwritten of babel configuration
babel.config.json < .babelrc < programmatic options from @babel/cli
> In other words, babel.config.json is overwritten by .babelrc, and .babelrc is overwritten by programmatic options.
 
### Plugin Ordering
Ordering matters for each visitor in the plugin.
This means if two transforms both visit the "Program" node, the transforms will run in either plugin or preset order.
##### Plugins run before Presets.
##### Plugin ordering is first to last.
##### Preset ordering is reversed (last to first).

Will run transform-decorators-legacy then transform-class-properties.
```
{
  "plugins": ["transform-decorators-legacy", "transform-class-properties"]
}
```

Will run in the following order: @babel/preset-react then @babel/preset-env
```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```








