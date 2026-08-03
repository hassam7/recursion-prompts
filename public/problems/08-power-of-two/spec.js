/* jshint esversion: 6 */

(function() {
  'use strict';

describe('8. Power of Two', function() {
      var originalPowerOfTwo;

      before(function() {
        originalPowerOfTwo = powerOfTwo;
        powerOfTwo = sinon.spy(powerOfTwo);
      });

      afterEach(function() {
        powerOfTwo.reset();
      });

      after(function() {
        powerOfTwo = originalPowerOfTwo;
      });

      it('should return a boolean', function() {
        expect(powerOfTwo(5)).to.be.a('boolean');
        expect(powerOfTwo(8)).to.be.a('boolean');
      });

      it('should return true for powers of two', function() {
        expect(powerOfTwo(1)).to.be.true;
        expect(powerOfTwo(2)).to.be.true;
        expect(powerOfTwo(128)).to.be.true;
      });

      it('should return false when input is not power of two', function() {
        expect(powerOfTwo(0)).to.be.false;
        expect(powerOfTwo(10)).to.be.false;
        expect(powerOfTwo(270)).to.be.false;
      });

      it('should use recursion by calling self', function() {
        powerOfTwo(16);
        expect(powerOfTwo.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        powerOfTwo(16);
        powerOfTwo.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());
