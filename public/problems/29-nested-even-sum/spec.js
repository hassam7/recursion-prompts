/* jshint esversion: 6 */

(function() {
  'use strict';

describe('29. Sum even numbers in nested objects', function() {
      var originalNestedEvenSum, input;

      before(function() {
        originalNestedEvenSum = nestedEvenSum;
        nestedEvenSum = sinon.spy(nestedEvenSum);
        input = {
          a: 2,
          b: {b: 2, bb: {b: 3, bb: {b: 2}}},
          c: {c: {c: 2}, cc: 'ball', ccc: 5},
          d: 1,
          e: {e: {e: 2}, ee: 'car'}
        };
      });

      afterEach(function() {
        nestedEvenSum.reset();
      });

      after(function() {
        nestedEvenSum = originalNestedEvenSum;
      });

      it('should return a number', function() {
        expect(nestedEvenSum(input)).to.be.a('number');
      });

      it('should sum even numbers', function() {
        expect(nestedEvenSum(input)).to.equal(10);
      });

      it('should use recursion by calling self', function() {
        nestedEvenSum(input);
        expect(nestedEvenSum.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        nestedEvenSum(input);
        nestedEvenSum.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());
