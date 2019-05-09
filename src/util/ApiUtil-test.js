import { expect } from 'chai';

describe('ApiUtil', function () {
    describe('Simple test setTimeout function', function () {
        it('测试应该5000毫秒后结束', function(done) {
            var x = true;
            var f = function() {
                x = false;
                expect(x).to.be.not.ok;
                done(); // 通知Mocha测试结束
            };
            setTimeout(f, 1000);
        });
    });

    describe('Simple test promise', function () {
        it('should test promise with original way', function (done) {
            Promise.resolve({ foo: "bar" })
                .then(ret => {
                    expect(ret).to.have.property("foo");
                    done();
                }).catch(error => {
                    done();
                });
        });
    });

    describe('Test promise with chaiAsPromise', function () {
        it('should easy to test promise', function () {
            expect(Promise.resolve({ foo: "bar" })).to.eventually.have.property("foo");
        });
    });
});