/* jshint esversion: 6 */

(function() {
  'use strict';

describe('27. Capitalize words in array', function() {
      var originalCapitalizeWords;

      before(function() {
        originalCapitalizeWords = capitalizeWords;
        capitalizeWords = sinon.spy(capitalizeWords);
      });

      afterEach(function() {
        capitalizeWords.reset();
      });

      after(function() {
        capitalizeWords = originalCapitalizeWords;
      });

      it('should return an array', function() {
        expect(capitalizeWords(['recursion'])).to.be.an('array');
      });

      it('should capitalize all words in array', function() {
        expect(capitalizeWords(["ceci","n'est","pas","une","pipe"])).to.eql(["CECI", "N'EST", "PAS", "UNE", "PIPE"]);
      });

      it('should use recursion by calling self', function() {
        capitalizeWords(['i','am','learning','recursion']);
        expect(capitalizeWords.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        capitalizeWords(['you','got','this']);
        capitalizeWords.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());
