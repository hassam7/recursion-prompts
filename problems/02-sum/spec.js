/* jshint esversion: 6 */

(function() {
  'use strict';

describe('2. Sum of Integers', function() {
      var originalSum;

      before(function() {
        originalSum = sum;
        sum = sinon.spy(sum);
      });

      afterEach(function() {
        sum.reset();
      });

      after(function() {
        sum = originalSum;
      });

      it('should return a number', function() {
        expect(sum([1,2,3,4,5,6])).to.be.a('number');
      });

      it('should return the sum of an array of non-negative integers', function() {
        expect(sum([1,2,3,4,5,6])).to.equal(21);
        expect(sum([3,0,34,7,18])).to.equal(62);
      });

      it('should return the sum of an array of negative integers', function() {
        expect(sum([-1,-2,-3,-4,-5,-6])).to.equal(-21);
        expect(sum([-3,-0,-34,-7,-18])).to.equal(-62);
      });

      it('should return the sum of an array of mixed non-negative and negative integers', function() {
        expect(sum([1,-2,3,-4,5,-6])).to.equal(-3);
        expect(sum([-12,34,-56,78])).to.equal(44);
        expect(sum([3,0,-34,-7,18])).to.equal(-20);
      });

      it('should return 0 for empty array', function() {
        expect(sum([])).to.equal(0);
      });

      it('should accept an array with a single integer', function() {
        expect(sum([4])).to.equal(4);
        expect(sum([0])).to.equal(0);
        expect(sum([-37])).to.equal(-37);
      });

      it('should not mutate the input array', function() {
        var input = [1,2,3,4,5];
        sum(input);
        expect(input).to.eql([1,2,3,4,5]);
      });

      it('should use recursion by calling self', function() {
        sum([1,2,3,4,5,6]);
        expect(sum.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        sum([1,2,3,4,5,6]);
        sum.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());
