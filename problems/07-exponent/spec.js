/* jshint esversion: 6 */

(function() {
  'use strict';

describe('7. Compute Exponent', function() {
      var originalExponent;

      before(function() {
        originalExponent = exponent;
        exponent = sinon.spy(exponent);
      });

      afterEach(function() {
        exponent.reset();
      });

      after(function() {
        exponent = originalExponent;
      });

      it('should return a number', function() {
        expect(exponent(4,3)).to.be.a('number');
      });

      it("should not use complex math", function() {
        expect(originalExponent.toString()).to.not.contain('Math');
      });

      it('should compute exponent of non-negative integers', function() {
        expect(exponent(3,4)).to.equal(81);
        expect(exponent(12,5)).to.equal(248832);
        expect(exponent(7,2)).to.equal(49);
      });

      it('returns 1 when exponent is 0', function() {
        expect(exponent(8,0)).to.equal(1);
        expect(exponent(244,0)).to.equal(1);
      });

      it('returns base when exponent is 1', function() {
        expect(exponent(9,1)).to.equal(9);
        expect(exponent(2300,1)).to.equal(2300);
      });


      it('should accept negative integer for exponent', function() {
        expect(exponent(4,-2)).to.equal(0.0625);
        expect(exponent(5,-4)).to.equal(0.0016);
        expect(exponent(2,-5)).to.equal(0.03125);
      });

      it('should use recursion by calling self', function() {
        exponent(3,4);
        expect(exponent.callCount).to.be.above(1);
      });

      it('should be invoked with two arguments', function() {
        exponent(3,4);
        exponent.args.forEach(arg => {
          expect(arg).to.have.length(2);
        });
      });

      // remove the 'x' to enable test
      xit('optimize for even numbers', function() {
        exponent(3,4);
        expect(exponent.callCount).to.be.at.most(4);

        exponent.reset();
        exponent(12,5);
        expect(exponent.callCount).to.be.at.most(5);

        exponent.reset();
        exponent(19,7);
        expect(exponent.callCount).to.be.at.most(6);
      });

      // remove the 'x' to enable test
      xit('should accept negative integer for base', function() {
        expect(exponent(-3,4)).to.equal(81);
        expect(exponent(-12,5)).to.equal(-248832);
        expect(exponent(-7,2)).to.equal(49);
        expect(exponent(-7,4)).to.equal(2401);
        expect(exponent(-3,5)).to.equal(-243);
      });

    });

}());
