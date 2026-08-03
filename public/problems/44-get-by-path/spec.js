/* jshint esversion: 6 */

(function() {
  'use strict';

describe('44. Object Path Lookup', function() {
      var originalGetByPath, input, path;

      before(function() {
        originalGetByPath = getByPath;
        getByPath = sinon.spy(getByPath);
      });

      afterEach(function() {
        getByPath.reset();
      });

      after(function() {
        getByPath = originalGetByPath;
      });

      it('should return the input object when path is empty', function() {
        input = {a: 1};
        expect(getByPath(input, [])).to.equal(input);
      });

      it('should not mutate the input object or path', function() {
        input = {user: {profile: {name: 'Ada'}}};
        path = ['user', 'profile', 'name'];
        getByPath(input, path);
        expect(input).to.eql({user: {profile: {name: 'Ada'}}});
        expect(path).to.eql(['user', 'profile', 'name']);
      });

      it('should return the value at the given path', function() {
        input = {user: {profile: {name: 'Ada', age: 36}}, active: true};
        expect(getByPath(input, ['user', 'profile', 'name'])).to.equal('Ada');
        expect(getByPath(input, ['user', 'profile', 'age'])).to.equal(36);
        expect(getByPath(input, ['active'])).to.be.true;
      });

      it('should work with arrays along the path', function() {
        input = {users: [{name: 'Ada'}, {name: 'Grace'}]};
        expect(getByPath(input, ['users', 0, 'name'])).to.equal('Ada');
        expect(getByPath(input, ['users', 1, 'name'])).to.equal('Grace');
      });

      it('should return undefined when the path cannot be followed', function() {
        expect(getByPath({a: {b: 1}}, ['a', 'c'])).to.be.undefined;
        expect(getByPath({a: null}, ['a', 'b'])).to.be.undefined;
        expect(getByPath(undefined, ['a'])).to.be.undefined;
      });

      it('should use recursion by calling self', function() {
        getByPath({a: {b: {c: 1}}}, ['a', 'b', 'c']);
        expect(getByPath.callCount).to.be.above(1);
      });

      it('should be invoked with two arguments', function() {
        getByPath({a: {b: {c: 1}}}, ['a', 'b', 'c']);
        getByPath.args.forEach(arg => {
          expect(arg).to.have.length(2);
        });
      });

    });

}());