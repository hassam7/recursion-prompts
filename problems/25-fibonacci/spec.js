/* jshint esversion: 6 */

(function() {
  'use strict';

describe('25. First n Fibonacci', function() {
      var originalFibonacci;

      before(function() {
        originalFibonacci = fibonacci;
        fibonacci = sinon.spy(fibonacci);
      });

      afterEach(function() {
        fibonacci.reset();
      });

      after(function() {
        fibonacci = originalFibonacci;
      });

      it('should return an array', function() {
        expect(fibonacci(5)).to.be.an('array');
      });

      it('should return first n Fibonacci numbers where n starts at index 1', function() {
        expect(fibonacci(1)).to.eql([0,1]);
        expect(fibonacci(2)).to.eql([0,1,1]);
        expect(fibonacci(3)).to.eql([0,1,1,2]);
        expect(fibonacci(4)).to.eql([0,1,1,2,3]);
        expect(fibonacci(5)).to.eql([0,1,1,2,3,5]);
        expect(fibonacci(8)).to.eql([0,1,1,2,3,5,8,13,21]);
      });

      it('should return null for zero and negative integers', function() {
        expect(fibonacci(0)).to.be.null;
        expect(fibonacci(-7)).to.be.null;
      });

      it('should use recursion by calling self', function() {
        fibonacci(5);
        expect(fibonacci.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        fibonacci(5);
        fibonacci.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());
