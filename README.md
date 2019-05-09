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

## Babel7 + ES6 import and export

mocha是node的构建工具，默认只支持commonJS的模块系统，即require，exports。 如何兼容ES6的模块import，export呢?

`npm install @babel/core @babel/register @babel/preset-env -D`安装了babel7。

而后项目目录下创建 .babelrc文件:

```
{
  "presets": [ "@babel/preset-env" ]
}
```

修改文件中的`var assert=require('assert')`为`import assert from 'assert'`, 以及`import {reverse} from './CommonUtil'。

修改`module.exports={reverse}`为`export { reverse }`。如果不修改，为了支持`import {reverse}`，可以使用`module.exports={reverse}`或`exports.reverse=reverse`。

注意 `export` 与 `export default`的区别是: 通过export方式导出，在导入时要加{ }，export default则不需要。

修改test执行脚本为`mocha --require @babel/register 'src/**/*-test.js'`，注意这里用的是`--require`，`--compilers`已经被废弃了。

如果使用的是Babel6，可能使用的是`npm install babel-core babel-register babel-preset-env -D`

Babel6的.babelrc使用的是

```
{
  "presets": [ "env ]
}
```

测试执行脚本为`mocha --require babel-core/register 'src/**/*-test.js'`

## Introduce chai for test

`npm install chai chai-as-promised -D`安装chai。

而后在测试文件中`import { expect } from 'chai';`, 就可以使用`expect`方式的语法了。

而是用 `chai-as-promised`可以更方便的测试Promise。在没有引入`chai-as-promised`之前，我们需要这么来测试Promise:

```
it('should test promise with original way', function (done) {
    Promise.resolve({ foo: "bar" })
        .then(ret => {
            expect(ret).to.have.property("foo");
            done();
        }).catch(error => {
            done();
        });
});
```

而引入`chai-as-promised`后，我们写法就简单很多了：

```
it('should easy to test promise', function () {
    expect(Promise.resolve({ foo: "bar" })).to.eventually.have.property("foo");
});
```

为了消除测试代码中的import重复代码，我们创建了一个`test/testHelper.js`文件:

```
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
```

并在测试执行命令中require这个testHelper.js文件`mocha --require @babel/register --require test/testHelper.js -t 5000 'src/**/*-test.js'`

