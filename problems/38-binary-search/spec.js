/* jshint esversion: 6 */

(function() {
  'use strict';

describe('38. Binary Search', function() {
      var originalBinarySearch, input1, input2, input3, input4, input5, primes;

      before(function() {
        originalBinarySearch = binarySearch;
        binarySearch = sinon.spy(binarySearch);
        input1 = [1,2,3,4,5,6];
        input2 = [1,2,3,4,5,6,7];
        input3 = [-5,-4,-3,-2,-1];
        input4 = [-6,-5,-4,-3,-2,-1];
        input5 = [-4,-3,-2,-1,0,1,2,3];
        primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43];
      });

      afterEach(function() {
        binarySearch.reset();
      });

      after(function() {
        binarySearch = originalBinarySearch;
      });

      it('should return a number', function() {
        expect(binarySearch(input1, 3)).to.be.a('number');
      });

      it('should not mutate the input array', function() {
        binarySearch(input1, 4);
        expect(input1).to.eql([1,2,3,4,5,6]);
      });

      it('should return index of target', function() {
        expect(binarySearch(input1, 1)).to.equal(0);
        expect(binarySearch(input1, 2)).to.equal(1);
        expect(binarySearch(input1, 3)).to.equal(2);
        expect(binarySearch(input1, 4)).to.equal(3);
        expect(binarySearch(input1, 5)).to.equal(4);
        expect(binarySearch(input1, 6)).to.equal(5);
        expect(binarySearch(input2, 1)).to.equal(0);
        expect(binarySearch(input2, 2)).to.equal(1);
        expect(binarySearch(input2, 3)).to.equal(2);
        expect(binarySearch(input2, 4)).to.equal(3);
        expect(binarySearch(input2, 5)).to.equal(4);
        expect(binarySearch(input2, 6)).to.equal(5);
        expect(binarySearch(input2, 7)).to.equal(6);
        expect(binarySearch(primes, 2)).to.equal(0);
        expect(binarySearch(primes,19)).to.equal(7);
        expect(binarySearch(primes,41)).to.equal(12);
      });

      it('should support negative numbers', function() {
        expect(binarySearch(input3,-5)).to.equal(0);
        expect(binarySearch(input3,-4)).to.equal(1);
        expect(binarySearch(input3,-3)).to.equal(2);
        expect(binarySearch(input3,-2)).to.equal(3);
        expect(binarySearch(input3,-1)).to.equal(4);
        expect(binarySearch(input4,-6)).to.equal(0);
        expect(binarySearch(input4,-5)).to.equal(1);
        expect(binarySearch(input4,-4)).to.equal(2);
        expect(binarySearch(input4,-3)).to.equal(3);
        expect(binarySearch(input4,-2)).to.equal(4);
        expect(binarySearch(input4,-1)).to.equal(5);
        expect(binarySearch(input5,-2)).to.equal(2);
        expect(binarySearch(input5, 2)).to.equal(6);
      });

      it('should return null if target not found', function() {
        expect(binarySearch(input1,-1)).to.be.null;
        expect(binarySearch(input1, 7)).to.be.null;
        expect(binarySearch(input2,-1)).to.be.null;
        expect(binarySearch(input2, 8)).to.be.null;
        expect(binarySearch(input3,-6)).to.be.null;
        expect(binarySearch(input3, 0)).to.be.null;
        expect(binarySearch(input4,-8)).to.be.null;
        expect(binarySearch(input4, 1)).to.be.null;
        expect(binarySearch(input5,-8)).to.be.null;
        expect(binarySearch(input5, 4)).to.be.null;
        expect(binarySearch(primes,32)).to.be.null;
      });

      it('should use recursion by calling self', function() {
        binarySearch(primes, 3);
        expect(binarySearch.callCount).to.be.above(1);
      });

      it('should be invoked with at most four arguments', function() {
        binarySearch(primes, 4);
        binarySearch.args.forEach(arg => {
          expect(arg).to.have.length.of.at.most(4);
        });
      });

      xit('should be invoked with two arguments', function() {
        binarySearch(primes, 4);
        binarySearch.args.forEach(arg => {
          expect(arg).to.have.length(2);
        });
      });

    });

}());
