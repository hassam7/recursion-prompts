/* jshint esversion: 6 */

(function() {
  'use strict';

describe('33. Augment each element in nested arrays', function() {
      var originalAugmentElements;

      before(function() {
        originalAugmentElements = augmentElements;
        augmentElements = sinon.spy(augmentElements);
      });

      afterEach(function() {
        augmentElements.reset();
      });

      after(function() {
        augmentElements = originalAugmentElements;
      });

      it('should return an array', function() {
        expect(augmentElements([[],[3]], 5)).to.be.an('array');
      });

      it('should augment each element with given value', function() {
        expect(augmentElements([[],[3],[7]], 5)).to.eql([[5],[3,5],[7,5]]);
        expect(augmentElements([[],[3],[7]], null)).to.eql([[null],[3,null],[7,null]]);
        expect(augmentElements([[],[3],[7]], '')).to.eql([[''],[3,''],[7,'']]);
        expect(augmentElements([[],[3],[7]], false)).to.eql([[false],[3,false],[7,false]]);
      });

      it('should use recursion by calling self', function() {
        augmentElements([[],[3]], 5);
        expect(augmentElements.callCount).to.be.above(1);
      });

      it('should be invoked with two arguments', function() {
        augmentElements([[],[3]], 5);
        augmentElements.args.forEach(arg => {
          expect(arg).to.have.length(2);
        });
      });

    });

}());
