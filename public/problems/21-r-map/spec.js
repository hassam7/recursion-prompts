/* jshint esversion: 6 */

(function() {
  'use strict';

describe('21. Recursive Map', function() {
      var originalRMap, timesTwo, input, result;

      before(function() {
        originalRMap = rMap;
        rMap = sinon.spy(rMap);
        timesTwo = function(n) { return n * 2; };
      });

      beforeEach(function() {
        input = [1,2,3,4,5];
      });

      afterEach(function() {
        rMap.reset();
      });

      after(function() {
        rMap = originalRMap;
      });

      it('should return an array', function() {
        expect(rMap(input, timesTwo)).to.be.an('array');
      });

      it('should not use native map method', function() {
        // Spying on Array.prototype.map in testSupport.js
        rMap(input, timesTwo);
        expect(Array.prototype.map.called).to.be.false;
      });

      it('should return new array without mutating the input array', function() {
        result = rMap(input, num => num);
        expect(input).to.eql([1,2,3,4,5]);
        // should deeply equal input
        expect(result).to.eql(input);
        // should not be same array in memory
        expect(result).to.not.equal(input);
      });

      it('should apply a function to every value in an array', function() {
        result = rMap([1,2,3], timesTwo);
        expect(result).to.eql([2,4,6]);
      });

      it('should use recursion by calling self', function() {
        rMap([1,2,3,4], timesTwo);
        expect(rMap.callCount).to.be.above(1);
      });

      it('should be invoked with two arguments', function() {
        rMap([1,2,3,4], timesTwo);
        rMap.args.forEach(arg => {
          expect(arg).to.have.length(2);
        });
      });

    });

}());
