/* jshint esversion: 6 */

// Solve the following prompt using recursion.

// 17. Reverse the order of an array
var reverseArr = function (array) {
  if (!array.length) return [];
  else {
    const [first, ...rest] = array;
    return [...reverseArr(rest), first];
  }
};
