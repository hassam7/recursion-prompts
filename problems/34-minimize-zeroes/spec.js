/* jshint esversion: 6 */

(function() {
  'use strict';

describe('34. Minimize zeroes', function() {
      var originalMinimizeZeroes, input1, input2;

      before(function() {
        originalMinimizeZeroes = minimizeZeroes;
        minimizeZeroes = sinon.spy(minimizeZeroes);
      });

      beforeEach(function() {
        input1 = [2,0,0,0,1,4];
        input2 = [2,0,0,0,1,0,0,4];
      });

      afterEach(function() {
        minimizeZeroes.reset();
      });

      after(function() {
        minimizeZeroes = originalMinimizeZeroes;
      });

      it('should return an array', function() {
        expect(minimizeZeroes(input1)).to.be.an('array');
      });

      it('should not mutate the input array', function() {
        expect(minimizeZeroes(input2)).to.not.equal(input2);
      });

      it('should remove excess zeroes', function() {
        expect(minimizeZeroes(input1)).to.eql([2,0,1,4]);
        expect(minimizeZeroes(input2)).to.eql([2,0,1,0,4]);
      });

      it('should use recursion by calling self', function() {
        minimizeZeroes(input1);
        expect(minimizeZeroes.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        minimizeZeroes(input2);
        minimizeZeroes.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());
