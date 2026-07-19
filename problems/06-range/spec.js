/* jshint esversion: 6 */

(function() {
  'use strict';

describe('6. Integer Range', function() {
      var originalRange;

      before(function() {
        originalRange = range;
        range = sinon.spy(range);
      });

      afterEach(function() {
        range.reset();
      });

      after(function() {
        range = originalRange;
      });

      it('should return an array', function() {
        expect(range(2,7)).to.be.an('array');
      });

      it('should return the integers between two numbers', function() {
        expect(range(3,8)).to.eql([4,5,6,7]);
        expect(range(127,131)).to.eql([128,129,130]);
      });

      it('should return empty array if no integers in range', function() {
        expect(range(5,5)).to.eql([]);
        expect(range(2,3)).to.eql([]);
      });

      it('should accept negative integers', function() {
        expect(range(-9,-4)).to.eql([-8,-7,-6,-5]);
        expect(range(-3,2)).to.eql([-2,-1,0,1]);
        expect(range(-3,-2)).to.eql([]);
        expect(range(-2,-2)).to.eql([]);
      });

      it('should accept starting integer that\'s larger than ending', function() {
        expect(range(7,2)).to.eql([6,5,4,3]);
        expect(range(3,-3)).to.eql([2,1,0,-1,-2]);
        expect(range(-9,-4)).to.eql([-8,-7,-6,-5]);
      });

      it('should use recursion by calling self', function() {
        range(3,8);
        expect(range.callCount).to.be.above(1);
      });

      it('should be invoked with two arguments', function() {
        range(3,8);
        range.args.forEach(arg => {
          expect(arg).to.have.length(2);
        });
      });

    });

}());
