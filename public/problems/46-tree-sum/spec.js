/* jshint esversion: 6 */

(function() {
  'use strict';

describe('46. Tree Sum', function() {
      var originalTreeSum, tree;

      before(function() {
        originalTreeSum = treeSum;
        treeSum = sinon.spy(treeSum);
      });

      afterEach(function() {
        treeSum.reset();
      });

      after(function() {
        treeSum = originalTreeSum;
      });

      it('should return a number', function() {
        expect(treeSum({value: 1, children: []})).to.be.a('number');
      });

      it('should not mutate the input tree', function() {
        tree = {value: 1, children: [{value: 2, children: []}]};
        treeSum(tree);
        expect(tree).to.eql({value: 1, children: [{value: 2, children: []}]});
      });

      it('should sum a single node tree', function() {
        expect(treeSum({value: 7, children: []})).to.equal(7);
      });

      it('should sum all values in a nested tree', function() {
        tree = {
          value: 5,
          children: [
            {value: 3, children: []},
            {value: 2, children: [
              {value: 4, children: []},
              {value: 6, children: []}
            ]}
          ]
        };
        expect(treeSum(tree)).to.equal(20);
      });

      it('should support negative values', function() {
        tree = {value: -1, children: [{value: 2, children: [{value: -3, children: []}]}]};
        expect(treeSum(tree)).to.equal(-2);
      });

      it('should use recursion by calling self', function() {
        treeSum({value: 1, children: [{value: 2, children: []}]});
        expect(treeSum.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        treeSum({value: 1, children: [{value: 2, children: []}]});
        treeSum.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());