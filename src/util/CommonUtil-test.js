let assert = require('assert');
let CommonUtil = require('./CommonUtil');

describe('CommonUtil', function () {
    describe('#reverse', function () {
        it('should return blank string when input string is empty', function () {
            assert.equal("", CommonUtil.reverse(""));
        });

        it('should return reversed string', function () {
            assert.equal("cba", CommonUtil.reverse("abc"));
        });
    });
});