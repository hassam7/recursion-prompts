/* jshint esversion: 6 */

(function() {
  'use strict';

describe('42. Deep Includes', function() {
      var originalDeepIncludes, input;

      before(function() {
        originalDeepIncludes = deepIncludes;
        deepIncludes = sinon.spy(deepIncludes);
      });

      afterEach(function() {
        deepIncludes.reset();
      });

      after(function() {
        deepIncludes = originalDeepIncludes;
      });

      it('should return a boolean', function() {
        expect(deepIncludes([1, [2]], 2)).to.be.a('boolean');
      });

      it('should not mutate the input array', function() {
        input = [1, [2, [3, 4]], 5];
        deepIncludes(input, 4);
        expect(input).to.eql([1, [2, [3, 4]], 5]);
      });

      it('should return true when target is found at any depth', function() {
        expect(deepIncludes([1, 2, 3], 2)).to.be.true;
        expect(deepIncludes([1, [2, [3, 4]], 5], 4)).to.be.true;
        expect(deepIncludes([['a'], [['b']], 'c'], 'b')).to.be.true;
        expect(deepIncludes([false, [null, [undefined]]], undefined)).to.be.true;
      });

      it('should return false when target is not found', function() {
        expect(deepIncludes([], 1)).to.be.false;
        expect(deepIncludes([1, [2, [3]], 4], 5)).to.be.false;
        expect(deepIncludes([['a'], [['b']], 'c'], 'd')).to.be.false;
      });

      it('should use recursion by calling self', function() {
        deepIncludes([1, [2, [3, 4]], 5], 4);
        expect(deepIncludes.callCount).to.be.above(1);
      });

      it('should be invoked with two arguments', function() {
        deepIncludes([1, [2, [3, 4]], 5], 4);
        deepIncludes.args.forEach(arg => {
          expect(arg).to.have.length(2);
        });
      });

    });

}());