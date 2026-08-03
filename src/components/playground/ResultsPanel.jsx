import styles from './ResultsPanel.module.css';

function stripTopDescribe(fullTitle) {
  return fullTitle.replace(/^\d+\.\s*\S.*?\s/, '').trim() || fullTitle;
}

export function ResultsPanel({ result, isTimeout }) {
  const stats = result?.stats;
  const total = stats ? stats.passes + stats.failures : 0;
  const progress = total ? `${(stats.passes / total) * 100}%` : '0%';

  return (
    <aside className={styles.resultsPanel}>
      <div className={styles.resultsHeader}>
        <div className={styles.resultsTitle}>Test Results</div>
        <div className={styles.progressBarWrap}>
          <div className={styles.progressBar} style={{ width: progress }} />
        </div>
        <div className={styles.statsRow}>
          <div>Pass: <span className={styles.passCount}>{stats?.passes ?? '-'}</span></div>
          <div>Fail: <span className={styles.failCount}>{stats?.failures ?? '-'}</span></div>
          <div>Total: <span>{total || '-'}</span></div>
        </div>
      </div>

      <div className={styles.resultsBody}>
        {isTimeout && (
          <div className={styles.idleState}>Test run timed out. Check your code for infinite loops.</div>
        )}

        {!isTimeout && !result && (
          <div className={styles.idleState}>Write your solution and click <strong>Run Tests</strong> to see results.</div>
        )}

        {!isTimeout && result && (
          <>
            <div className={`${styles.summaryBox} ${stats.failures === 0 ? styles.allPass : styles.hasFail}`}>
              {stats.failures === 0 ? `All ${total} tests passing!` : `${stats.passes} / ${total} tests passing`}
            </div>

            {result.passes.map((test, index) => (
              <div className={`${styles.testItem} ${styles.pass}`} key={`pass-${index}-${test.title}`}>
                <div className={styles.testIcon}>Pass</div>
                <div className={styles.testContent}>
                  <div className={styles.testTitle}>{stripTopDescribe(test.title)}</div>
                </div>
              </div>
            ))}

            {result.failures.map((test, index) => (
              <div className={`${styles.testItem} ${styles.fail}`} key={`fail-${index}-${test.title}`}>
                <div className={styles.testIcon}>Fail</div>
                <div className={styles.testContent}>
                  <div className={styles.testTitle}>{stripTopDescribe(test.title)}</div>
                  <div className={styles.testError}>{test.error || ''}</div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </aside>
  );
}