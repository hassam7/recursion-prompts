/* jshint esversion: 6 */

// Solve the following prompt using recursion.

// 34. Reduce a series of zeroes to a single 0.
// minimizeZeroes([2,0,0,0,1,4]) // [2,0,1,4]
// minimizeZeroes([2,0,0,0,1,0,0,4]) // [2,0,1,0,4]
var minimizeZeroes = function (array) {
  if (array.length === 1) return array;
  else {
    const [first, second, ...rest] = array;
    if (first == 0 && first == second) {
      return minimizeZeroes([second, ...rest]);
    } else return [first, ...minimizeZeroes([second, ...rest])];
  }
};
