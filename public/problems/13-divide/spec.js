/* jshint esversion: 6 */

(function() {
  'use strict';

describe('13. Divide', function() {
      var originalDivide;

      before(function() {
        originalDivide = divide;
        divide = sinon.spy(divide);
      });

      afterEach(function() {
        divide.reset();
      });

      after(function() {
        divide = originalDivide;
      });

      it('should return a number', function() {
        expect(divide(5,2)).to.be.a('number');
        expect(divide(8,4)).to.be.a('number');
      });

      it("should not use complex math", function() {
        var stringified = originalDivide.toString();
        expect(stringified).to.not.contain('*');
        expect(stringified).to.not.contain('/');
        expect(stringified).to.not.contain('%');
        expect(stringified).to.not.contain('Math');
        var originalModulo = modulo;
        modulo = sinon.spy(modulo);
        divide(8,4);
        expect(modulo.called).to.be.false;
        modulo = originalModulo;
      });

      it('should return the quotient of two integers', function() {
        expect(divide(2, 1)).to.equal(~~(2 / 1));
        expect(divide(17, 5)).to.equal(~~(17 / 5));
        expect(divide(78, 453)).to.equal(~~(78 / 453));
        expect(divide(-79, 82)).to.equal(~~(-79 / 82));
        expect(divide(-275, -582)).to.equal(~~(-275 / -582));
        expect(divide(0, 32)).to.equal(~~(0 / 32));
        expect(divide(0, 0)).to.be.NaN;
      });

      it('should use recursion by calling self', function() {
        divide(17, 5);
        expect(divide.callCount).to.be.above(1);
      });

      it('should be invoked with two arguments', function() {
        divide(8,4);
        divide.args.forEach(arg => {
          expect(arg).to.have.length(2);
        });
      });

    });

}());
