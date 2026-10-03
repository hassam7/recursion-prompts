/* jshint esversion: 6 */

(function () {
  "use strict";

  describe("chunkArray", function () {
    var originalChunkArray;

    before(function () {
      originalChunkArray = chunkArray;
      chunkArray = sinon.spy(chunkArray);
    });

    afterEach(function () {
      chunkArray.reset();
    });

    after(function () {
      chunkArray = originalChunkArray;
    });

    it("should return an array", function () {
      expect(chunkArray([1, 2, 3], 2)).to.be.an("array");
    });

    it("should split an array into chunks of the given size", function () {
      expect(chunkArray([1, 2, 3, 4, 5, 6], 3)).to.eql([[1, 2, 3], [4, 5, 6]]);
      expect(chunkArray(["a", "b", "c", "d"], 2)).to.eql([["a", "b"], ["c", "d"]]);
    });

    it("should allow the final chunk to be smaller than size", function () {
      expect(chunkArray([1, 2, 3, 4, 5], 2)).to.eql([[1, 2], [3, 4], [5]]);
      expect(chunkArray([1, 2, 3, 4, 5], 4)).to.eql([[1, 2, 3, 4], [5]]);
    });

    it("should handle chunk sizes of one", function () {
      expect(chunkArray([1, 2, 3], 1)).to.eql([[1], [2], [3]]);
    });

    it("should return an empty array when given an empty array", function () {
      expect(chunkArray([], 3)).to.eql([]);
    });

    it("should put the whole array in one chunk when size is larger than the array length", function () {
      expect(chunkArray([1, 2, 3], 10)).to.eql([[1, 2, 3]]);
    });

    it("should not mutate the input array", function () {
      var arr = [1, 2, 3, 4, 5];
      var copy = arr.slice();

      chunkArray(arr, 2);

      expect(arr).to.eql(copy);
    });

    it("should use recursion by calling self", function () {
      chunkArray([1, 2, 3, 4, 5], 2);
      expect(chunkArray.callCount).to.be.above(1);
    });

    it("should always be invoked with two arguments", function () {
      chunkArray([1, 2, 3, 4], 2);

      chunkArray.args.forEach(function (args) {
        expect(args).to.have.length(2);
      });
    });
  });
})();


