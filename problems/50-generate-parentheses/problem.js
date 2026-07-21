/* jshint esversion: 6 */

// Solve the following prompt using recursion.

// 50. Given a number n, return all combinations of n pairs of balanced parentheses.
// The order of combinations does not matter.
// generateParentheses(3); // ['((()))', '(()())', '(())()', '()(())', '()()()']
var generateParentheses = function (n) {
  if (typeof n === 'number' && n === 0) {
    return [''];
  }

  if (typeof n === 'number') {
    var allOptions = generateParentheses({ str: '', length: n * 2 });

    return allOptions.filter(option => {
      var balance = 0;

      for (var i = 0; i < option.length; i++) {
        if (option[i] === '(') {
          balance++;
        } else {
          balance--;
        }

        if (balance < 0) {
          return false;
        }
      }

      return balance === 0;
    });
  }

  if (n.str.length === n.length) {
    return [n.str];
  }

  return generateParentheses({ str: n.str + '(', length: n.length })
    .concat(generateParentheses({ str: n.str + ')', length: n.length }));
};