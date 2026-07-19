/* jshint esversion: 6 */

// Solve the following prompt using recursion.

// 30. Flatten an array containing nested arrays.
// flatten([1,[2],[3,[[4]]],5]); // [1,2,3,4,5]
var flatten = function (array) {
  let result = [];
  for (let item of array) {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else result.push(item);
  }
  return result;
};
