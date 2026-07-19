/* jshint esversion: 6 */

// Solve the following prompt using recursion.

// 32. Eliminate consecutive duplicates in a list. If the list contains repeated
// elements they should be replaced with a single copy of the element. The order of the
// elements should not be changed.
// compress([1,2,2,3,4,4,5,5,5]) // [1,2,3,4,5]
// compress([1,2,2,3,4,4,2,5,5,5,4,4]) // [1,2,3,4,2,5,4]
var compress = function (list) {
  if (list.length === 1) return list;
  else {
    const [first, second, ...rest] = list;
    if (first == second) {
      return compress([second, ...rest]);
    } else return [first, ...compress([second, ...rest])];
  }
};
