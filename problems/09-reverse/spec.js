/* jshint esversion: 6 */

(function() {
  'use strict';

describe('9. Reverse String', function() {
      var originalReverse;

      before(function() {
        originalReverse = reverse;
        reverse = sinon.spy(reverse);
      });

      afterEach(function() {
        reverse.reset();
      });

      after(function() {
        reverse = originalReverse;
      });

      it('should return a string', function() {
        expect(reverse('traf')).to.be.a('string');
      });

      it('should return a string in reverse', function() {
        var input = 'All my base are belong to you.';
        var tupni = '.uoy ot gnoleb era esab ym llA';
        expect(reverse(input)).to.equal(tupni);
      });

      it('should not use native reverse method', function() {
        // Spying on Array.prototype.reverse in testSupport.js
        reverse('traf');
        expect(Array.prototype.reverse.called).to.be.false;
      });

      it('should use recursion by calling self', function() {
        reverse('orangutan');
        expect(reverse.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        reverse('orangutan');
        reverse.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());
