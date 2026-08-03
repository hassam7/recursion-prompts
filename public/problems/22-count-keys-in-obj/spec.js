/* jshint esversion: 6 */

(function() {
  'use strict';

describe('22. Count key in object', function() {
      var originalCountKeysInObj, input;

      before(function() {
        originalCountKeysInObj = countKeysInObj;
        countKeysInObj = sinon.spy(countKeysInObj);
        input = {e:{x:'y'},t:{r:{e:'r'},p:{y:'r'}},y:'e'};
      });

      afterEach(function() {
        countKeysInObj.reset();
      });

      after(function() {
        countKeysInObj = originalCountKeysInObj;
      });

      it('should return a number', function() {
        expect(countKeysInObj(input, 'r')).to.be.a('number');
      });

      it('should return the number of occurrences of the property', function() {
        expect(countKeysInObj(input, 'e')).to.equal(2);
        expect(countKeysInObj(input, 'x')).to.equal(1);
        expect(countKeysInObj(input, 'y')).to.equal(2);
        expect(countKeysInObj(input, 't')).to.equal(1);
        expect(countKeysInObj(input, 'r')).to.equal(1);
        expect(countKeysInObj(input, 'p')).to.equal(1);
      });

      it('should use recursion by calling self', function() {
        countKeysInObj(input, 'e');
        expect(countKeysInObj.callCount).to.be.above(1);
      });

      it('should be invoked with two arguments', function() {
        countKeysInObj(input, 'e');
        countKeysInObj.args.forEach(arg => {
          expect(arg).to.have.length(2);
        });
      });

    });

}());
