/* jshint esversion: 6 */

(function () {
  "use strict";

  describe("elementSpellable", function () {
    var originalElementSpellable;

    before(function () {
      originalElementSpellable = elementSpellable;
      elementSpellable = sinon.spy(elementSpellable);
    });

    afterEach(function () {
      elementSpellable.reset();
    });

    after(function () {
      elementSpellable = originalElementSpellable;
    });

    it("should spell a word using the given element symbols", function () {
      expect(elementSpellable("began", ["Be", "Ga", "N"])).to.deep.equal([
        "Be",
        "Ga",
        "N",
      ]);
    });

    it("should spell a word that needs several symbols", function () {
      expect(elementSpellable("feline", ["Fe", "Li", "Ne"])).to.deep.equal([
        "Fe",
        "Li",
        "Ne",
      ]);
    });

    it("should spell 'physics' from the periodic table symbols", function () {
      var symbols = ["P", "H", "Y", "S", "I", "C"];
      expect(elementSpellable("physics", symbols)).to.deep.equal([
        "P",
        "H",
        "Y",
        "S",
        "I",
        "C",
        "S",
      ]);
    });

    it("should return null when the word cannot be spelled", function () {
      expect(elementSpellable("interesting", ["I", "N", "Te"])).to.be.null;
      expect(elementSpellable("chemistry", ["C", "H", "E", "Mi"])).to.be.null;
    });

    it("should return an empty array for the empty string", function () {
      expect(elementSpellable("", ["H", "He"])).to.deep.equal([]);
    });

    it("should match case-insensitively but return proper capitalization", function () {
      expect(elementSpellable("BeGaN", ["Be", "Ga", "N"])).to.deep.equal([
        "Be",
        "Ga",
        "N",
      ]);
      expect(elementSpellable("FELINE", ["Fe", "Li", "Ne"])).to.deep.equal([
        "Fe",
        "Li",
        "Ne",
      ]);
    });

    it("should return null when no symbols are available for a non-empty word", function () {
      expect(elementSpellable("began", [])).to.be.null;
    });

    it("should prefer a valid decomposition that requires backtracking", function () {
      // "boron" — greedily taking "B" then "O" leaves "ron" unspellable unless
      // the multi-letter symbols are considered.
      expect(elementSpellable("boron", ["B", "O", "Ro", "N"])).to.deep.equal([
        "B",
        "O",
        "Ro",
        "N",
      ]);
    });

    it("should handle a single-letter word", function () {
      expect(elementSpellable("n", ["N"])).to.deep.equal(["N"]);
      expect(elementSpellable("x", ["N"])).to.be.null;
    });

    it("should handle overlapping symbols by finding a working split", function () {
      // "he" can be taken as ["He"] or as ["H", "E"]; either is acceptable, so
      // just assert the word is spellable into symbols that reconstruct it.
      var result = elementSpellable("he", ["H", "He", "E"]);
      expect(result).to.not.be.null;
      expect(result.join("").toLowerCase()).to.equal("he");
    });
  });
})();

/*

var elementSpellable = function (text, symbols) {
  var result = [];

  var solve = function (remaining) {
    if (remaining === "") {
      return true;
    }

    for (const symbol of symbols) {
      if (remaining.toLowerCase().startsWith(symbol.toLowerCase())) {
        result.push(symbol);

        if (solve(remaining.slice(symbol.length))) {
          return true;
        }

        result.pop(); // dead end: undo the push and try the next symbol
      }
    }

    return false;
  };

  return solve(text) ? result : null;
};

*/
