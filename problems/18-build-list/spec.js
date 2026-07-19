/* jshint esversion: 6 */

(function() {
  'use strict';

describe('18. Build an array with a given value and length', function() {
      var originalBuildList;

      before(function() {
        originalBuildList = buildList;
        buildList = sinon.spy(buildList);
      });

      afterEach(function() {
        buildList.reset();
      });

      after(function() {
        buildList = originalBuildList;
      });

      it('should return an array', function() {
        expect(buildList(0,5)).to.be.an('array');
      });

      it('should return array of given length with given value at each index', function() {
        expect(buildList(0, 5)).to.eql([0,0,0,0,0]);
        expect(buildList('banana', 3)).to.eql(['banana','banana','banana']);
        expect(buildList(NaN, 4)).to.eql([NaN, NaN, NaN, NaN]);
        expect(buildList(undefined, 1)).to.eql([undefined]);
        expect(buildList([], 2)).to.eql([[],[]]);
        expect(buildList({}, 4)).to.eql([{},{},{},{}]);
        expect(buildList(true, 3)).to.eql([true,true,true]);
      });

      it('should use recursion by calling self', function() {
        buildList(2,4);
        expect(buildList.callCount).to.be.above(1);
      });

      it('should be invoked with two arguments', function() {
        buildList('five',3);
        buildList.args.forEach(arg => {
          expect(arg).to.have.length(2);
        });
      });

    });

}());
