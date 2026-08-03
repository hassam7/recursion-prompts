/* jshint esversion: 6 */

(function() {
  'use strict';

describe('19. FizzBuzz', function() {
      var originalFizzBuzz, actualResult, expectedResult;

      before(function() {
        originalFizzBuzz = fizzBuzz;
        fizzBuzz = sinon.spy(fizzBuzz);
      });

      afterEach(function() {
        fizzBuzz.reset();
      });

      after(function() {
        fizzBuzz = originalFizzBuzz;
      });

      it('should return an array', function() {
        expect(fizzBuzz(3)).to.be.an('array');
      });

      it('should return string representations of numbers 1 to n', function() {
        actualResult = fizzBuzz(10);
        actualResult.forEach(function(value) {
          expect(value).to.be.a('string');
        });
      });

      it('should output "Fizz" for multiples of three', function() {
        actualResult = fizzBuzz(3);
        expectedResult = ['1','2','Fizz'];
        expect(actualResult).to.eql(expectedResult);
      });

      it('should output "Buzz" for multiples of five', function() {
        actualResult = fizzBuzz(12);
        expectedResult = ['1','2','Fizz','4','Buzz','Fizz','7','8','Fizz','Buzz','11','Fizz'];
        expect(actualResult).to.eql(expectedResult);
      });

      it('should output "FizzBuzz" for multiples of both three and five', function() {
        actualResult = fizzBuzz(15);
        expectedResult = ['1','2','Fizz','4','Buzz','Fizz','7','8','Fizz','Buzz','11','Fizz','13','14','FizzBuzz'];
        expect(actualResult).to.eql(expectedResult);
      });

      it('should use recursion by calling self', function() {
        fizzBuzz(5);
        expect(fizzBuzz.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        fizzBuzz(5);
        fizzBuzz.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());
