import styles from './Sidebar.module.css';

export function Sidebar({ manifest, currentProblemNumber, resultCache, filter, isOpen, onFilterChange, onSelect, onClose }) {
  const lowerFilter = filter.toLowerCase();
  const filteredProblems = manifest.filter((problem) => {
    const label = `${problem.num}. ${problem.title}`;
    return !lowerFilter || label.toLowerCase().includes(lowerFilter);
  });

  return (
    <>
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`} id="problems-sidebar">
        <div className={styles.sidebarHeader}>All Problems</div>
        <div className={styles.searchWrap}>
          <input
            className={styles.searchInput}
            type="text"
            value={filter}
            placeholder="Search problems..."
            onChange={(event) => onFilterChange(event.target.value)}
          />
        </div>
        <div className={styles.problemList}>
          {filteredProblems.map((problem) => {
            const cachedResult = resultCache[problem.num];
            const statusClass = cachedResult
              ? cachedResult.stats.failures === 0 ? styles.pass : styles.fail
              : '';

            return (
              <a
                className={`${styles.problemItem} ${problem.num === currentProblemNumber ? styles.active : ''}`}
                href={`/playground/?problem=${problem.num}`}
                key={problem.num}
                onClick={(event) => {
                  event.preventDefault();
                  onSelect(problem.num);
                }}
              >
                <span className={styles.problemNum}>{String(problem.num).padStart(2, '0')}</span>
                <span className={styles.problemName}>{problem.title}</span>
                <span className={`${styles.problemStatus} ${statusClass}`} aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </aside>
      <button
        className={`${styles.backdrop} ${isOpen ? styles.visible : ''}`}
        type="button"
        aria-label="Close problems menu"
        onClick={onClose}
      />
    </>
  );
}