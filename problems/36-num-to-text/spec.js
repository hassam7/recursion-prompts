/* jshint esversion: 6 */

(function() {
  'use strict';

describe('36. Convert numbers to text', function() {
      var originalNumToText, input1, input2;

      before(function() {
        originalNumToText = numToText;
        numToText = sinon.spy(numToText);
      });

      beforeEach(function() {
        input1 = '5 dogs and 6 ponies';
        input2 = 'Give me 8 dollars';
      });

      afterEach(function() {
        numToText.reset();
      });

      after(function() {
        numToText = originalNumToText;
      });

      it('should return a string', function() {
        expect(numToText(input1)).to.be.a('string');
      });

      it('should convert single digits to their word equivalent', function() {
        expect(numToText(input1)).to.equal('five dogs and six ponies');
        expect(numToText(input2)).to.equal('Give me eight dollars');
      });

      it('should use recursion by calling self', function() {
        numToText(input2);
        expect(numToText.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        numToText(input2);
        numToText.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());
