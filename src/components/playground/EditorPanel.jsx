import styles from './EditorPanel.module.css';

const GITHUB_REPO_URL = 'https://github.com/hassam7/recursion-prompts';
const GITHUB_DEFAULT_BRANCH = 'master';

export function EditorPanel({ problem, descriptionHtml, code, onCodeChange, onReset, onRunShortcut }) {
  const partTag = problem?.num <= 36 ? 'Part 1' : 'Part 2';
  const editUrl = problem
    ? `${GITHUB_REPO_URL}/tree/${GITHUB_DEFAULT_BRANCH}/problems/${problem.dir}`
    : GITHUB_REPO_URL;

  return (
    <main className={styles.editorPanel}>
      <div className={styles.problemHeader}>
        <h1 className={styles.problemTitle}>{problem ? `${problem.num}. ${problem.title}` : 'Loading...'}</h1>
        <div className={styles.problemMeta}>
          <span>Recursion</span>
          <span>{partTag}</span>
        </div>
      </div>

      {descriptionHtml && (
        <section
          className={styles.problemStatement}
          aria-label="Problem statement"
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
        />
      )}

      <div className={styles.editorToolbar}>
        <span className={styles.toolbarLabel}>Solution</span>
        <div className={styles.toolbarActions}>
          <a className={styles.editLink} href={editUrl} target="_blank" rel="noopener noreferrer">
            Edit on GitHub
          </a>
          <button className={styles.resetButton} type="button" disabled={!problem} onClick={onReset}>
            Reset to stub
          </button>
        </div>
      </div>

      <textarea
        className={styles.codeEditor}
        spellCheck="false"
        autoCorrect="off"
        autoCapitalize="off"
        value={code}
        aria-label="JavaScript solution editor"
        onChange={(event) => onCodeChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Tab') {
            event.preventDefault();
            const target = event.currentTarget;
            const start = target.selectionStart;
            const end = target.selectionEnd;
            const nextCode = `${code.slice(0, start)}  ${code.slice(end)}`;
            onCodeChange(nextCode);
            window.requestAnimationFrame(() => {
              target.selectionStart = start + 2;
              target.selectionEnd = start + 2;
            });
            return;
          }

          if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
            event.preventDefault();
            onRunShortcut();
          }
        }}
      />
    </main>
  );
}