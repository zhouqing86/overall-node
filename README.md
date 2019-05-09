Review the NodeJS related Knowledge
===================

## Init a node project

`npm init` to init a NodeJS project

`npm install -D mocha` to install the mocha test framework

`npm test` to run the test.js

> Use `module.exports` and `let assert = require('assert')`

## Move the test.js

Move the file `test.js` from test directory to src/util and rename to "CommonUtil-test.js"

And then modify package.json to `mocha 'src/**/*-test.js'` to make `npm test` can run the test.

## Use import and export

mocha是node的构建工具，默认只支持commonJS的模块系统，即require，exports。 如何兼容ES6的模块import，export呢?

`npm install @babel/core @babel/register @babel/preset-env -D`安装了babel7。

而后项目目录下创建 .babelrc文件:

```
{
  "presets": [ "@babel/preset-env" ]
}
```

修改文件中的`var assert=require('assert')`为`import assert from 'assert'`。

修改`module.exports={reverse}`为`export { reverse }`。

注意 `export` 与 `export default`的区别是: 通过export方式导出，在导入时要加{ }，export default则不需要。

修改test执行脚本为`mocha --require @babel/register 'src/**/*-test.js'`，注意这里用的是`--require`，`--compilers`已经被废弃了。
