import { expect } from 'chai';
import sinon from 'sinon';
import { reverse, yearlySalary  } from './CommonUtil';

describe('CommonUtil', function () {
    describe('#reverse', function () {
        it('should return blank string when input string is empty', function () {
            expect(reverse("")).to.equal("");
        });

        it('should return reversed string', function () {
            expect(reverse("abc")).to.equal("cba");
        });
    });

    describe('#yearlySalary', function () {
        let ceil;

        beforeEach(function () {
            ceil = sinon.spy(Math, 'ceil');
        });

        afterEach(function () {
            ceil.restore();
        });

        it('should call Math ceil function once', function () {
            yearlySalary(10000);
            sinon.assert.calledOnce(ceil);
        });

        it('should call Math ceil function once and use chai as assert', function () {
            yearlySalary(10000);
            expect(ceil).to.have.been.called;
        });
    });
});