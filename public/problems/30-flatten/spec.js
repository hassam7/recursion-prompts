/* jshint esversion: 6 */

(function() {
  'use strict';

describe('30. Flatten nested arrays', function() {
      var originalFlatten;

      before(function() {
        originalFlatten = flatten;
        flatten = sinon.spy(flatten);
      });

      afterEach(function() {
        flatten.reset();
      });

      after(function() {
        flatten = originalFlatten;
      });

      it('should return an array', function() {
        expect(flatten([1,[2],[[3]]])).to.be.an('array');
      });

      it('should not use native flat method', function() {
        // Spying on Array.prototype.flat in testSupport.js
        flatten([1,[2],[[3]]]);
        expect(Array.prototype.flat.called).to.be.false;
      });

      it('should return flattened array', function() {
        expect(flatten([[1],[2,3],[[4]],5])).to.eql([1,2,3,4,5]);
        expect(flatten([3,[0,[34,[7,[18]]]]])).to.eql([3,0,34,7,18]);
        expect(flatten([[[[[3],0],34],7],18])).to.eql([3,0,34,7,18]);
        expect(flatten([[1],[2,[],3],[],[[4]],5])).to.eql([1,2,3,4,5]);
      });

      it('should use recursion by calling self', function() {
        flatten([3,[0,[34]]]);
        expect(flatten.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        flatten([3,[0,[34]]]);
        flatten.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());
