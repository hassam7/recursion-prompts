/* jshint esversion: 6 */

(function() {
  'use strict';

describe('43. Count Nested Arrays', function() {
      var originalCountNestedArrays, input;

      before(function() {
        originalCountNestedArrays = countNestedArrays;
        countNestedArrays = sinon.spy(countNestedArrays);
      });

      afterEach(function() {
        countNestedArrays.reset();
      });

      after(function() {
        countNestedArrays = originalCountNestedArrays;
      });

      it('should return a number', function() {
        expect(countNestedArrays([1, [2]])).to.be.a('number');
      });

      it('should not mutate the input array', function() {
        input = [1, [2], [3, [4]], 5];
        countNestedArrays(input);
        expect(input).to.eql([1, [2], [3, [4]], 5]);
      });

      it('should count arrays nested inside the input array', function() {
        expect(countNestedArrays([])).to.equal(0);
        expect(countNestedArrays([1, 2, 3])).to.equal(0);
        expect(countNestedArrays([1, [2], [3, [4]], 5])).to.equal(3);
        expect(countNestedArrays([[], [[]], [[[]]]])).to.equal(6);
      });

      it('should use recursion by calling self', function() {
        countNestedArrays([1, [2], [3, [4]], 5]);
        expect(countNestedArrays.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        countNestedArrays([1, [2], [3, [4]], 5]);
        countNestedArrays.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());