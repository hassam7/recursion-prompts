/* jshint esversion: 6 */

(function() {
  'use strict';

describe('45. Deep Freeze', function() {
      var originalDeepFreeze, objectInput, arrayInput, result;

      before(function() {
        originalDeepFreeze = deepFreeze;
        deepFreeze = sinon.spy(deepFreeze);
      });

      afterEach(function() {
        deepFreeze.reset();
      });

      after(function() {
        deepFreeze = originalDeepFreeze;
      });

      it('should return the same object or array', function() {
        objectInput = {a: {b: 1}};
        arrayInput = [1, [2]];
        expect(deepFreeze(objectInput)).to.equal(objectInput);
        expect(deepFreeze(arrayInput)).to.equal(arrayInput);
      });

      it('should freeze objects and nested objects', function() {
        objectInput = {a: {b: {c: 1}}, d: 2};
        result = deepFreeze(objectInput);
        expect(Object.isFrozen(result)).to.be.true;
        expect(Object.isFrozen(result.a)).to.be.true;
        expect(Object.isFrozen(result.a.b)).to.be.true;
      });

      it('should freeze arrays and nested arrays or objects', function() {
        arrayInput = [1, [2, {three: 3}], {four: [4]}];
        result = deepFreeze(arrayInput);
        expect(Object.isFrozen(result)).to.be.true;
        expect(Object.isFrozen(result[1])).to.be.true;
        expect(Object.isFrozen(result[1][1])).to.be.true;
        expect(Object.isFrozen(result[2])).to.be.true;
        expect(Object.isFrozen(result[2].four)).to.be.true;
      });

      it('should leave primitive values unchanged', function() {
        expect(deepFreeze(1)).to.equal(1);
        expect(deepFreeze('hello')).to.equal('hello');
        expect(deepFreeze(null)).to.be.null;
      });

      it('should use recursion by calling self', function() {
        deepFreeze({a: {b: 1}});
        expect(deepFreeze.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        deepFreeze({a: {b: 1}});
        deepFreeze.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());