/* jshint esversion: 6 */

// Solve the following prompt using recursion.

// 12. Write a function that multiplies two numbers without using the * operator or
// Math methods.
var multiply = function (x, y) {
  if (y == 0) return 0;
  if (y > 0) return x + multiply(x, y - 1);
  if (y < 0) return -multiply(x, -y);
};
