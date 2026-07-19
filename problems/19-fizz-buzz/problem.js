/* jshint esversion: 6 */

// Solve the following prompt using recursion.

// 19. Implement FizzBuzz. Given integer n, return an array of the string representations of 1 to n.
// For multiples of three, output 'Fizz' instead of the number.
// For multiples of five, output 'Buzz' instead of the number.
// For numbers which are multiples of both three and five, output “FizzBuzz” instead of the number.
// fizzBuzz(5) // ['1','2','Fizz','4','Buzz']
var fizzBuzz = function (n) {
  if (n === 0) return [];
  else {
    if (n % 3 == 0 && n % 5 == 0) {
      const temp = [...fizzBuzz(n - 1), "FizzBuzz"];
      return temp;
    } else if (n % 5 == 0) {
      const temp = [...fizzBuzz(n - 1), "Buzz"];
      return temp;
    } else if (n % 3 == 0) {
      const temp = [...fizzBuzz(n - 1), "Fizz"];
      return temp;
    } else {
      const temp = [...fizzBuzz(n - 1), n + ""];
      return temp;
    }
  }
};
