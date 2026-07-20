/* jshint esversion: 6 */

(function() {
  'use strict';

describe('4. Check if Even', function() {
      var originalIsEven;

      before(function() {
        originalIsEven = isEven;
        isEven = sinon.spy(isEven);
      });

      afterEach(function() {
        isEven.reset();
      });

      after(function() {
        isEven = originalIsEven;
      });

      it('should return a boolean', function() {
        expect(isEven(5)).to.be.a('boolean');
        expect(isEven(8)).to.be.a('boolean');
      });

      it("should not use modulo", function() {
        var stringified = originalIsEven.toString();
        expect(stringified).to.not.contain('%');
        var originalModulo = modulo;
        modulo = sinon.spy(modulo);
        isEven(8);
        expect(modulo.called).to.be.false;
        modulo = originalModulo;
      });

      it('should return true for even numbers', function() {
        expect(isEven(48)).to.be.true;
        expect(isEven(0)).to.be.true;
      });

      it('should return false for odd numbers', function() {
        expect(isEven(17)).to.be.false;
        expect(isEven(1)).to.be.false;
      });

      it('should work with negative integers', function() {
        expect(isEven(-14)).to.be.true;
        expect(isEven(-31)).to.be.false;
      });

      it('should use recursion by calling self', function() {
        isEven(8);
        expect(isEven.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        isEven(8);
        isEven.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());
