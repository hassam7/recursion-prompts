export interface Problem {
  num: number;
  slug: string;
  title: string;
  dir: string;
}

export type LibraryCache = Record<string, string>;

const LIB_SCRIPTS = [
  '/lib/jquery.js',
  '/lib/chai.js',
  '/lib/mocha.js',
  '/lib/sinon.js',
  '/lib/testSupport.js',
];

async function fetchText(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.text();
}

export async function loadManifest(): Promise<Problem[]> {
  const data = await fetchText('/problems/manifest.json');
  return JSON.parse(data) as Problem[];
}

export async function prefetchTestLibraries(): Promise<LibraryCache> {
  const entries = await Promise.all(LIB_SCRIPTS.map(async (url) => {
    const code = await fetchText(url);
    return [url, code] as const;
  }));

  return Object.fromEntries(entries);
}

export function loadProblemStub(problem: Problem) {
  return fetchText(`/problems/${problem.dir}/problem.js`);
}

export function loadProblemDescription(problem: Problem) {
  return fetchText(`/problems/${problem.dir}/description.html`);
}

export function loadProblemSpec(problem: Problem) {
  return fetchText(`/problems/${problem.dir}/spec.js`);
}

export async function loadMochaCss() {
  try {
    return await fetchText('/lib/css/mocha.css');
  } catch {
    return '';
  }
}