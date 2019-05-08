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