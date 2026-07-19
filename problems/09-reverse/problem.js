/* jshint esversion: 6 */

// Solve the following prompt using recursion.

// 9. Write a function that reverses a string.
var reverse = function (string) {
  return string.length == 0
    ? ""
    : reverse(string.substring(1)) + string.charAt(0);
};
