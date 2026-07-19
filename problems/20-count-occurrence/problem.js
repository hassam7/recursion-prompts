/* jshint esversion: 6 */

// Solve the following prompt using recursion.

// 20. Count the occurrence of a value in a list.
// countOccurrence([2,7,4,4,1,4], 4) // 3
// countOccurrence([2,'banana',4,4,1,'banana'], 'banana') // 2
var countOccurrence = function (array, value) {
  if (array.length === 0) return 0;
  else {
    const [first, ...rest] = array;
    if (first === value) return 1 + countOccurrence(rest, value);
    else return 0 + countOccurrence(rest, value);
  }
};
