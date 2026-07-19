/* jshint esversion: 6 */

// Solve the following prompt using recursion.

// 16. Write a function that accepts a string and creates an array where each letter
// occupies an index of the array.
var createArray = function (str) {
  if (str == "") return [];
  else return [str[0], ...createArray(str.substring(1))];
};
