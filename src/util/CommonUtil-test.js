import assert from 'assert';
import { reverse } from './CommonUtil';

describe('CommonUtil', function () {
    describe('#reverse', function () {
        it('should return blank string when input string is empty', function () {
            assert.equal("", reverse(""));
        });

        it('should return reversed string', function () {
            assert.equal("cba", reverse("abc"));
        });
    });
});