/* jshint esversion: 6 */

(function() {
  'use strict';

describe('15. Compare Strings', function() {
      var originalCompareStr;

      before(function() {
        originalCompareStr = compareStr;
        compareStr = sinon.spy(compareStr);
      });

      afterEach(function() {
        compareStr.reset();
      });

      after(function() {
        compareStr = originalCompareStr;
      });

      it('should return a boolean', function() {
        expect(compareStr('house', 'houses')).to.be.a('boolean');
        expect(compareStr('', '')).to.be.a('boolean');
        expect(compareStr('tomato', 'tomato')).to.be.a('boolean');
      });

      it('should return true for identical strings', function() {
        expect(compareStr('house', 'houses')).to.be.false;
        expect(compareStr('', '')).to.be.true;
        expect(compareStr('tomato', 'tomato')).to.be.true;
        expect(compareStr('', 'pop')).to.be.false;
        expect(compareStr('foot', '')).to.be.false;
        expect(compareStr('big dog', 'big dog')).to.be.true;
      });

      it('should use recursion by calling self', function() {
        compareStr('house', 'houses');
        expect(compareStr.callCount).to.be.above(1);
      });

      it('should be invoked with two arguments', function() {
        compareStr('house', 'houses');
        compareStr.args.forEach(arg => {
          expect(arg).to.have.length(2);
        });
      });

    });

}());
