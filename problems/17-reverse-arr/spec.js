/* jshint esversion: 6 */

(function() {
  'use strict';

describe('17. Reverse an array', function() {
      var originalReverseArr;

      before(function() {
        originalReverseArr = reverseArr;
        reverseArr = sinon.spy(reverseArr);
      });

      afterEach(function() {
        reverseArr.reset();
      });

      after(function() {
        reverseArr = originalReverseArr;
      });

      it('should return an array', function() {
        expect(reverseArr([3,2,1])).to.be.an('array');
      });

      it('should return array in reversed order', function() {
        expect(reverseArr([1,2,3,4,5])).to.eql([5,4,3,2,1]);
        expect(reverseArr([8,6,4,2])).to.eql([2,4,6,8]);
      });

      it('should use recursion by calling self', function() {
        reverseArr([3,2,1]);
        expect(reverseArr.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        reverseArr([5,4,3]);
        reverseArr.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());
