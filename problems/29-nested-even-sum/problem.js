/* jshint esversion: 6 */

// Solve the following prompt using recursion.

// 29. Return the sum of all even numbers in an object containing nested objects.
// var obj1 = {
//   a: 2,
//   b: {b: 2, bb: {b: 3, bb: {b: 2}}},
//   c: {c: {c: 2}, cc: 'ball', ccc: 5},
//   d: 1,
//   e: {e: {e: 2}, ee: 'car'}
// };
// nestedEvenSum(obj1); // 10
var nestedEvenSum = function (obj) {
  let currentSum = 0;
  for (let item of Object.keys(obj)) {
    if (Number.isInteger(obj[item])) {
      if (obj[item] % 2 == 0) currentSum += obj[item];
    } else if (typeof obj[item] == "object") {
      currentSum += nestedEvenSum(obj[item]);
    }
  }
  return currentSum;
};
