/* jshint esversion: 6 */

// Solve the following prompt using recursion.

// 15. Write a function that compares each character of two strings and returns true if
// both are identical.
// compareStr('house', 'houses') // false
// compareStr('tomato', 'tomato') // true
var compareStr = function (str1, str2) {
  if (str1 === "" && str2 === "") return true;
  return (
    str1.charAt(0) === str2.charAt(0) &&
    compareStr(str1.substring(1), str2.substring(1))
  );
};
