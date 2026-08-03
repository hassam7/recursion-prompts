/* jshint esversion: 6 */

(function() {
  'use strict';

describe('28. Capitalize first letter of words in array', function() {
      var originalCapitalizeFirst;

      before(function() {
        originalCapitalizeFirst = capitalizeFirst;
        capitalizeFirst = sinon.spy(capitalizeFirst);
      });

      afterEach(function() {
        capitalizeFirst.reset();
      });

      after(function() {
        capitalizeFirst = originalCapitalizeFirst;
      });

      it('should return an array', function() {
        expect(capitalizeFirst(['recursion'])).to.be.an('array');
      });

      it('should capitalize first letter of each word in array', function() {
        expect(capitalizeFirst(["ceci","n'est","pas","une","pipe"])).to.eql(["Ceci", "N'est", "Pas", "Une", "Pipe"]);
      });

      it('should use recursion by calling self', function() {
        capitalizeFirst(["ceci","n'est","pas","une","pipe"]);
        expect(capitalizeFirst.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        capitalizeFirst(['you','got','this']);
        capitalizeFirst.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());
