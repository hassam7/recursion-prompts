/* jshint esversion: 6 */

(function() {
  'use strict';

describe('11. Modulo', function() {
      var originalModulo;

      before(function() {
        originalModulo = modulo;
        modulo = sinon.spy(modulo);
      });

      afterEach(function() {
        modulo.reset();
      });

      after(function() {
        modulo = originalModulo;
      });

      it('should return a number', function() {
        expect(modulo(5,2)).to.be.a('number');
        expect(modulo(8,4)).to.be.a('number');
      });

      it("should not use complex math", function() {
        var stringified = originalModulo.toString();
        expect(stringified).to.not.contain('*');
        expect(stringified).to.not.contain('/');
        expect(stringified).to.not.contain('%');
        expect(stringified).to.not.contain('Math');
      });

      it('should return the remainder of two integers', function() {
        expect(modulo(2, 1)).to.equal(2 % 1);
        expect(modulo(17, 5)).to.equal(17 % 5);
        expect(modulo(78, 453)).to.equal(78 % 453);
        expect(modulo(0, 32)).to.equal(0 % 32);
        expect(modulo(0, 0)).to.be.NaN;
      });

      it('should accept negative integers', function() {
        expect(modulo(-79, 82)).to.equal(-79 % 82);
        expect(modulo(-275, -502)).to.equal(-275 % -502);
        expect(modulo(-275, -274)).to.equal(-275 % -274);
        expect(modulo(-4, 2)).to.equal(-4 % 2);
      });

      it('should use recursion by calling self', function() {
        modulo(5,2);
        expect(modulo.callCount).to.be.above(1);
      });

      it('should be invoked with two arguments', function() {
        modulo(5,2);
        modulo.args.forEach(arg => {
          expect(arg).to.have.length(2);
        });
      });

    });

}());
