/* jshint esversion: 6 */

(function() {
  'use strict';

describe('16. Create array from string', function() {
      var originalCreateArray;

      before(function() {
        originalCreateArray = createArray;
        createArray = sinon.spy(createArray);
      });

      afterEach(function() {
        createArray.reset();
      });

      after(function() {
        createArray = originalCreateArray;
      });

      it('should return an array', function() {
        expect(createArray('hello')).to.be.an('array');
      });

      it('should return an array where each index is a letter of the string', function() {
        expect(createArray('this is not a pipe')).to.eql(['t','h','i','s',' ','i','s',' ','n','o','t',' ','a',' ','p','i','p','e']);
        expect(createArray('hologram')).to.eql(['h','o','l','o','g','r','a','m']);
        expect(createArray('i')).to.eql(['i']);
      });

      it('should use recursion by calling self', function() {
        createArray('hello');
        expect(createArray.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        createArray('hello');
        createArray.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());
