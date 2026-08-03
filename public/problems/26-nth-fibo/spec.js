/* jshint esversion: 6 */

(function() {
  'use strict';

describe('26. Return nth Fibonacci', function() {
      var originalNthFibo;

      before(function() {
        originalNthFibo = nthFibo;
        nthFibo = sinon.spy(nthFibo);
      });

      afterEach(function() {
        nthFibo.reset();
      });

      after(function() {
        nthFibo = originalNthFibo;
      });

      it('should return a number', function() {
        expect(nthFibo(5)).to.be.a('number');
      });

      it('should return the nth nthFibo number', function() {
        expect(nthFibo(0)).to.equal(0);
        expect(nthFibo(1)).to.equal(1);
        expect(nthFibo(2)).to.equal(1);
        expect(nthFibo(3)).to.equal(2);
        expect(nthFibo(4)).to.equal(3);
        expect(nthFibo(5)).to.equal(5);
        expect(nthFibo(8)).to.equal(21);
      });

      it('should return null for negative integers', function() {
        expect(nthFibo(-5)).to.be.null;
        expect(nthFibo(-7)).to.be.null;
      });

      it('should use recursion by calling self', function() {
        nthFibo(5);
        expect(nthFibo.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        nthFibo(5);
        nthFibo.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());
