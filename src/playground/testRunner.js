export function runTestsInFrame(testFrame, { code, specCode, libCache, mochaCss, timeoutMs = 10000 }) {
  const srcdoc = buildSrcdoc({ code, specCode, libCache, mochaCss });

  return new Promise((resolve, reject) => {
    let settled = false;

    const cleanup = () => {
      window.removeEventListener('message', handleMessage);
      window.clearTimeout(timeoutId);
    };

    const handleMessage = (event) => {
      if (settled || !event.data || event.data.type !== 'mocha-results') {
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

function buildSrcdoc({ code, specCode, libCache, mochaCss }) {
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