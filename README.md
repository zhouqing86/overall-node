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

## Introduce Sinon

### Sinon基本介绍

`npm install sinon sinon-chai -D`安装sinon和sinon-chai。
当我们开发后端逻辑的时候有时候需要连接数据库,根据从数据库中得到的数据来执行后续的逻辑代码, 或者其他的依赖, 甚至会更加复杂棘手。
这些开发都存在一个共同的局限性, 就是会去依赖别的服务, 需要别的系统的支持。我们可以用sinon.js避免所有麻烦。

#### sinon.spy

Spies的主要用途是收集函数调用的信息。你也可以用它验证诸如某个函数是否被调用过之类的断言。有两种类型的spy: 匿名函数的spy和已经存在的函数的spy。

- 匿名函数spy

```
it("test should call subscribers on publish", function () {
    var callback = sinon.spy();
    PubSub.subscribe("message", callback);
    PubSub.publishSync("message");
    assertTrue(callback.called);
});
```

- 已经存在的函数

```
it("test should inspect jQuery.getJSON's usage of jQuery.ajax", function () {
    sinon.spy(jQuery, "ajax");
    jQuery.getJSON("/some/resource");

    assert(jQuery.ajax.calledOnce);
    
    jQuery.ajax.restore();
    assertEquals("/some/resource", jQuery.ajax.getCall(0).args[0].url);
    assertEquals("json", jQuery.ajax.getCall(0).args[0].dataType);
})
```

#### sinon.stub

TODO

#### sinon.mock

TODO

#### sinon.fake

Fake, 在sinon V5以后，引入fake，其合并了spies和stubs的概念。但是sinon.fake只是创建fake，但如果要插入到测试系统中，还需要使用sinon.replace。

```
var fake = sinon.fake.returns('42');
sinon.replace(console, 'log', fake);
console.log('apple pie');
// 42
```

### 使用Sinon和Sinon-chai

sinon本身也提供了一些断言函数。如果没有与chai结合，其可以按如下写法:

```
it('should call Math ceil function once', function () {
    var ceil = sinon.spy(Math, 'ceil');
    yearlySalary(10000);
    sinon.assert.calledOnce(ceil);
});
```

这里的yearlySalary定义的函数：

```
function yearlySalary(salary) {
    return Math.ceil(salary * 12);
}
```

如果与chai结合，需要安装sinon-chai，然后在testHelper.js文件中

```
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
```

使用chai的expect来作为断言，则可以将上面的写法写成如下的：

```
it.only('should call Math ceil function once and use chai as assert', function () {
    var ceil = sinon.spy(Math, 'ceil');
    yearlySalary(10000);
    expect(ceil).to.have.been.called;
});
```

### 测试用例的调试方法

使用`it.only`或者`describe.only`，可以让mocha只测试此用例集合或者用例单元。.only()可以被定义多次来定义一系列的测试子集。

.skip()方法可以用于跳过某些测试测试集合和测试用例。所有被跳过的用例都会被标记为pending用例，在报告中也会以pending用例显示。

