export class AppStore {
  constructor() {
    this.manifest = [];
    this.currentIndex = 0;
    this.stubCache = new Map();
    this.userCode = new Map();
    this.libCache = {};
    this.resultCache = new Map();
    this.running = false;
    this.searchFilter = '';
    this.searchTracked = false;
  }

  setManifest(manifest) {
    this.manifest = manifest;
  }

  getManifest() {
    return this.manifest;
  }

  getProblemCount() {
    return this.manifest.length;
  }

  findProblemByNumber(problemNumber) {
    return this.manifest.find((problem) => problem.num === problemNumber) || null;
  }

  setCurrentProblemByNumber(problemNumber) {
    const index = this.manifest.findIndex((problem) => problem.num === problemNumber);
    if (index === -1) {
      return null;
    }

    this.currentIndex = index;
    return this.getCurrentProblem();
  }

  getCurrentProblem() {
    return this.manifest[this.currentIndex] || null;
  }

  getCurrentIndex() {
    return this.currentIndex;
  }

  hasPreviousProblem() {
    return this.currentIndex > 0;
  }

  hasNextProblem() {
    return this.currentIndex < this.manifest.length - 1;
  }

  getPreviousProblemNumber() {
    if (!this.hasPreviousProblem()) {
      return null;
    }

    return this.manifest[this.currentIndex - 1].num;
  }

  getNextProblemNumber() {
    if (!this.hasNextProblem()) {
      return null;
    }

    return this.manifest[this.currentIndex + 1].num;
  }

  setStub(problemNumber, code) {
    this.stubCache.set(problemNumber, code);
  }

  getStub(problemNumber) {
    return this.stubCache.get(problemNumber) || '';
  }

  setUserCode(problemNumber, code) {
    this.userCode.set(problemNumber, code);
  }

  getUserCode(problemNumber) {
    return this.userCode.get(problemNumber);
  }

  clearUserCode(problemNumber) {
    this.userCode.delete(problemNumber);
  }

  setLibCache(libCache) {
    this.libCache = libCache;
  }

  getLibCache() {
    return this.libCache;
  }

  setResult(problemNumber, result) {
    this.resultCache.set(problemNumber, result);
  }

  getResult(problemNumber) {
    return this.resultCache.get(problemNumber);
  }

  getResultCache() {
    return this.resultCache;
  }

  setRunning(running) {
    this.running = running;
  }

  isRunning() {
    return this.running;
  }

  setSearchFilter(filter) {
    this.searchFilter = filter;
  }

  getSearchFilter() {
    return this.searchFilter;
  }

  hasTrackedSearch() {
    return this.searchTracked;
  }

  markSearchTracked() {
    this.searchTracked = true;
  }
}