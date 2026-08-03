/* jshint esversion: 6 */

(function() {
  'use strict';

describe('48. Subsets', function() {
      var originalSubsets, input;

      var normalize = function(result) {
        return result.map(subset => subset.join(',')).sort();
      };

      before(function() {
        originalSubsets = subsets;
        subsets = sinon.spy(subsets);
      });

      afterEach(function() {
        subsets.reset();
      });

      after(function() {
        subsets = originalSubsets;
      });

      it('should return an array', function() {
        expect(subsets([1, 2])).to.be.an('array');
      });

      it('should not mutate the input array', function() {
        input = [1, 2, 3];
        subsets(input);
        expect(input).to.eql([1, 2, 3]);
      });

      it('should return the empty subset for an empty array', function() {
        expect(subsets([])).to.eql([[]]);
      });

      it('should return every subset of the input array', function() {
        expect(normalize(subsets([1]))).to.eql(normalize([[], [1]]));
        expect(normalize(subsets([1, 2]))).to.eql(normalize([[], [1], [2], [1, 2]]));
        expect(normalize(subsets(['a', 'b', 'c']))).to.eql(normalize([
          [], ['a'], ['b'], ['c'], ['a', 'b'], ['a', 'c'], ['b', 'c'], ['a', 'b', 'c']
        ]));
      });

      it('should use recursion by calling self', function() {
        subsets([1, 2, 3]);
        expect(subsets.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        subsets([1, 2, 3]);
        subsets.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());