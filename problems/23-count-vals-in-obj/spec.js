/* jshint esversion: 6 */

(function() {
  'use strict';

describe('23. Count value in object', function() {
      var originalCountValuesInObj, input;

      before(function() {
        originalCountValuesInObj = countValuesInObj;
        countValuesInObj = sinon.spy(countValuesInObj);
        input = {e:{x:'y'},t:{r:{e:'r'},p:{y:'r'}},y:'e'};
      });

      afterEach(function() {
        countValuesInObj.reset();
      });

      after(function() {
        countValuesInObj = originalCountValuesInObj;
      });

      it('should return a number', function() {
        expect(countValuesInObj(input, 'r')).to.be.a('number');
      });

      it('should return the count of the occurrences of the property', function() {
        expect(countValuesInObj(input, 'e')).to.equal(1);
        expect(countValuesInObj(input, 'x')).to.equal(0);
        expect(countValuesInObj(input, 'y')).to.equal(1);
        expect(countValuesInObj(input, 't')).to.equal(0);
        expect(countValuesInObj(input, 'r')).to.equal(2);
        expect(countValuesInObj(input, 'p')).to.equal(0);
      });

      it('should use recursion by calling self', function() {
        countValuesInObj(input, 'r');
        expect(countValuesInObj.callCount).to.be.above(1);
      });

      it('should be invoked with two arguments', function() {
        countValuesInObj(input, 'r');
        countValuesInObj.args.forEach(arg => {
          expect(arg).to.have.length(2);
        });
      });

    });

}());
