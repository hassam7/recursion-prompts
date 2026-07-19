/* jshint esversion: 6 */

(function() {
  'use strict';

describe('40. Clone', function() {
      var originalClone, object1, object2, array1, array2, result;

      before(function() {
        originalClone = clone;
        clone = sinon.spy(clone);
        object1 = {a:1,b:{bb:{bbb:2}},c:3};
        object2 = {a:1,b:['bb',{bbb:[2]}],c:{cc:[3,{ccc:4},5]}};
        array1 = [1,[2,[]],3,[[[4]],5]];
        array2 = [1,[2,{a:[{},2,3]}],{3:[4]},5];
      });

      afterEach(function() {
        clone.reset();
      });

      after(function() {
        clone = originalClone;
      });

      it('should return an object when input is an object', function() {
        result = clone(object1);
        expect(result).to.be.an('object');
        expect(result).to.not.be.an('array');
      });

      it('should return an array when input is an array', function() {
        result = clone(array1);
        expect(result).to.be.an('array');
        expect(result).to.not.be.an('object');
      });

      it('should not mutate the input object or array', function() {
        result = clone(object1);
        expect(object1).to.eql({a:1,b:{bb:{bbb:2}},c:3});
        expect(result).to.not.equal(object1);
        result = clone(array1);
        expect(array1).to.eql([1,[2,[]],3,[[[4]],5]]);
        expect(result).to.not.equal(array1);
      });

      it('should shallow clone objects', function() {
        result = clone(object1);
        expect(result).to.eql(object1);
      });

      it('should shallow clone arrays', function() {
        result = clone(array1);
        expect(result).to.eql(array1);
      });

      it('should deeply clone objects', function() {
        result = clone(object2);
        expect(result).to.eql(object2);
        expect(result.b).to.eql(object2.b);
        expect(result.b).to.not.equal(object2.b);
        expect(result.b[1]).to.eql(object2.b[1]);
        expect(result.b[1]).to.not.equal(object2.b[1]);
        expect(result.b[1].bbb).to.eql(object2.b[1].bbb);
        expect(result.b[1].bbb).to.not.equal(object2.b[1].bbb);
        expect(result.c).to.eql(object2.c);
        expect(result.c).to.not.equal(object2.c);
        expect(result.c.cc).to.eql(object2.c.cc);
        expect(result.c.cc).to.not.equal(object2.c.cc);
        expect(result.c.cc[1]).to.eql(object2.c.cc[1]);
        expect(result.c.cc[1]).to.not.equal(object2.c.cc[1]);
      });

      it('should deeply clone arrays', function() {
        result = clone(array2);
        expect(result).to.eql(array2);
        expect(result[1]).to.eql(array2[1]);
        expect(result[1]).to.not.equal(array2[1]);
        expect(result[1][1]).to.eql(array2[1][1]);
        expect(result[1][1]).to.not.equal(array2[1][1]);
        expect(result[1][1].a).to.eql(array2[1][1].a);
        expect(result[1][1].a).to.not.equal(array2[1][1].a);
        expect(result[1][1].a[0]).to.eql(array2[1][1].a[0]);
        expect(result[1][1].a[0]).to.not.equal(array2[1][1].a);
        expect(result[2]).to.eql(array2[2]);
        expect(result[2]).to.not.equal(array2[2]);
        expect(result[2]['3']).to.eql(array2[2]['3']);
        expect(result[2]['3']).to.not.equal(array2[2]['3']);
      });

      it("should not use native JSON methods or Object.assign", function() {
        // Spying on methods in testSupport.js
        clone(object2);
        clone(array2);
        expect(Object.assign.called).to.be.false;
        expect(JSON.stringify.called).to.be.false;
        expect(JSON.parse.called).to.be.false;
      });

      it('should use recursion by calling self', function () {
        clone(object1);
        expect(clone.callCount).to.be.above(1);
        clone.reset();
        clone(array1);
        expect(clone.callCount).to.be.above(1);
      });

      it('should be invoked with one argument', function() {
        clone(object1);
        clone.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
        clone.reset();
        clone(array1);
        clone.args.forEach(arg => {
          expect(arg).to.have.length(1);
        });
      });

    });

}());
