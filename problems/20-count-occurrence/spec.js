/* jshint esversion: 6 */

(function() {
  'use strict';

describe('20. Count value in array', function() {
      var originalCountOccurrence;

      before(function() {
        originalCountOccurrence = countOccurrence;
        countOccurrence = sinon.spy(countOccurrence);
      });

      afterEach(function() {
        countOccurrence.reset();
      });

      after(function() {
        countOccurrence = originalCountOccurrence;
      });

      it('should return a number', function() {
        expect(countOccurrence([2,7,4,4,1,4], 4)).to.be.a('number');
        expect(countOccurrence([2,'banana',4,4,1,'banana'], 'banana')).to.be.a('number');
      });

      it('should return the number of occurrences of the value', function() {
        expect(countOccurrence([2,7,4,4,1,4], 4)).to.equal(3);
        expect(countOccurrence([2,'banana',4,4,1,'banana'], 'banana')).to.equal(2);
        expect(countOccurrence([undefined,7,undefined,4,1,4], undefined)).to.equal(2);
        expect(countOccurrence(['',null,0,'0',false], 0)).to.equal(1);
        expect(countOccurrence(['',null,0,'false',false], false)).to.equal(1);
        expect(countOccurrence(['',7,null,0,'0',false], null)).to.equal(1);
        expect(countOccurrence(['',7,null,0,'0',false], '')).to.equal(1);
        // expect(countOccurrence(['',7,null,0,NaN,'0',false], NaN)).to.equal(1);
      });

      it('should use recursion by calling self', function() {
        countOccurrence([2,7,4,4,1,4], 4);
        expect(countOccurrence.callCount).to.be.above(1);
      });

      it('should be invoked with two arguments', function() {
        countOccurrence([2,7,4,4,1,4], 4);
        countOccurrence.args.forEach(arg => {
          expect(arg).to.have.length(2);
        });
      });

    });

}());
