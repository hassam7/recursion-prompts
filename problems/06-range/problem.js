/* jshint esversion: 6 */

// Solve the following prompt using recursion.

// 6. Get the integers within a range (x, y).
// range(2,9); // [3,4,5,6,7,8]
var range = function (x, y) {
  // 7, 2
  let result = [];
  const step = x > y ? -1 : 1;
  if (x == y) return [];
  if (x === y - step) [];
  else result = [x + step, ...range(x + step, y)];

  return result;
};
