/* jshint esversion: 6 */

// Solve the following prompt using recursion.

// 51. Element Spellable
//
// Some words in the English language can be spelled out using just element
// symbols from the Periodic Table. For example, "began" can be spelled out as
// BeGaN (beryllium, gallium, nitrogen), and "feline" can be spelled out as
// FeLiNe (iron, lithium, neon). Not all words have this property, though: the
// word "interesting" cannot be made out of element letters.
//
// Write a function that accepts a string and an array of element symbols
// (stored with the proper capitalization), and returns an array of element
// symbols that spells the word. Matching is case-insensitive, but the returned
// symbols must use the proper capitalization from the symbols list.
//
// If the word cannot be spelled using the element symbols, return null.
// The empty string is spellable using no elements, so it returns [].
//
// Examples:
//
// elementSpellable("began", ["Be", "Ga", "N"]);        // ["Be", "Ga", "N"]
// elementSpellable("feline", ["Fe", "Li", "Ne"]);      // ["Fe", "Li", "Ne"]
// elementSpellable("interesting", ["I", "N", "Te"]);   // null
// elementSpellable("", ["H", "He"]);                   // []

// after solving this one try word break on leetcode

var elementSpellable = function (text, symbols) {
};
