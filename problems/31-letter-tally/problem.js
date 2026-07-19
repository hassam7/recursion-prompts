/* jshint esversion: 6 */

// Solve the following prompt using recursion.

// 31. Given a string, return an object containing tallies of each letter.
// letterTally('potato'); // {p:1, o:2, t:2, a:1}
var letterTally = function (str, obj = {}) {
  if (str == "") return obj;
  else {
    const first = str.charAt(0);
    const rest = str.substring(1);
    if (obj[first]) {
      obj[first]++;
      return letterTally(rest, obj);
    } else {
      obj[first] = 1;
      return letterTally(rest, obj);
    }
  }
};
