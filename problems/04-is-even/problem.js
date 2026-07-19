/* jshint esversion: 6 */

// Solve the following prompt using recursion.

// 4. Check if a number is even.
var isEven = function (n) {
  n = Math.abs(n);
  if (n === 0) return true;
  else if (n === 1) return false;
  else return isEven(n - 2);
};
