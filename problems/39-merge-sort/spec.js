/* jshint esversion: 6 */

(function() {
  'use strict';

describe('39. Merge Sort', function() {
      var originalMergeSort, numbers, sorted;

      before(function() {
        originalMergeSort = mergeSort;
        mergeSort = sinon.spy(mergeSort);
      });

      beforeEach(function() {
        numbers = [8,2,20,1,15];
      });

      afterEach(function() {
        mergeSort.reset();
      });

      after(function() {
        mergeSort = originalMergeSort;
      });

      it('should return an array', function() {
        sorted = mergeSort(numbers);
        expect(sorted).to.be.an('array');
      });

      it('should not mutate the input array', function() {
        sorted = mergeSort(numbers);
        expect(numbers).to.eql([8,2,20,1,15]);
        expect(numbers).to.not.equal(sorted);
      });

      it('should sort an array of numbers in order of least to greatest', function() {
        expect(mergeSort([])).to.eql([]);
        expect(mergeSort([0])).to.eql([0]);
        expect(mergeSort([1,0])).to.eql([0,1]);
        expect(mergeSort([0,1,2,3])).to.eql([0,1,2,3]);
        expect(mergeSort([5,4,3,2,1])).to.eql([1,2,3,4,5]);
        expect(mergeSort([10,1,8,5,0])).to.eql([0,1,5,8,10]);
        expect(mergeSort([8,2,20,1,15])).to.eql([1,2,8,15,20]);
      });

      it('should be able to handle negative numbers', function() {
        expect(mergeSort([-1])).to.eql([-1]);
        expect(mergeSort([0,-1])).to.eql([-1,0]);
        expect(mergeSort([0,1,-2,-3])).to.eql([-3,-2,0,1]);
        expect(mergeSort([8,-2,20,1,-15])).to.eql([-15,-2,1,8,20]);
        expect(mergeSort([0,-1,-2,-3,-4,-5,-10])).to.eql([-10,-5,-4,-3,-2,-1,0]);
      });

      it("should not use the native Array sort method", function() {
        // Spying on Array.prototype.sort in testSupport.js
        mergeSort(numbers);
        expect(Array.prototype.sort.called).to.equal(false);
      });

      it('should use recursion by calling self', function () {
        mergeSort(numbers);
        expect(mergeSort.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        mergeSort(numbers);
        mergeSort.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());
