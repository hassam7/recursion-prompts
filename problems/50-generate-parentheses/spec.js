/* jshint esversion: 6 */

(function() {
  'use strict';

describe('50. Generate Parentheses', function() {
      var originalGenerateParentheses;

      before(function() {
        originalGenerateParentheses = generateParentheses;
        generateParentheses = sinon.spy(generateParentheses);
      });

      afterEach(function() {
        generateParentheses.reset();
      });

      after(function() {
        generateParentheses = originalGenerateParentheses;
      });

      it('should return an array', function() {
        expect(generateParentheses(1)).to.be.an('array');
      });

      it('should return an empty string for zero pairs', function() {
        expect(generateParentheses(0)).to.eql(['']);
      });

      it('should return all balanced parentheses combinations', function() {
        expect(generateParentheses(1).sort()).to.eql(['()']);
        expect(generateParentheses(2).sort()).to.eql(['(())', '()()']);
        expect(generateParentheses(3).sort()).to.eql(['((()))', '(()())', '(())()', '()(())', '()()()']);
      });

      it('should not include duplicate combinations', function() {
        var result = generateParentheses(4);
        var unique = result.filter((value, index, array) => array.indexOf(value) === index);
        expect(result.length).to.equal(unique.length);
      });

      it('should use recursion by calling self', function() {
        generateParentheses(3);
        expect(generateParentheses.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        generateParentheses(3);
        generateParentheses.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());