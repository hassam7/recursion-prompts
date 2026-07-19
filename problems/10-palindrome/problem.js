/* jshint esversion: 6 */

// Solve the following prompt using recursion.

// 10. Write a function that determines if a string is a palindrome.
var palindrome = function (string) {
  if (string.length == 0 || string.length == 1) return true;
  else
    return (
      string[0].toLocaleLowerCase() ===
        string[string.length - 1].toLocaleLowerCase() &&
      palindrome(string.substring(1, string.length - 1))
    );
};
