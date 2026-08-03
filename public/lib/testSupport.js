(function() {
  'use strict';

  mocha.setup({ui: 'bdd'});
  window.expect = chai.expect;

  window.onload = function() {
    var runner = window.mochaPhantomJS ? mochaPhantomJS.run() : mocha.run();

    // Relay results to parent window (for iframe-based playground)
    if (window.parent && window.parent !== window) {
      var passes = [];
      var failures = [];

      runner.on('pass', function(test) {
        passes.push({ title: test.fullTitle() });
      });

      runner.on('fail', function(test, err) {
        failures.push({ title: test.fullTitle(), error: err.message });
      });

      runner.on('end', function() {
        window.parent.postMessage({
          type: 'mocha-results',
          stats: {
            passes: runner.stats.passes,
            failures: runner.stats.failures,
            pending: runner.stats.pending,
            duration: runner.stats.duration
          },
          passes: passes,
          failures: failures
        }, '*');
      });
    }
  };


  // Disabling native methods is dangerous, we should spy on them instead
  before(function() {
    sinon.spy(Array.prototype,'map');
    sinon.spy(Array.prototype,'sort');
    sinon.spy(Array.prototype,'reverse');
    sinon.spy(Array.prototype,'flat');
    sinon.spy(Object,'assign');
    sinon.spy(JSON,'stringify');
    sinon.spy(JSON,'parse');
    window.analyze = o => {
      let c = 0;
      for (let k in o) {
        typeof o[k] === 'object' && (c += analyze(o[k]));
        c++;
      }
      return c;
    };
  });

  afterEach(function() {
    Array.prototype.map.reset();
    Array.prototype.sort.reset();
    Array.prototype.reverse.reset();
    Array.prototype.flat.reset();
    Object.assign.reset();
    JSON.stringify.reset();
    JSON.parse.reset();
  });

  after(function() {
    Array.prototype.map.restore();
    Array.prototype.sort.restore();
    Array.prototype.reverse.restore();
    Array.prototype.flat.restore();
    Object.assign.restore();
    JSON.stringify.restore();
    JSON.parse.restore();
    delete window.analyze;
  });

}());
