import { AnalyticsEvent } from './analytics.js';

export class AppController {
  constructor({
    store,
    problemService,
    testRunner,
    analytics,
    headerView,
    sidebarView,
    editorView,
    resultsView,
    overlayView,
  }) {
    this.store = store;
    this.problemService = problemService;
    this.testRunner = testRunner;
    this.analytics = analytics;
    this.headerView = headerView;
    this.sidebarView = sidebarView;
    this.editorView = editorView;
    this.resultsView = resultsView;
    this.overlayView = overlayView;
  }

  bindEvents() {
    this.headerView.bindPrevious(() => {
      this.runAsync(async () => {
        const problemNumber = this.store.getPreviousProblemNumber();
        if (problemNumber) {
          await this.goToProblem(problemNumber);
        }
      });
    });

    this.headerView.bindNext(() => {
      this.runAsync(async () => {
        const problemNumber = this.store.getNextProblemNumber();
        if (problemNumber) {
          await this.goToProblem(problemNumber);
        }
      });
    });

    this.headerView.bindRun(() => {
      this.runAsync(async () => {
        await this.runTests();
      });
    });

    this.sidebarView.bindSelect((problemNumber) => {
      this.runAsync(async () => {
        await this.goToProblem(problemNumber);
      });
    });

    this.sidebarView.bindSearch(() => {
      const filter = this.sidebarView.getFilter();
      this.store.setSearchFilter(filter);

      if (!this.store.hasTrackedSearch() && filter.trim().length > 0) {
        this.store.markSearchTracked();
        this.analytics.track(AnalyticsEvent.SEARCH_USED);
      }

      this.renderSidebar();
    });

    this.editorView.bindReset(() => {
      const currentProblem = this.store.getCurrentProblem();
      if (!currentProblem) {
        return;
      }

      this.editorView.setCode(this.store.getStub(currentProblem.num));
      this.store.clearUserCode(currentProblem.num);
      this.analytics.track(AnalyticsEvent.RESET_CLICKED, this.problemParams(currentProblem));
    });

    this.editorView.bindRunShortcut(() => {
      this.runAsync(async () => {
        await this.runTests();
      });
    });

    window.addEventListener('popstate', (event) => {
      this.runAsync(async () => {
        const problemNumber = event.state?.problem || this.getProblemFromURL();
        await this.goToProblem(problemNumber, false);
      });
    });
  }

  async init() {
    this.bindEvents();
    this.editorView.init().catch((error) => {
      console.error(error);
    });

    try {
      const [manifest, libCache] = await Promise.all([
        this.problemService.loadManifest(),
        this.problemService.prefetchLibs(),
      ]);

      this.store.setManifest(manifest);
      this.store.setLibCache(libCache);
      this.renderHeader();
      this.renderSidebar();

      const startProblem = this.getProblemFromURL();
      await this.goToProblem(startProblem, false);
      window.history.replaceState({ problem: startProblem }, '', `?problem=${startProblem}`);
      this.overlayView.hide();
    } catch (error) {
      this.overlayView.showError(error.message);
      console.error(error);
    }
  }

  async goToProblem(problemNumber, pushHistory = true) {
    if (this.store.isRunning()) {
      return;
    }

    const nextProblem = this.store.findProblemByNumber(problemNumber);
    if (!nextProblem) {
      return;
    }

    this.saveCurrentCode();
    this.store.setCurrentProblemByNumber(problemNumber);
    const currentProblem = this.store.getCurrentProblem();

    if (pushHistory) {
      const url = `${window.location.pathname}?problem=${problemNumber}`;
      window.history.pushState({ problem: problemNumber }, '', url);
    }

    let stub = this.store.getStub(currentProblem.num);
    if (!stub) {
      const fetched = await this.problemService.loadProblemStub(currentProblem);
      if (fetched.trim().length > 0) {
        this.store.setStub(currentProblem.num, fetched);
        stub = fetched;
      }
    }

    const savedCode = this.store.getUserCode(currentProblem.num);
    const code = savedCode !== undefined && savedCode.trim().length > 0
      ? savedCode
      : stub;

    this.editorView.renderProblem(currentProblem, code);
    this.renderHeader();
    this.renderSidebar();

    const cachedResult = this.store.getResult(currentProblem.num);
    if (cachedResult) {
      this.resultsView.renderResults(cachedResult);
    } else {
      this.resultsView.renderIdle();
    }

    this.analytics.track(AnalyticsEvent.PROBLEM_OPENED, this.problemParams(currentProblem));
  }

  async runTests() {
    const currentProblem = this.store.getCurrentProblem();
    if (!currentProblem || this.store.isRunning()) {
      return;
    }

    this.store.setRunning(true);
    this.renderHeader();

    const code = this.editorView.getCode();
    this.store.setUserCode(currentProblem.num, code);
    this.analytics.track(AnalyticsEvent.RUN_TESTS_CLICKED, this.problemParams(currentProblem));

    try {
      const [specCode, mochaCss] = await Promise.all([
        this.problemService.loadProblemSpec(currentProblem),
        this.problemService.loadMochaCss(),
      ]);

      const result = await this.testRunner.run({
        code,
        specCode,
        libCache: this.store.getLibCache(),
        mochaCss,
      });

      this.store.setResult(currentProblem.num, result);
      this.resultsView.renderResults(result);
      this.renderSidebar();
      this.analytics.track(AnalyticsEvent.TESTS_COMPLETED, {
        ...this.problemParams(currentProblem),
        tests_passed: result.stats.passes,
        tests_failed: result.stats.failures,
        tests_total: result.stats.passes + result.stats.failures,
      });

      if (result.stats.failures === 0) {
        this.analytics.track(AnalyticsEvent.PROBLEM_PASSED, {
          ...this.problemParams(currentProblem),
          tests_total: result.stats.passes + result.stats.failures,
        });
      }
    } catch (error) {
      if (error.message === 'Test run timed out.') {
        this.resultsView.renderTimeout();
        this.analytics.track(AnalyticsEvent.TESTS_TIMED_OUT, this.problemParams(currentProblem));
      } else {
        window.alert(`Could not run tests: ${error.message}`);
      }
    } finally {
      this.store.setRunning(false);
      this.renderHeader();
    }
  }

  renderHeader() {
    this.headerView.render({
      currentProblem: this.store.getCurrentProblem(),
      totalProblems: this.store.getProblemCount(),
      isRunning: this.store.isRunning(),
      hasPrevious: this.store.hasPreviousProblem(),
      hasNext: this.store.hasNextProblem(),
    });
  }

  renderSidebar() {
    this.sidebarView.render({
      manifest: this.store.getManifest(),
      currentProblemNumber: this.store.getCurrentProblem()?.num,
      resultCache: this.store.getResultCache(),
      filter: this.store.getSearchFilter(),
    });
  }

  getProblemFromURL() {
    const params = new URLSearchParams(window.location.search);
    const problemNumber = parseInt(params.get('problem'), 10);
    if (!problemNumber || problemNumber < 1 || problemNumber > this.store.getProblemCount()) {
      return 1;
    }

    return problemNumber;
  }

  problemParams(problem) {
    return {
      problem_num: problem.num,
      problem_slug: problem.slug,
      problem_title: problem.title,
    };
  }

  saveCurrentCode() {
    const currentProblem = this.store.getCurrentProblem();
    if (!currentProblem) {
      return;
    }

    this.store.setUserCode(currentProblem.num, this.editorView.getCode());
  }

  runAsync(action) {
    Promise.resolve()
      .then(action)
      .catch((error) => {
        window.alert(error.message);
        console.error(error);
      });
  }
}