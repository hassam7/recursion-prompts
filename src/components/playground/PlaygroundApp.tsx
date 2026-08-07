import { useState } from 'react';
import { AnalyticsEvent, track } from '../../playground/analytics';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { EditorPanel } from './EditorPanel';
import { ResultsPanel } from './ResultsPanel';
import { useProblemPopState } from './useProblemRouting';
import { useProblemSession } from './useProblemSession';
import { usePlaygroundTestRunner } from './usePlaygroundTestRunner';
import styles from './PlaygroundApp.module.css';

export default function PlaygroundApp() {
  const [searchFilter, setSearchFilter] = useState('');
  const [searchTracked, setSearchTracked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const testRunner = usePlaygroundTestRunner();
  const problemSession = useProblemSession({
    isNavigationLocked: testRunner.isRunning,
    onProblemOpened: testRunner.clearTimedOutProblem,
  });

  const currentResult = testRunner.resultCache[problemSession.currentProblemNumber];
  const isTimeout = testRunner.timedOutProblem === problemSession.currentProblemNumber;
  const isLoading = problemSession.isLoading || testRunner.isLoading;
  const loadError = problemSession.loadError || testRunner.loadError;

  useProblemPopState({
    problemCount: problemSession.manifest.length,
    onOpenProblem: problemSession.openProblem,
  });

  function handleSearch(nextFilter: string) {
    setSearchFilter(nextFilter);
    if (!searchTracked && nextFilter.trim().length > 0) {
      setSearchTracked(true);
      track(AnalyticsEvent.SEARCH_USED);
    }
  }

  function handleRunTests() {
    testRunner.runTests({
      currentProblem: problemSession.currentProblem,
      codeDraft: problemSession.codeDraft,
      onPersistCode: problemSession.persistCurrentDraft,
    });
  }

  if (isLoading) {
    return <div className={styles.loadingScreen}>Loading problems...</div>;
  }

  if (loadError) {
    return <div className={styles.loadingScreen}>Could not load playground: {loadError}</div>;
  }

  return (
    <div className={styles.playgroundShell}>
      <Header
        currentProblem={problemSession.currentProblem}
        totalProblems={problemSession.manifest.length}
        isRunning={testRunner.isRunning}
        hasPrevious={problemSession.hasPrevious}
        hasNext={problemSession.hasNext}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((open) => !open)}
        onPrevious={problemSession.handlePrevious}
        onNext={problemSession.handleNext}
        onRun={handleRunTests}
      />

      <Sidebar
        manifest={problemSession.manifest}
        currentProblemNumber={problemSession.currentProblemNumber}
        resultCache={testRunner.resultCache}
        filter={searchFilter}
        isOpen={menuOpen}
        onFilterChange={handleSearch}
        onSelect={(problemNumber) => {
          problemSession.openProblem(problemNumber, { pushHistory: true });
          setMenuOpen(false);
        }}
        onClose={() => setMenuOpen(false)}
      />

      <EditorPanel
        problem={problemSession.currentProblem}
        descriptionHtml={problemSession.descriptionHtml}
        specText={problemSession.specText}
        code={problemSession.codeDraft}
        onCodeChange={problemSession.handleCodeChange}
        onReset={problemSession.handleReset}
        onRunShortcut={handleRunTests}
      />

      <ResultsPanel result={currentResult} isTimeout={isTimeout} />

      <iframe
        ref={testRunner.testFrameRef}
        className={styles.testFrame}
        title="Sandboxed test runner"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}