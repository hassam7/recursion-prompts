/* jshint esversion: 6 */

// Solve the following prompt using recursion.

// 27. Given an array of words, return a new array containing each word capitalized.
// var words = ['i', 'am', 'learning', 'recursion'];
// capitalizedWords(words); // ['I', 'AM', 'LEARNING', 'RECURSION']
var capitalizeWords = function (array) {
  if (array.length === 0) return [];
  else {
    const [first, ...rest] = array;
    return [first.toUpperCase(), ...capitalizeWords(rest)];
  }
};
