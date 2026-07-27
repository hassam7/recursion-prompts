/* jshint esversion: 6 */

(function () {
  "use strict";

  describe("canMakePlaylist", function () {
    var originalCanMakePlaylist;

    before(function () {
      originalCanMakePlaylist = canMakePlaylist;
      canMakePlaylist = sinon.spy(canMakePlaylist);
    });

    afterEach(function () {
      canMakePlaylist.reset();
    });

    after(function () {
      canMakePlaylist = originalCanMakePlaylist;
    });

    it("should return true for an exact match using distinct songs", function () {
      expect(canMakePlaylist([3, 5, 7], 10, 2)).to.be.true;
    });

    it("should allow reusing a song up to maxTimes", function () {
      expect(canMakePlaylist([4], 8, 2)).to.be.true;
      expect(canMakePlaylist([3], 9, 3)).to.be.true;
    });

    it("should return false when a song must be reused more than maxTimes", function () {
      expect(canMakePlaylist([4], 12, 2)).to.be.false;
      expect(canMakePlaylist([3], 12, 3)).to.be.false;
    });

    it("should return false when no valid combination exists", function () {
      expect(canMakePlaylist([5, 9], 8, 3)).to.be.false;
      expect(canMakePlaylist([6, 10], 7, 5)).to.be.false;
    });

    it("should handle a workout length of zero", function () {
      expect(canMakePlaylist([3, 5], 0, 2)).to.be.true;
      expect(canMakePlaylist([], 0, 2)).to.be.true;
    });

    it("should handle an empty song list", function () {
      expect(canMakePlaylist([], 5, 2)).to.be.false;
    });

    it("should respect maxTimes equal to zero", function () {
      expect(canMakePlaylist([2, 3], 0, 0)).to.be.true;
      expect(canMakePlaylist([2, 3], 2, 0)).to.be.false;
    });

    it("should find combinations while respecting reuse limits", function () {
      expect(canMakePlaylist([2, 3, 5], 10, 2)).to.be.true;
      expect(canMakePlaylist([2, 3], 7, 2)).to.be.true;
      expect(canMakePlaylist([2, 3], 9, 2)).to.be.false;
    });

    it("should handle songs of length zero correctly", function () {
      expect(canMakePlaylist([0, 5], 10, 2)).to.be.true;
      expect(canMakePlaylist([0], 1, 100)).to.be.false;
    });

    it("should not mutate the input songLengths array", function () {
      var songs = [3, 5, 7];
      var copy = songs.slice();

      canMakePlaylist(songs, 10, 2);

      expect(songs).to.deep.equal(copy);
    });

    it("should return the correct result for cases requiring backtracking", function () {
      expect(canMakePlaylist([2, 3], 7, 2)).to.be.true;
      expect(canMakePlaylist([2, 3], 9, 2)).to.be.false;
    });

    it("should always be invoked with three arguments", function () {
      canMakePlaylist([2, 3], 5, 2);

      canMakePlaylist.args.forEach(function (args) {
        expect(args).to.have.length(3);
      });
    });
  });
})();


/*

var canMakePlaylist = function (songLengths, workoutLength, maxTimes) {
  const used = new Array(songLengths.length).fill(0);

  const solve = (length) => {
    if (length === workoutLength) return true;
    if (length > workoutLength) return false;

    for (let i = 0; i < songLengths.length; i++) {
      if (used[i] < maxTimes) {
        used[i]++;

        if (solve(length + songLengths[i])) return true;

        used[i]--;
      }
    }

    return false;
  };

  return solve(0);
};

*/