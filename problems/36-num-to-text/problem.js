/* jshint esversion: 6 */

// Solve the following prompt using recursion.

// 36. Given a string, return a string with digits converted to their word equivalent.
// Assume all numbers are single digits (less than 10).
// numToText("I have 5 dogs and 6 ponies"); // "I have five dogs and six ponies"
var numToText = function (str) {
  const stringArray = str.split(" ");
  const [first, ...rest] = stringArray;
  if (Number.isInteger(first)) {}
};
