/* jshint esversion: 6 */

(function() {
  'use strict';

describe('5. Sum Below', function() {
      var originalSumBelow;

      before(function() {
        originalSumBelow = sumBelow;
        sumBelow = sinon.spy(sumBelow);
      });

      afterEach(function() {
        sumBelow.reset();
      });

      after(function() {
        sumBelow = originalSumBelow;
      });

      it('should return a number', function() {
        expect(sumBelow(10)).to.be.a('number');
      });

      it('should return the sum of non-negative integers below given integer', function() {
        expect(sumBelow(0)).to.equal(0);
        expect(sumBelow(1)).to.equal(0);
        expect(sumBelow(2)).to.equal(1);
        expect(sumBelow(7)).to.equal(21);
        expect(sumBelow(12)).to.equal(66);
      });

      it('should return the sum of negative integers above given negative integer', function() {
        expect(sumBelow(-1)).to.equal(0);
        expect(sumBelow(-2)).to.equal(-1);
        expect(sumBelow(-6)).to.equal(-15);
        expect(sumBelow(-11)).to.equal(-55);
      });

      it('should use recursion by calling self', function() {
        sumBelow(5);
        expect(sumBelow.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        sumBelow(5);
        sumBelow.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());
