/* jshint esversion: 6 */

(function() {
  'use strict';

describe('35. Alternate sign', function() {
      var originalAlternateSign, input1, input2;

      before(function() {
        originalAlternateSign = alternateSign;
        alternateSign = sinon.spy(alternateSign);
      });

      beforeEach(function() {
        input1 = [2,7,8,3,1,4];
        input2 = [-2,-7,8,3,-1,4];
      });

      afterEach(function() {
        alternateSign.reset();
      });

      after(function() {
        alternateSign = originalAlternateSign;
      });

      it('should return an array', function() {
        expect(alternateSign(input1)).to.be.an('array');
      });

      it('should not mutate the input array', function() {
        expect(alternateSign(input2)).to.not.equal(input2);
      });

      it('should alternate signs', function() {
        expect(alternateSign(input1)).to.eql([2,-7,8,-3,1,-4]);
        expect(alternateSign(input2)).to.eql([2,-7,8,-3,1,-4]);
      });

      it('should use recursion by calling self', function() {
        alternateSign(input1);
        expect(alternateSign.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        alternateSign(input2);
        alternateSign.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());
