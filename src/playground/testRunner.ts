import type { LibraryCache } from './problemService';

interface TestRunOptions {
  code: string;
  specCode: string;
  libCache: LibraryCache;
  mochaCss: string;
  timeoutMs?: number;
}

interface MochaStats {
  passes: number;
  failures: number;
}

interface MochaTestResult {
  title: string;
  error?: string;
}

export interface TestRunResult {
  type: 'mocha-results';
  stats: MochaStats;
  passes: MochaTestResult[];
  failures: MochaTestResult[];
  [key: string]: unknown;
}

export function runTestsInFrame(testFrame: HTMLIFrameElement, { code, specCode, libCache, mochaCss, timeoutMs = 10000 }: TestRunOptions) {
  const srcdoc = buildSrcdoc({ code, specCode, libCache, mochaCss });

  return new Promise<TestRunResult>((resolve, reject) => {
    let settled = false;

    const cleanup = () => {
      window.removeEventListener('message', handleMessage);
      window.clearTimeout(timeoutId);
    };

    const handleMessage = (event: MessageEvent) => {
      if (settled || !isTestRunResult(event.data)) {
        return;
      }

      settled = true;
      cleanup();
      resolve(event.data);
    };

    const timeoutId = window.setTimeout(() => {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      reject(new Error('Test run timed out.'));
    }, timeoutMs);

    window.addEventListener('message', handleMessage);
    testFrame.srcdoc = srcdoc;
  });
}

function buildSrcdoc({ code, specCode, libCache, mochaCss }: Required<Omit<TestRunOptions, 'timeoutMs'>>) {
  const libScripts = Object.values(libCache)
    .map((source) => `<script>${source}<\/script>`)
    .join('\n');

  return `<!DOCTYPE html>
<html>
<head>
  <style>${mochaCss}</style>
  ${libScripts}
</head>
<body>
  <div id="mocha"></div>
  <script>
    ${code}
  <\/script>
  <script>
    ${specCode}
  <\/script>
</body>
</html>`;
}

function isTestRunResult(value: unknown): value is TestRunResult {
  return Boolean(
    value &&
    typeof value === 'object' &&
    'type' in value &&
    value.type === 'mocha-results' &&
    'stats' in value &&
    value.stats &&
    typeof value.stats === 'object' &&
    'passes' in value.stats &&
    typeof value.stats.passes === 'number' &&
    'failures' in value.stats &&
    typeof value.stats.failures === 'number'
  );
}