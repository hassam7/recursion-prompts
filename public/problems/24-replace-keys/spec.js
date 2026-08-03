/* jshint esversion: 6 */

(function() {
  'use strict';

describe('24. Replace keys in object', function() {
      var originalReplaceKeysInObj, input, output;

      before(function() {
        originalReplaceKeysInObj = replaceKeysInObj;
        replaceKeysInObj = sinon.spy(replaceKeysInObj);
      });

      beforeEach(function() {
        input = {e:{x:'y'},t:{r:{e:'r'},p:{y:'r'}},y:'e'};
      });

      afterEach(function() {
        replaceKeysInObj.reset();
      });

      after(function() {
        replaceKeysInObj = originalReplaceKeysInObj;
      });

      it('should return an object', function() {
        output = replaceKeysInObj(input, 'r', 'a');
        expect(output).to.be.an('object');
      });

      it('should mutate the input object', function() {
        output = replaceKeysInObj(input, 'y', 'u');
        expect(input).to.equal(output);
      });

      it('should return object containing renamed keys', function() {
        replaceKeysInObj(input, 'e', 'f');

        expect(input).to.have.all.keys('f','t','y');
        expect(input.f).to.be.an('object');
        expect(input.f).to.have.all.keys('x');

        expect(input.f.x).to.be.a('string');
        expect(input.f.x).to.equal('y');

        expect(input.t).to.be.an('object');
        expect(input.t).to.have.all.keys('r','p');

        expect(input.t.r).to.be.an('object');
        expect(input.t.r).to.have.all.keys('f');
        expect(input.t.r.f).to.be.a('string');
        expect(input.t.r.f).to.equal('r');

        expect(input.t.p).to.be.an('object');
        expect(input.t.p).to.have.all.keys('y');
        expect(input.t.p.y).to.be.a('string');
        expect(input.t.p.y).to.equal('r');

        expect(input.y).to.be.a('string');
        expect(input.y).to.equal('e');

        expect(input).to.not.have.ownProperty('e');
        expect(input.t.r).to.not.have.ownProperty('e');
      });

      it('should return object with same number of keys', function() {
        expect(analyze(input)).to.equal(8);
        output = replaceKeysInObj(input, 'e', 'f');
        expect(analyze(output)).to.equal(8);
      });

      it('should use recursion by calling self', function() {
        replaceKeysInObj(input, 'r', 'a');
        expect(replaceKeysInObj.callCount).to.be.above(1);
      });

      it('should be invoked with three arguments', function() {
        replaceKeysInObj(input, 'r', 'a');
        replaceKeysInObj.args.forEach(arg => {
          expect(arg).to.have.length(3);
        });
      });

    });

}());
