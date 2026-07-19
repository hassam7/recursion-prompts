/* jshint esversion: 6 */

(function() {
  'use strict';

describe('3. Sum Integers in Array', function() {
      var originalArraySum;

      before(function() {
        originalArraySum = arraySum;
        arraySum = sinon.spy(arraySum);
      });

      afterEach(function() {
        arraySum.reset();
      });

      after(function() {
        arraySum = originalArraySum;
      });

      it('should return a number', function() {
        expect(arraySum([[1],[[2]],3,4])).to.be.a('number');
      });

      it('should not use flatten or native flat method', function() {
        var originalFlatten = flatten;
        flatten = sinon.spy(flatten);
        arraySum([[1],[2,3],[[4]],5]);
        expect(flatten.called).to.be.false;
        flatten = originalFlatten;
        // Spying on Array.prototype.flat in testSupport.js
        expect(Array.prototype.flat.called).to.be.false;
      });

      it('should return the sum of nested arrays containing non-negative integers', function() {
        expect(arraySum([[1],[2,3],[[4]],5])).to.equal(15);
        expect(arraySum([[12,[[34],[56]],78]])).to.equal(180);
        expect(arraySum([3,[0,[34,[7,[18]]]]])).to.equal(62);
      });

      it('should return the sum of nested arrays containing negative integers', function() {
        expect(arraySum([[-1],[-2,-3],[[-4]],-5])).to.equal(-15);
        expect(arraySum([[-12,[[-34],[-56]],-78]])).to.equal(-180);
        expect(arraySum([-3,[0,[-34,[-7,[-18]]]]])).to.equal(-62);
      });

      it('should return the sum of nested arrays containing both non-negative and negative integers', function() {
        expect(arraySum([[1],[-2,3],[[-4]],5,-6])).to.equal(-3);
        expect(arraySum([[-12,[[34],[-56]],78]])).to.equal(44);
        expect(arraySum([3,[0,[-34,[-7,[18]]]]])).to.equal(-20);
      });

      it('should return 0 for empty array', function() {
        expect(arraySum([])).to.equal(0);
      });

      it('should accept an array with a single integer', function() {
        expect(arraySum([4])).to.equal(4);
        expect(arraySum([0])).to.equal(0);
        expect(arraySum([-37])).to.equal(-37);
      });

      it('should not mutate the input array', function() {
        var input = [[1],[[2]],3,4];
        arraySum(input);
        expect(input).to.eql([[1],[[2]],3,4]);
      });

      it('should use recursion by calling self', function() {
        arraySum([[1],[[2]],3,4]);
        expect(arraySum.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        arraySum([[1],[[2]],3,4]);
        arraySum.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());
