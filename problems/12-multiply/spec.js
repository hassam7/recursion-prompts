/* jshint esversion: 6 */

(function() {
  'use strict';

describe('12. Multiply', function() {
      var originalMultiply;

      before(function() {
        originalMultiply = multiply;
        multiply = sinon.spy(multiply);
      });

      afterEach(function() {
        multiply.reset();
      });

      after(function() {
        multiply = originalMultiply;
      });

      it('should return a number', function() {
        expect(multiply(5,2)).to.be.a('number');
        expect(multiply(8,4)).to.be.a('number');
      });

      it("should not use complex math", function() {
        var stringified = originalMultiply.toString();
        expect(stringified).to.not.contain('*');
        expect(stringified).to.not.contain('/');
        expect(stringified).to.not.contain('%');
        expect(stringified).to.not.contain('Math');
        var originalModulo = modulo;
        modulo = sinon.spy(modulo);
        multiply(8,4);
        expect(modulo.called).to.be.false;
        modulo = originalModulo;
      });

      it('should return the product of two positive integers', function() {
        expect(multiply(1, 2)).to.equal(1 * 2);
        expect(multiply(17, 5)).to.equal(17 * 5);
        expect(multiply(0, 32)).to.equal(0 * 32);
        expect(multiply(0, 0)).to.equal(0 * 0);
        // expect(multiply(78, 453)).to.equal(78 * 453);
      });

      it('should return the product of two negative integers', function() {
        expect(multiply(-2, -2)).to.equal(-2 * -2);
        expect(multiply(-8, -3)).to.equal(-8 * -3);
        expect(multiply(-5, -27)).to.equal(-5 * -27);
        // expect(multiply(-79, -82)).to.equal(-79 * -82);
        // expect(multiply(-275, -502)).to.equal(-275 * -502);
        // expect(multiply(-12, -10)).to.equal(-12 * -10);
        // expect(multiply(-22, -3)).to.equal(-22 * -3);
      });

      it('should return the product of mixed positive and negative integers', function() {
        expect(multiply(-79, 82)).to.equal(-79 * 82);
        expect(multiply(79, -82)).to.equal(79 * -82);
        expect(multiply(2, -2)).to.equal(2 * -2);
        expect(multiply(5, -27)).to.equal(5 * -27);
        // expect(multiply(-275, 502)).to.equal(-275 * 502);
        // expect(multiply(275, -502)).to.equal(275 * -502);
        // expect(multiply(-8, 3)).to.equal(-8 * 3);
        // expect(multiply(12, -10)).to.equal(12 * -10);
        // expect(multiply(-22, 3)).to.equal(-22 * 3);
      });

      it('should accept parameters in any order', function() {
        expect(multiply(2, 1)).to.equal(1 * 2);
        expect(multiply(5, 17)).to.equal(5 * 17);
        expect(multiply(32, 0)).to.equal(0 * 32);
        // expect(multiply(453, 78)).to.equal(78 * 453);
      });

      it('should use recursion by calling self', function() {
        multiply(8,4);
        expect(multiply.callCount).to.be.above(1);
      });

      it('should be invoked with two arguments', function() {
        multiply(8,4);
        multiply.args.forEach(arg => {
          expect(arg).to.have.length(2);
        });
      });

    });

}());
