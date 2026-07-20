/* jshint esversion: 6 */

(function() {
  'use strict';

describe('10. Palindrome', function() {
      var originalPalindrome;

      before(function() {
        originalPalindrome = palindrome;
        palindrome = sinon.spy(palindrome);
      });

      afterEach(function() {
        palindrome.reset();
      });

      after(function() {
        palindrome = originalPalindrome;
      });

      it('should return a boolean', function() {
        expect(palindrome('rotor')).to.be.a('boolean');
        expect(palindrome('motor')).to.be.a('boolean');
      });

      it('should not use native reverse method', function() {
        palindrome('hannah');
        expect(Array.prototype.reverse.called).to.be.false;
      });

      it('should return true for palindromes', function() {
        expect(palindrome('o')).to.be.true;
        expect(palindrome('racecar')).to.be.true;
        expect(palindrome('saippuakivikauppias')).to.be.true;
      });

      it('should return false for non-palindromes', function() {
        expect(palindrome('hi')).to.be.false;
        expect(palindrome('orangutan')).to.be.false;
      });

      it('should ignore spaces and capital letters', function() {
        expect(palindrome('Rotor')).to.be.true;
        expect(palindrome('sAip puaki v iKaup Pias')).to.be.true;
      });

      it('should use recursion by calling self', function() {
        palindrome('racecar');
        expect(palindrome.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        palindrome('racecar');
        palindrome.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());
