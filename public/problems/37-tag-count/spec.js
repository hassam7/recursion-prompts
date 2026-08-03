/* jshint esversion: 6 */

(function() {
  'use strict';

describe('37. Count Tags', function() {
      var originalTagCount, actualResults, expectedResults, tags, $child, $rootElement;

      before(function() {
        originalTagCount = tagCount;
        tagCount = sinon.spy(tagCount);
        actualResults = [];
        expectedResults = [];
        $rootElement = $('<div id="tagCountTest"><p>beep</p><div><p><span>blip</span></p></div><p>blorp</p></div>');
        $child = $('#mocha');
        $child.remove();
        $('body').append($rootElement);
        tags = document.getElementById('tagCountTest');
      });

      afterEach(function() {
        tagCount.reset();
      });

      after(function() {
        $rootElement.remove();
        $('body').append($child);
        tagCount = originalTagCount;
      });

      it('should return a number', function() {
        actualResults.push(tagCount('p'));
        expectedResults.push(document.getElementsByTagName('p').length);
        expect(actualResults[0]).to.be.a('number');
      });

      it('should return number of times tag occurs', function() {
        actualResults.push(tagCount('div'));
        expectedResults.push(document.getElementsByTagName('div').length);
        expect(actualResults[1]).to.equal(expectedResults[1]);
      });

      it('should support various tag types', function() {
        actualResults.push(tagCount('span'));
        expectedResults.push(document.getElementsByTagName('span').length);
        actualResults.forEach(function(result, i) {
          expect(result).to.equal(expectedResults[i]);
        });
      });

      it('should not require starting node argument', function() {
        tagCount('html');
        expect(tagCount.args[0]).to.have.length(1);
      });

      it('should use recursion by calling self', function() {
        tagCount('p')
        expect(tagCount.callCount).to.be.above(3);
      });

      it('should be invoked with at most two arguments', function() {
        tagCount('p', tags);
        tagCount.args.forEach(arg => {
          expect(arg).to.have.length.of.at.most(2);
        });
      });

    });

}());
