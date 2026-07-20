const LIB_SCRIPTS = [
  '/lib/jquery.js',
  '/lib/chai.js',
  '/lib/mocha.js',
  '/lib/sinon.js',
  '/lib/testSupport.js',
];

export class ProblemService {
  async fetchText(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status}`);
    }

    return response.text();
  }

  async loadManifest() {
    const data = await this.fetchText('/problems/manifest.json');
    return JSON.parse(data);
  }

  async prefetchLibs() {
    const entries = await Promise.all(LIB_SCRIPTS.map(async (url) => {
      const code = await this.fetchText(url);
      return [url, code];
    }));

    return Object.fromEntries(entries);
  }

  loadProblemStub(problem) {
    return this.fetchText(`/problems/${problem.dir}/problem.js`);
  }

  loadProblemSpec(problem) {
    return this.fetchText(`/problems/${problem.dir}/spec.js`);
  }

  async loadMochaCss() {
    try {
      return await this.fetchText('/lib/css/mocha.css');
    } catch {
      return '';
    }
  }
}