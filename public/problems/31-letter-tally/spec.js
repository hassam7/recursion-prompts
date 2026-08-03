/* jshint esversion: 6 */

(function() {
  'use strict';

describe('31. Tally letters in string', function() {
      var originalLetterTally;

      before(function() {
        originalLetterTally = letterTally;
        letterTally = sinon.spy(letterTally);
      });

      afterEach(function() {
        letterTally.reset();
      });

      after(function() {
        letterTally = originalLetterTally;
      });

      it('should return an object', function() {
        expect(letterTally('orangutan')).to.be.an('object');
      });

      it('should return object containing tallies of unique letters', function() {
        var output = letterTally('potato');

        expect(output.p).to.equal(1);
        expect(output.o).to.equal(2);
        expect(output.t).to.equal(2);
        expect(output.a).to.equal(1);
      });

      it('should return object containing the number of keys corresponding to unique letters', function() {
        var output = letterTally('mississippi');
        var keyCount = Object.keys(output).length;
        expect(keyCount).to.equal(4);
      });

      it('should use recursion by calling self', function() {
        letterTally('invasion');
        expect(letterTally.callCount).to.be.above(1);
      });

      it('should be invoked with at most two arguments', function() {
        letterTally('invasion');
        letterTally.args.forEach(arg => {
          expect(arg).to.have.length.of.at.most(2);
        });
      });

    });

}());
