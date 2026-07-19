/* jshint esversion: 6 */

// Solve the following prompt using recursion.

// 22. Write a function that counts the number of times a key occurs in an object.
// var obj = {'e':{'x':'y'},'t':{'r':{'e':'r'},'p':{'y':'r'}},'y':'e'};
// countKeysInObj(obj, 'r') // 1
// countKeysInObj(obj, 'e') // 2
var countKeysInObj = function (obj, key) {
  let count = 0;
  for (let objKey of Object.keys(obj)) {
    if (objKey == key) count++;
    if (typeof obj[objKey] == "object") {
      count += countKeysInObj(obj[objKey], key);
    }
  }
  return count;
};
