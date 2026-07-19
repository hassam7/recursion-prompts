/* jshint esversion: 6 */

(function() {
  'use strict';

describe('14. Greatest Common Divisor', function() {
      var originalGcd;

      before(function() {
        originalGcd = gcd;
        gcd = sinon.spy(gcd);
      });

      afterEach(function() {
        gcd.reset();
      });

      after(function() {
        gcd = originalGcd;
      });

      it('should return a number', function() {
        expect(gcd(4,36)).to.be.a('number');
      });

      it('should return greatest common divisor of two positive integers', function() {
        expect(gcd(4,36)).to.equal(4);
        expect(gcd(24,88)).to.equal(8);
        expect(gcd(339,17)).to.equal(1);
        expect(gcd(126,900)).to.equal(18);
      });

      it('should return null for negative integers', function() {
        expect(gcd(-4, 2)).to.be.null;
        expect(gcd(-5, 5)).to.be.null;
        expect(gcd(5, -5)).to.be.null;
        expect(gcd(7, -36)).to.be.null;
        expect(gcd(-10, -58)).to.be.null;
        expect(gcd(-92, -5)).to.be.null;
        // expect(gcd(0, 0)).to.be.null;
        // expect(gcd(0, 5)).to.be.null;
        // expect(gcd(5, 0)).to.be.null;
        // expect(gcd(-5, 0)).to.be.null;
        // expect(gcd(0, -5)).to.be.null;
      });

      it('should use recursion by calling self', function() {
        gcd(17, 5);
        expect(gcd.callCount).to.be.above(1);
      });

      it('should be invoked with two arguments', function() {
        gcd(17,5);
        gcd.args.forEach(arg => {
          expect(arg).to.have.length(2);
        });
      });

    });

}());
