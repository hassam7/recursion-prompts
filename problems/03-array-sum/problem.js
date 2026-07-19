/* jshint esversion: 6 */

// Solve the following prompt using recursion.

// 3. Sum all numbers in an array containing nested arrays.
// arraySum([1,[2,3],[[4]],5]); // 15
var arraySum = function (array) {
  let sum = 0;
  for (let item of array) {
    if (Array.isArray(item)) {
      sum += arraySum(item);
    } else {
      sum += item;
    }
  }
  return sum;
};
