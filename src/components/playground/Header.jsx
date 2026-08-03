import styles from './Header.module.css';

export function Header({ currentProblem, totalProblems, isRunning, hasPrevious, hasNext, onPrevious, onNext, onRun, onMenuToggle, menuOpen }) {
  return (
    <header className={styles.header}>
      <button
        className={styles.menuButton}
        type="button"
        aria-label="Open problems menu"
        aria-controls="problems-sidebar"
        aria-expanded={menuOpen}
        onClick={onMenuToggle}
      >
        <span />
        <span />
        <span />
      </button>

      <a className={styles.logo} href="/">
        <span className={styles.logoMark}>R</span>
        Practice Recursion
      </a>

      <div className={styles.centerControls}>
        <button className={styles.navButton} type="button" disabled={isRunning || !hasPrevious} onClick={onPrevious}>
          Prev
        </button>
        <div className={styles.problemBadge}>
          Problem <span>{currentProblem?.num || 1}</span> / <span>{totalProblems || 0}</span>
        </div>
        <button className={styles.navButton} type="button" disabled={isRunning || !hasNext} onClick={onNext}>
          Next
        </button>
      </div>

      <button className={styles.runButton} type="button" disabled={isRunning || !currentProblem} onClick={onRun}>
        {isRunning ? 'Running...' : 'Run Tests'}
      </button>
    </header>
  );
}