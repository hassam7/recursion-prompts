/* jshint esversion: 6 */

(function() {
  'use strict';

describe('41. Nested Array Depth', function() {
      var originalArrayDepth, input;

      before(function() {
        originalArrayDepth = arrayDepth;
        arrayDepth = sinon.spy(arrayDepth);
      });

      afterEach(function() {
        arrayDepth.reset();
      });

      after(function() {
        arrayDepth = originalArrayDepth;
      });

      it('should return a number', function() {
        expect(arrayDepth([1, [2]])).to.be.a('number');
      });

      it('should not mutate the input array', function() {
        input = [1, [2, [3]], 4];
        arrayDepth(input);
        expect(input).to.eql([1, [2, [3]], 4]);
      });

      it('should return 1 for arrays with no nested arrays', function() {
        expect(arrayDepth([])).to.equal(1);
        expect(arrayDepth([1, 2, 3])).to.equal(1);
        expect(arrayDepth(['a', 'b', 'c'])).to.equal(1);
      });

      it('should return the maximum nested array depth', function() {
        expect(arrayDepth([1, [2], 3])).to.equal(2);
        expect(arrayDepth([1, [2, [3]], 4])).to.equal(3);
        expect(arrayDepth([[[[[1]]]]])).to.equal(5);
        expect(arrayDepth([1, [2, [3, [4]]], [[5]]])).to.equal(4);
      });

      it('should use recursion by calling self', function() {
        arrayDepth([1, [2, [3]], 4]);
        expect(arrayDepth.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        arrayDepth([1, [2, [3]], 4]);
        arrayDepth.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());