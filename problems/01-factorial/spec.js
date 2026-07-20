/* jshint esversion: 6 */

(function() {
  'use strict';

describe('1. Factorial', function() {
      var originalFactorial;

      before(function() {
        originalFactorial = factorial;
        factorial = sinon.spy(factorial);
      });

      afterEach(function() {
        factorial.reset();
      });

      after(function() {
        factorial = originalFactorial;
      });

      it('should return a number', function() {
        expect(factorial(5)).to.be.a('number');
      });

      it('should return factorial for non-negative integers', function() {
        expect(factorial(0)).to.equal(1);
        expect(factorial(1)).to.equal(1);
        expect(factorial(4)).to.equal(24);
        expect(factorial(5)).to.equal(120);
      });

      it('should return null for negative integers', function() {
        expect(factorial(-5)).to.be.null;
      });

      it('should use recursion by calling self', function() {
        factorial(4);
        expect(factorial.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        factorial(4);
        factorial.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());
