import { expect } from 'chai';
import { reverse } from './CommonUtil';

describe('CommonUtil', function () {
    describe('#reverse', function () {
        it('should return blank string when input string is empty', function () {
            expect(reverse("")).to.equal("");
        });

        it('should return reversed string', function () {
            expect(reverse("abc")).to.equal("cba");
        });
    });
});