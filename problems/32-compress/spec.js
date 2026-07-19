/* jshint esversion: 6 */

(function() {
  'use strict';

describe('32. Eliminate consecutive duplicates', function() {
      var originalCompress, input1, input2;

      before(function() {
        originalCompress = compress;
        compress = sinon.spy(compress);
        input1 = [1,2,2,3,4,4,5,5,5];
        input2 = [1,2,2,3,4,4,2,5,5,5,4,4];
      });

      afterEach(function() {
        compress.reset();
      });

      after(function() {
        compress = originalCompress;
      });

      it('should return an array', function() {
        expect(compress(input1)).to.be.an('array');
      });

      it('should not mutate the input array', function() {
        var result = compress(input1);
        expect(input1).to.eql([1,2,2,3,4,4,5,5,5]);
        expect(input1).to.not.equal(result);
      });

      it('should remove consecutive duplicates', function() {
        expect(compress(input1)).to.eql([1,2,3,4,5]);
        expect(compress(input2)).to.eql([1,2,3,4,2,5,4]);
      });

      it('should use recursion by calling self', function() {
        compress(input1);
        expect(compress.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        compress(input1);
        compress.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());
