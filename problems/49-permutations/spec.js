/* jshint esversion: 6 */

(function() {
  'use strict';

describe('49. String Permutations', function() {
      var originalPermutations;

      before(function() {
        originalPermutations = permutations;
        permutations = sinon.spy(permutations);
      });

      afterEach(function() {
        permutations.reset();
      });

      after(function() {
        permutations = originalPermutations;
      });

      it('should return an array', function() {
        expect(permutations('ab')).to.be.an('array');
      });

      it('should return the empty string as the only permutation for an empty string', function() {
        expect(permutations('')).to.eql(['']);
      });

      it('should return every permutation of the input string', function() {
        expect(permutations('a').sort()).to.eql(['a']);
        expect(permutations('ab').sort()).to.eql(['ab', 'ba']);
        expect(permutations('abc').sort()).to.eql(['abc', 'acb', 'bac', 'bca', 'cab', 'cba']);
      });

      it('should not include duplicate permutations for repeated letters', function() {
        expect(permutations('aa')).to.eql(['aa']);
        expect(permutations('aba').sort()).to.eql(['aab', 'aba', 'baa']);
      });

      it('should use recursion by calling self', function() {
        permutations('abc');
        expect(permutations.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        permutations('abc');
        permutations.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());