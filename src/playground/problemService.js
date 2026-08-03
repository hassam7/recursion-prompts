const LIB_SCRIPTS = [
  '/lib/jquery.js',
  '/lib/chai.js',
  '/lib/mocha.js',
  '/lib/sinon.js',
  '/lib/testSupport.js',
];

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.text();
}

export async function loadManifest() {
  const data = await fetchText('/problems/manifest.json');
  return JSON.parse(data);
}

export async function prefetchTestLibraries() {
  const entries = await Promise.all(LIB_SCRIPTS.map(async (url) => {
    const code = await fetchText(url);
    return [url, code];
  }));

  return Object.fromEntries(entries);
}

export function loadProblemStub(problem) {
  return fetchText(`/problems/${problem.dir}/problem.js`);
}

export function loadProblemSpec(problem) {
  return fetchText(`/problems/${problem.dir}/spec.js`);
}

export async function loadMochaCss() {
  try {
    return await fetchText('/lib/css/mocha.css');
  } catch {
    return '';
  }
}