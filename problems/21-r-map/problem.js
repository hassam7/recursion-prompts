/* jshint esversion: 6 */

// Solve the following prompt using recursion.

// 21. Write a recursive version of map.
// rMap([1,2,3], timesTwo); // [2,4,6]
var rMap = function (array, callback) {
  if (!array.length) return [];
  const [first, ...rest] = array;
  return [callback(first), ...rMap(rest, callback)];
};
