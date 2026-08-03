/* jshint esversion: 6 */

(function() {
  'use strict';

describe('47. Find In Tree', function() {
      var originalTreeIncludes, tree;

      before(function() {
        originalTreeIncludes = treeIncludes;
        treeIncludes = sinon.spy(treeIncludes);
      });

      afterEach(function() {
        treeIncludes.reset();
      });

      after(function() {
        treeIncludes = originalTreeIncludes;
      });

      it('should return a boolean', function() {
        expect(treeIncludes({value: 1, children: []}, 1)).to.be.a('boolean');
      });

      it('should not mutate the input tree', function() {
        tree = {value: 'root', children: [{value: 'leaf', children: []}]};
        treeIncludes(tree, 'leaf');
        expect(tree).to.eql({value: 'root', children: [{value: 'leaf', children: []}]});
      });

      it('should return true when target is found', function() {
        tree = {
          value: 'root',
          children: [
            {value: 'left', children: []},
            {value: 'right', children: [{value: 'target', children: []}]}
          ]
        };
        expect(treeIncludes(tree, 'root')).to.be.true;
        expect(treeIncludes(tree, 'left')).to.be.true;
        expect(treeIncludes(tree, 'target')).to.be.true;
      });

      it('should return false when target is not found', function() {
        tree = {value: 1, children: [{value: 2, children: [{value: 3, children: []}]}]};
        expect(treeIncludes(tree, 4)).to.be.false;
        expect(treeIncludes({value: 'a', children: []}, 'b')).to.be.false;
      });

      it('should use recursion by calling self', function() {
        treeIncludes({value: 1, children: [{value: 2, children: []}]}, 2);
        expect(treeIncludes.callCount).to.be.above(1);
      });

      it('should be invoked with two arguments', function() {
        treeIncludes({value: 1, children: [{value: 2, children: []}]}, 2);
        treeIncludes.args.forEach(arg => {
          expect(arg).to.have.length(2);
        });
      });

    });

}());