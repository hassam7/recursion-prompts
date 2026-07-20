function stripTopDescribe(fullTitle) {
  return fullTitle.replace(/^\d+\.\s*\S.*?\s/, '').trim() || fullTitle;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export class ResultsView {
  constructor({ resultsBody, progressBar, statPass, statFail, statTotal }) {
    this.resultsBody = resultsBody;
    this.progressBar = progressBar;
    this.statPass = statPass;
    this.statFail = statFail;
    this.statTotal = statTotal;
  }

  renderIdle() {
    this.progressBar.style.width = '0%';
    this.statPass.textContent = '–';
    this.statFail.textContent = '–';
    this.statTotal.textContent = '–';
    this.resultsBody.innerHTML = `
      <div class="idle-state">
        <div class="idle-icon">🧪</div>
        <div>Write your solution and click<br/><strong>▶ Run Tests</strong> to see results.</div>
      </div>`;
  }

  renderTimeout() {
    this.resultsBody.innerHTML = '<div class="idle-state" style="color:var(--fail)">⚠️ Test run timed out.<br/>Check your code for infinite loops.</div>';
  }

  renderResults(data) {
    const { stats, passes, failures } = data;
    const total = stats.passes + stats.failures;

    this.progressBar.style.width = total ? `${(stats.passes / total) * 100}%` : '0%';
    this.statPass.textContent = stats.passes;
    this.statFail.textContent = stats.failures;
    this.statTotal.textContent = total;
    this.resultsBody.innerHTML = '';

    const summary = document.createElement('div');
    summary.className = 'summary-box ' + (stats.failures === 0 ? 'all-pass' : 'has-fail');
    summary.style.display = 'block';
    summary.textContent = stats.failures === 0
      ? `🎉 All ${total} tests passing!`
      : `${stats.passes} / ${total} tests passing`;
    this.resultsBody.appendChild(summary);

    passes.forEach((test) => {
      const element = document.createElement('div');
      element.className = 'test-item pass';
      element.innerHTML = `
        <div class="test-icon">✅</div>
        <div class="test-content">
          <div class="test-title">${escapeHtml(stripTopDescribe(test.title))}</div>
        </div>`;
      this.resultsBody.appendChild(element);
    });

    failures.forEach((test) => {
      const element = document.createElement('div');
      element.className = 'test-item fail';
      element.innerHTML = `
        <div class="test-icon">❌</div>
        <div class="test-content">
          <div class="test-title">${escapeHtml(stripTopDescribe(test.title))}</div>
          <div class="test-error">${escapeHtml(test.error || '')}</div>
        </div>`;
      this.resultsBody.appendChild(element);
    });
  }
}